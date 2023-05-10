"use strict"

function renderLoginPage() {
    main.innerHTML = `
    <div id = parent>
        <div id = login>
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
                </div>
        </div>
    </div>
    `;
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

        const request = new Request("api/login.php", {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(userData),
        });

        const response = await fetch(request);

        let id, profilepicture;

        if (response.status === 200) {
            feedback("login succeeded");
            console.log("login succeeded");

            let response = await fetch("API/users.php");
            let users = await response.json();
            console.log(users);

            for (let user of users) {
                if (user.username === username) {
                    id = user.id;
                    profilepicture = user.profilepicture;
                    break;
                }
            }

            window.localStorage.setItem("id", id);
            window.localStorage.setItem("profilepicture", profilepicture);
            window.localStorage.setItem("isLoggedIn", true);
            window.localStorage.setItem("username", username);
            window.localStorage.setItem("password", password);
            renderWardrobePage();

        } else {
            //Om förfrågan misslyckades så skickas felmeddelande
            let error = await response.json();
            console.log(error.error);
            feedback(error.message);
        }
    });
}