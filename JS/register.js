"use strict"



let main = document.querySelector("main");

async function renderRegisterPage() {


    let response = await fetch("api/register.php");
    let profilepictures = await response.json();


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

    function Selectedprofilepic(event) {
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
    <input type=text placeholder=Username id=username>
    <p class=InputHeader>Password</p>
    <input type=password placeholder=Password id=password>
    <div id=submitButtonContainer>
    <button id=submitButton type=submit>Join</button>
    </div>
    </form>
    
    `;

    let list = document.querySelector("ul").querySelectorAll("li > img");
    console.log(list);
    for (let item of list) {
        item.addEventListener("click", Selectedprofilepic);
    }


    let LoginButton = document.querySelector("#LoginButton");
    LoginButton.addEventListener("click", renderLoginPage);

    //Någonstans här måste jag hämta profilbilderna från databasen och lägga in dem i "profileOption"
    //Sedan måste jag förmodligen skapa en funktion som gör så att när man klickar på en av "profileOption"
    //Så läggs bilden till som andvändarens egna profilbild alltså i "SelectedProfile".

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

        try {
            let response = await fetch("api/register.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            })

            console.log(response);
            let data = await response.json()
            console.log(data);

            if (!response.ok) {
                console.log(data.message);
            } else {
                console.log(data.message);
            }
        } catch (err) {
            console.log(err.message);
        }



        //feedBack(data);
    })

}

renderRegisterPage();