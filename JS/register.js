"use strict"



let main = document.querySelector("main");

function renderRegisterPage() {
    main.innerHTML = `
    <div id=LoginRegisterContainer> 
    <button id=LoginButton>SIGN IN</button>
    <button id=RegisterButton>JOIN</button>
    </div>

    <div id=ProfilePic>
    Hello
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

    let registerForm = document.querySelector("form");
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        let username = document.querySelector("#username").value;
        let password = document.querySelector("#password").value;

        let data = {
            username: username,
            password: password
        };

        let response = await fetch("api / register.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })

    })

}

renderRegisterPage();