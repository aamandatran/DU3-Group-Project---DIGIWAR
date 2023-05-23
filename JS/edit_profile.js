"use strict"

async function editProfile() {
    display_header_menu()
    //Adding the class selected to the username displayed in the header. 
    document.getElementById("usernameNav").classList.add("selected");

    //Fetching the profile pictures. 
    let response = await fetch("API/profilepics.php");
    let profilepictures = await response.json();

    //Fetching the users selected profile pic to display it in the selectedProfilePic img in innerHTML
    let savedProfilePic = localStorage.getItem("profilepicture");
    let edit_profile_main = document.querySelector("main");

    //Displays the whole edit profile page and calls the function displayProfilePics in the innerHTML. 
    edit_profile_main.innerHTML = `
    <div id=editProfileWrapper>
    <div id=editProfile>
    <h1 id=editHeader>EDIT PROFILE</h1>
    
    <div>
    <div class="title">PROFILE PICTURE</div>
                    <div>
                        <div id="SelectedProfile">
                            <img src=${savedProfilePic} class=selectedProfilePic>
                        </div>
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


    let profileOptions = document.querySelectorAll(".editProfileOptions");
    //Querieseleqtar till alla bilder för att kunna gå igenom dem och lägga till event listner på var och en här nere.
    let selectedProfilePic;
    //Variabeln "selectedProfilePic" skapar jag här för att sedan andvända i event functionen nedan där jag ger variabeln ett värde. 

    for (let option of profileOptions) {
        //här går vi igenom bilderna lägger till event "Click" och den bilden man klickar på ska displayas i "#selectedProfile"
        option.addEventListener("click", function (event) {
            selectedProfilePic = event.target.attributes[0].value;
            //Variabeln "selectedProfilepic" ger jag ett värde här vilket då blir den bilden man klickar på. Variabeln skickar jag sen med i "userData"
            document.querySelector("#SelectedProfile").innerHTML = `
            <img src=${selectedProfilePic} class=selectedProfilePic>`
        })

    }
    let userName = localStorage.getItem("username");
    //Hämtar username ifrån localstorage för att kunna skicka med till både editProfilePic och editProfile

    let editProfilePicForm = document.querySelector("#editProfilePicForm")
    editProfilePicForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        window.localStorage.setItem("profilepicture", selectedProfilePic)
        //Här uppdaterar jag localStorage med den nya profilbilden så att den ska kunna andvänas i headern. 

        let userData = {
            //Detta blir vad jag skickar med i bodyn till editProfilePic
            profilePic: selectedProfilePic,
            userName: userName
        }
        try {
            //skickar en patch request till databasen. 
            let response = await fetch("api/edit_profile_pic.php", {
                method: "PATCH",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(userData)
            })

            let data = await response.json();

            display_header_menu()

            feedback(data.message);
            //Anropar feedback funktionen med meddelandet vi fick från servern. 
        } catch (err) {
            feedback(err.message)
        }
    })

    let editProfileForm = document.querySelector("#editProfileForm");
    editProfileForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        let oldPassword = document.querySelector("#oldPassword").value;
        let newPassword = document.querySelector("#newPassword").value;
        //Hämtar både gamla och nya lösenordet för att kunna lägga in i userData


        let userData = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            userName: userName,
        };


        try {
            //Skickar patch request med "userData" objectet som body"
            let response = await fetch("api/edit_profile.php", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            })

            let data = await response.json()

            feedback(data.message);
        } catch (err) {
            feedback(err.message);
        }

    })
}

