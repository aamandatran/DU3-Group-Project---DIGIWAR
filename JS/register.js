"use strict"

//Render register page
async function renderRegisterPage() {
    display_header_menu();

    //Fetch the profilepictures
    let response = await fetch("API/profilepics.php");
    let profilepictures = await response.json();

    //Changing mains content to register page
    //Creates the profile pictures and displays them under ul.profileOptions
    main.innerHTML = `
    <div id = registerParent>
        <div id = register>
            <div id = LoginRegisterContainer> 
                <button id = LoginButton>SIGN IN</button>
                <button id = RegisterButton>JOIN</button>
            </div>

            <div id="profileSelection"> 
                <div id = SelectedProfile></div>
                <ul class = profileOptions>
                    ${displayProfilePics(profilepictures)}
                </ul>
            </div>

            <form>
                <input type=text placeholder=Username id=username>
                <input type=password placeholder=Password id=password>
                <div id=submitButtonContainer>
                    <button id=submitButton type=submit>Join</button>
                </div>
            </form>
        </div>
    </div>
    `;

    //Gives every profilepicture an eventlistener 
    let pictures = document.querySelector("ul").querySelectorAll("li > img");
    for (let picture of pictures) {
        picture.addEventListener("click", Selectedprofilepic);
    }

    //Display the selected profile picture
    function Selectedprofilepic(event) {
        let source = event.target.attributes.src.nodeValue;
        document.getElementById("SelectedProfile").innerHTML = `
        <img id="selectedpicture" src=${source}>
        `;
    }

    document.querySelector("#RegisterButton").classList.add("selected");

    //Clicking login button sends you to login page
    let LoginButton = document.querySelector("#LoginButton");
    LoginButton.classList.remove("selected");
    LoginButton.addEventListener("click", renderLoginPage);

    //Clicking submit button will trigger register form
    let registerForm = document.querySelector("form");
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        //Saves the user values
        let username = document.querySelector("#username").value;
        let password = document.querySelector("#password").value;
        let selectedImage = document.querySelector("#SelectedProfile > img");
        //If a profilepicture is selected the path will be saved 
        //If a profilepicture is NOT selected an empty string will be saved. Otherwise it would be saved as "null" and interrupt the code
        let profilepicture = selectedImage ? selectedImage.getAttribute("src") : "";

        //Saves the user data in an object
        let userData = {
            username: username,
            password: password,
            profilepicture: profilepicture
        };

        //Sends a POST request to validate or confirm registration
        const request = new Request("API/register.php", {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(userData)
        });

        const response = await fetch(request);

        //If response is ok the user is created and encouraged to proceed to login
        if (response.status === 200) {
            feedback("Registration Complete. Please proceed to login.");

            //Setting user information to localstorage items
            let data = await response.json();
            localStorage.setItem("username", data.username);
            localStorage.setItem("id", data.id);
            localStorage.setItem("profilepicture", data.profilepicture);

            //If response is NOT ok, feedback will provide error message
        } else {
            let error = await response.json();
            feedback(error.message);
        }
    });
}

