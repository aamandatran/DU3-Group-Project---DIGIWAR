"use strict"


let main = document.querySelector("main");


async function renderRegisterPage() {

    let response = await fetch("api/profilepics.php");
    let profilepictures = await response.json();

    
    function displayProfilePics (array) {
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

    let LoginButton = document.querySelector("#LoginButton");
    LoginButton.addEventListener("click", renderLoginPage);

    let list = document.querySelector("ul").querySelectorAll("li > img");
    console.log(list);
    for(let item of list) {
        item.addEventListener("click", Selectedprofilepic);
    }

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

            const request = new Request ("api/register.php", {
                method: "POST",
                headers: {"Content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify(userData),
            });

            check_request(request, "register");

            response = fetch(request);
            user = response.json();

            localStorage.setItem("User", user);

    });

}

function renderLoginPage() {
    main.innerHTML = `
    <div id=LoginRegisterContainer> 
    <button id=LoginButton>SIGN IN</button>
    <button id=RegisterButton>JOIN</button>
    </div>

    <form>
    <p class=InputHeader>Username</p>
    <input type=text placeholder=Username id=username>
    <p class=InputHeader>Password</p>
    <input type=password placeholder=Password id=password>
    <div id=submitButtonContainer>
    <button id=submitButton type=submit>Join</button>
    </div>
    </form>
    
    `

    let RegisterButton = document.querySelector("#RegisterButton");
    RegisterButton.addEventListener("click", renderRegisterPage);


    let registerForm = document.querySelector("form");
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        let username = document.querySelector("#username").value;
        let password = document.querySelector("#password").value;

        let userData = {
            username: username,
            password: password,
        };

        const request = new Request ("api/register.php", {
            method: "POST",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(userData),
        });

        check_request(request, "login");

    })
}

renderRegisterPage();
