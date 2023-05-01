"use strict"

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
            password: password
        };

        let response = await fetch("api/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        })
        let data = await response.json()

        if (!response.ok) {
            //funkar inte inloggningen så kommer man få upp en feedback ruta.
            feedBack(data)
        } else {
            //Om statusen är ok och man lyckas logga in ska man komma till garderoben via en funktion kanske renderWardrobe
        }

    })
}