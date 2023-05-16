"use strict"

async function editProfile() {
    display_header_menu()
    document.querySelector("#usernameNav").style.fontWeight = "600";

    let response = await fetch("API/profilepics.php");
    let profilepictures = await response.json();
    //Hämtar profilbilder

    function displayProfilePics(array) {
        //Denna funktionen är samma som i login/register och displayar alla bilder. 
        let html = "";
        for (let profilepic of profilepictures) {
            html += `
                    <li class=editProfileOptions>
                    <img src=${profilepic}>
                    </li>
                    `;
        }
        return html;
    }

    let edit_profile_main = document.querySelector("main");

    edit_profile_main.innerHTML = `
        <div id=editProfileWrapper>
            <div id=editProfile>
                <h1 id=editHeader>EDIT PROFILE</h1>

                <div>
                    <div class="title">PROFILE PICTURE</div>
                    <div>
                        <div id="SelectedProfile"></div>
                        <form id=editProfilePicForm>
                            <ul class = profileOptionsContainer>
                                ${displayProfilePics(profilepictures)}
                            </ul>
                            <button id=editprofilePicButton>Save</button>
                        </form>
                    </div>
                </div>

                <form id=editProfileForm> 
                    <div class="title">PASSWORD</div>
                    <input type=text placeholder="Old password" id=oldPassword>
                    <input type=password placeholder="New password" id=newPassword>
                    <div id=submitButtonContainer>
                        <button id=editProfileSubmitButton type=submit>Save</button>
                    </div>
                </form>
            </div>
        </div>
    `
    //Displayar hela edit profile sidan och anropar samtidigt displayProfilePics i html. 

    let profileOptions = document.querySelectorAll(".editProfileOptions");
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
    let userName = localStorage.getItem("username");
    //Hämtar username ifrån localstorage.

    let editProfilePicForm = document.querySelector("#editProfilePicForm")
    editProfilePicForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        window.localStorage.setItem("profilepicture", selectedProfilePic)

        let userData = {
            profilePic: selectedProfilePic,
            userName: userName
        }
        try {
            let response = await fetch("api/edit_profile_pic.php", {
                method: "PATCH",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(userData)
            })

            console.log(response);
            let data = await response.json();
            console.log(data);

            display_header_menu()

            if (!response.ok) {
                feedback(data.message)
                console.log(data.message);
            } else {
                feedback(data.message)
                console.log(data.message,);
            }
        } catch (err) {
            console.log(err.message)
        }
    })

    let editProfileForm = document.querySelector("#editProfileForm");
    editProfileForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        let oldPassword = document.querySelector("#oldPassword").value;
        let newPassword = document.querySelector("#newPassword").value;


        let userData = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            userName: userName,
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
                feedback(data.message)
                console.log(data.message);
            } else {
                feedback(data.message)
                console.log(data.message,);
            }
        } catch (err) {
            console.log(err.message);
        }

    })
}

