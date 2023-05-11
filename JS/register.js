"use strict"

let main = document.querySelector("main");

async function renderRegisterPage() {

    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("password");
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("profilepicture");

    //Hämtar profilbilderna

    let response = await fetch("api/profilepics.php");

    let profilepictures = await response.json();

    //Skapar profilbilderna
    function displayProfilePics(array) {
        let html = "";
        for (let profilepic of profilepictures) {
            html += `
            <li class=profileOption>
            <img src=${profilepic}>
            </li>
            `;
        }
        return html;
    }

    console.log(profilepictures);

    //Visar den valda profilbilden
    function Selectedprofilepic(event) {
        console.log(event.target.attributes.src.nodeValue);
        let source = event.target.attributes.src.nodeValue;
        document.getElementById("SelectedProfile").innerHTML = `
        <img id="selectedpicture" src=${source}>
        `;
    }

    main.innerHTML = `
    <div id = registerParent>
        
        <div id = register>
            <div id = LoginRegisterContainer> 
                <button id = LoginButton>SIGN IN</button>
                <button id = RegisterButton>JOIN</button>
            </div>

            <div id = SelectedProfile>
            </div>

            <ul class = profileOptions>
                ${displayProfilePics(profilepictures)}
            </ul>

            <form>
                <p class=InputHeader>Username</p>
                <input type=text placeholder=username id=username>
                <p class=InputHeader>Password</p>
                <input type=password placeholder=password id=password>
                <div id=submitButtonContainer>
                    <button id=submitButton type=submit>Join</button>
                </div>
            </form>
        </div>
    </div>
    `;

    let list = document.querySelector("ul").querySelectorAll("li > img");
    console.log(list);
    for (let item of list) {
        item.addEventListener("click", Selectedprofilepic);
    }
    //Ger varje profilbild ett event 

    let LoginButton = document.querySelector("#LoginButton");
    LoginButton.addEventListener("click", renderLoginPage);

    let registerForm = document.querySelector("form");
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        let username = document.querySelector("#username").value;
        let password = document.querySelector("#password").value;
        let selectedImage = document.querySelector("#SelectedProfile > img");
        let profilepicture = selectedImage ? selectedImage.getAttribute("src") : "";
        //Om en profilbild är vald så kommer sökvägen sparas
        //Om en profilbild inte är vald så kommer en tom sträng att sparas. Eftersom annars hade det sparats "null" och sabbat koden

        let userData = {
            username: username,
            password: password,
            profilepicture: profilepicture
        };

        const request = new Request("api/register.php", {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(userData),
        });

        const response = await fetch(request);

        if (response.status === 200) {
            //Om förfrågan lyckades så skapas användaren
            feedback("Registration Complete. Please proceed to login.");
            console.log("Registration succeeded");
        } else {
            //Om förfrågan misslyckades så skickas felmeddelande
            let error = await response.json();
            console.log(error.message);
            feedback(error.message);
        }

        let data = await response.json();

        localStorage.setItem("username", data.username);
        localStorage.setItem("password", data.password);
        localStorage.setItem("id", data.id);
        localStorage.setItem("profilepicture", data.profilepicture);
        //Här sätter vi all data i local storage så vi kan nå användaren överallt på sidan

    }
    )

}

//renderRegisterPage();