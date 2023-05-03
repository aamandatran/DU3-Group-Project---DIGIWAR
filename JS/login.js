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

        let request = await fetch("api/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        })

        const response = await fetch(request);

        if(response.status === 200) {
        //Om förfrågan lyckades så ska användaren logga in
            feedback("login succeeded");
            console.log("login succeeded");
            window.localStorage.setItem("isLoggedIn", true)
        } else {
        //Om förfrågan misslyckades så ska felmeddelandet dyka upp
            let error = await response.json();
            console.log(error.error);
            feedback(error.message);
        }

    })
}