"use strict"



async function editProfile(event) {

    let edit_profile_main = document.querySelector("main");

    edit_profile_main.innerHTML = `
    <div id=editProfile>
    <h1 id=editHeader>EDIT PROFILE</h1>
    <h2 id=profileHeader>PROFILE PICTURE</h2>

    <form>
    <div>

    </div>
    </form>


    <form>
    <p class=InputHeader>Old password</p>
    <input type=text placeholder=old id=oldPassword>
    <p class=InputHeader>New password</p>
    <input type=password placeholder=new id=newPassword>
    <div id=submitButtonContainer>
    <button id=submitButton type=submit>Save</button>
    </div>
    </form>

    </div>

    `

    let registerForm = document.querySelector("form");
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        let oldPassword = document.querySelector("#oldPassword").value;
        let newPassword = document.querySelector("#newPassword").value;
        let userName = localStorage.getItem("username");

        let userData = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            userName: userName
        };

        try {
            let response = await fetch("api/edit_profile.php", {
                method: "PATCH",
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

    })
}

editProfile()