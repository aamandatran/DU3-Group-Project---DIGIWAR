"use strict"

//Render login page
function renderLoginPage() {
    display_header_menu()

    //Changing mains content to login page
    main.innerHTML = `
    <div id = loginParent>
        <div id = login>
            <div id=LoginRegisterContainer> 
                <button id=LoginButton>SIGN IN</button>
                <button id=RegisterButton>JOIN</button>
            </div>
            <form>
                <input type=text placeholder=Username id=username>
                <input type=password placeholder=Password id=password>
                <div id=submitButtonContainer>
                    <button id=submitButton type=submit>Sign in</button>
                </div>
            </form>
        </div>
    </div>
    `;

    document.querySelector("#LoginButton").classList.add("selected");

    //Clicking register button sends you to register page
    let RegisterButton = document.querySelector("#RegisterButton");
    RegisterButton.classList.remove("selected");
    RegisterButton.addEventListener("click", renderRegisterPage);

    //Clicking submit button will trigger login form
    let loginForm = document.querySelector("form");
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        //Saves the value of username and password
        let username = document.querySelector("#username").value;
        let password = document.querySelector("#password").value;

        let userData = {
            username: username,
            password: password
        };

        //Sends a POST request to validate or confirm credentials
        const request = new Request("api/login.php", {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(userData)
        });

        const response = await fetch(request);

        // Declare the variables outside the loop
        let id, profilepicture;

        //if response is ok
        if (response.status === 200) {

            //fetch user.php which sends back an array of users except for their password
            let response = await fetch("API/users.php");
            let users = await response.json();

            //Loop to find matching user and fetch their id and profilepicture
            for (let user of users) {
                if (user.username === username) {
                    id = user.id;
                    profilepicture = user.profilepicture;
                    break;
                }
            }

            //Sets localstorage items and render wardrobe page because login is successfull. 
            window.localStorage.setItem("id", id);
            window.localStorage.setItem("profilepicture", profilepicture);
            window.localStorage.setItem("isLoggedIn", true);
            window.localStorage.setItem("username", username);
            window.localStorage.setItem("password", password);
            renderWardrobePage();

            //if reesponse is not ok
        } else {
            //show feedback with error message
            let error = await response.json();
            feedback(error.message);
        }
    });
}