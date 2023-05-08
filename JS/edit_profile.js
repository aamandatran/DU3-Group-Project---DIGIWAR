"use strict"



async function editProfile() {


    let response = await fetch("API/profilepics.php");
    let profilepictures = await response.json();
    //Hämtar profilbilder

    function displayProfilePics(array) {
        //Denna funktionen är samma som i login/register och displayar alla bilder. 
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
    //Displayar hela edit profile sidan och anropar samtidigt displayProfilePics i html. 

    let profileOptions = document.querySelectorAll(".profileOption");
    //Querieseleqtar till alla bilder för att kunna gå igenom dem och lägga till event listner på var och en här nere.
    let selectedProfilePic;
    //Variabeln "selectedProfilePic" skapar jag här för att sedan andvända i event functionen nedan där jag ger variabeln ett värde. 

    for (let option of profileOptions) {
        //här går vi igenom bilderna lägger till event "Click" och den bilden man klickar på ska displayas i "#selectedProfile"
        option.addEventListener("click", function (event) {
            selectedProfilePic = event.target.src;
            //Variabeln "selectedProfilepic" ger jag ett värde här vilket då blir den bilden man klickar på. Variabeln skickar jag sen med i "userData"
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
        //Hämtar username ifrån localstorage.


        let userData = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            userName: "Wille",
            profilePic: selectedProfilePic
        };


        try {
            //Skickar patch request med "userData som body"
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

