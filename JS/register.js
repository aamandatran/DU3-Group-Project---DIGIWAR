"use strict"



let main = document.querySelector("main");

async function renderRegisterPage() {

<<<<<<< HEAD

    let response = await fetch("api/register.php");
=======
    let response = await fetch("api/profilepics.php");
>>>>>>> main
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

            const request = new Request ("api/register.php", {
                method: "POST",
                headers: {"Content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify(userData),
            });

            const response = await fetch(request);

<<<<<<< HEAD
            if (!response.ok) {
                console.log(data.message);
=======
            if(response.status === 200) {
                feedback("Registration Complete. Please proceed to login.");
                console.log("Registration succeeded");
>>>>>>> main
            } else {
                let error = await response.json();
                console.log(error.error);
                feedback(error.message);
            }
<<<<<<< HEAD
        } catch (err) {
            console.log(err.message);
        }
=======
>>>>>>> main

            let data = await response.json();

            localStorage.setItem("username", data.username);
            localStorage.setItem("password", data.password);
            localStorage.setItem("id", data.id);
            localStorage.setItem("profilepicture", data.profilepicture);

        }      
    )

}

//renderRegisterPage();