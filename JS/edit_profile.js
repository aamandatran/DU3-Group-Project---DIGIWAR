"use strict"



async function editProfile() {


    let response = await fetch("API/profilepics.php");
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

    let edit_profile_main = document.querySelector("main");

    edit_profile_main.innerHTML = `
    <div id=editProfile>
    <h1 id=editHeader>EDIT PROFILE</h1>
    <h2 id=profileHeader>PROFILE PICTURE</h2>

    <div id = SelectedProfile>
    </div>

    <ul class = profileOptions>
        ${displayProfilePics(profilepictures)}
    </ul>


    <form id=editProfileForm> 
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
    let profileOptions = document.querySelectorAll(".profileOption");
    let selectedProfilePic;

    for (let option of profileOptions) {
        option.addEventListener("click", function (event) {
            selectedProfilePic = event.target.src;
            document.querySelector("#SelectedProfile").innerHTML = `
            <img src=${event.target.src} class=selectedProfilePic>`
        })

    }

    let registerForm = document.querySelector("#editProfileForm");
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        let oldPassword = document.querySelector("#oldPassword").value;
        let newPassword = document.querySelector("#newPassword").value;
        let userName = localStorage.getItem("username");


        let userData = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            userName: userName,
            profilePic: selectedProfilePic
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

