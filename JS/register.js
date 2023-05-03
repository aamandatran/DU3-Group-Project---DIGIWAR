"use strict"

let main = document.querySelector("main");

async function renderRegisterPage() {

    let response = await fetch("api/profilepics.php");
    let profilepictures = await response.json();
    //Hämtar profilbilderna

    
    function displayProfilePics (array) {
    //Skapar varje profilbild
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

    function Selectedprofilepic (event) {
    //När man valt en profilbild så ska den dyka upp
        console.log(event.target.attributes.src.nodeValue);
        let source = event.target.attributes.src.nodeValue;
        document.getElementById("SelectedProfile").innerHTML = `
        <img id="selectedpicture" src=${source}>
        `;
    }

    main.innerHTML = `
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
    
    `;

    let list = document.querySelector("ul").querySelectorAll("li > img");
    console.log(list);
    for(let item of list) {
        item.addEventListener("click", Selectedprofilepic);
    }


    let LoginButton = document.querySelector("#LoginButton");
    LoginButton.addEventListener("click", renderLoginPage);

    let registerForm = document.querySelector("form");
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        let username = document.querySelector("#username").value;
        let password = document.querySelector("#password").value;
        let profilepicture = document.getElementById("selectedpicture").attributes.src.nodeValue;
        console.log(document.getElementById("selectedpicture").attributes.src.nodeValue);

        let userData = {
            username: username,
            password: password,
            profilepicture: profilepicture
        };

            let response = await fetch("api/register.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            })

            console.log(response);
            let data = await response.json();
            console.log(data);

    });

}

renderRegisterPage();