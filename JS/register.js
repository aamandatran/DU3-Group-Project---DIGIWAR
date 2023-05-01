"use strict"



let main = document.querySelector("main");

function renderRegisterPage() {
    main.innerHTML = `
    <div id=LoginRegisterContainer> 
    <button id=LoginButton>SIGN IN</button>
    <button id=RegisterButton>JOIN</button>
    </div>

    <div id=ProfilePicContainer>
    <div id=SelectedProfile></div>
    <div class=profileOption></div>
    <div class=profileOption></div>
    <div class=profileOption></div>
    <div class=profileOption></div>
    <div class=profileOption></div>
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

        let userData = {
            username: username,
            password: password
            //Här ska även profilbilden man valt finnas så att den skickas med till databasen
        };

        let response = await fetch("api/register.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        })
        let data = await response.json()

        feedBack(data)
    })

}

renderRegisterPage();