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


    //Selects all pictures to be able to go though them and add event listners in each one.
    let profileOptions = document.querySelectorAll(".editProfileOptions");
    //The variable "selectedProfilePic" is created here to then use in the event function down below where i give the variable a value. 
    let selectedProfilePic;

    //Here i go trough all the pictures and add an event listner to each picture and the picture that is clicked is displayed in "#selectedProfile"
    for (let option of profileOptions) {
        option.addEventListener("click", function (event) {
            // Im adding a value to the variable "selectedProfilePic" which is the picture that is clicked. This variable is later used in the "userData"
            selectedProfilePic = event.target.attributes[0].value;
            //I add the selectedProfilePic to the innerHTML.
            document.querySelector("#SelectedProfile").innerHTML = `
            <img src=${selectedProfilePic} class=selectedProfilePic>`
        })

    }// Fetching the username from the localstorage to then send it to both editProfilePic.php and editProfile.php
    let userName = localStorage.getItem("username");

    let editProfilePicForm = document.querySelector("#editProfilePicForm")
    editProfilePicForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        //Here i update the localStorage with the new profile picture so that it can be used in the header.
        window.localStorage.setItem("profilepicture", selectedProfilePic)
        //This is what im sending with the body to editProfilePic.php.
        let userData = {
            profilePic: selectedProfilePic,
            userName: userName
        }
        try {
            //Sending a patch request to the database.
            let response = await fetch("api/edit_profile_pic.php", {
                method: "PATCH",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(userData)
            })

            let data = await response.json();

            display_header_menu()
            //Calls the feedback function with the message we got from the server.
            feedback(data.message);
        } catch (err) {
            feedback(err.message)
        }
    })

    let editProfileForm = document.querySelector("#editProfileForm");
    editProfileForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        //Collecting both the new password and the old one from the inputs to put in the userData
        let oldPassword = document.querySelector("#oldPassword").value;
        let newPassword = document.querySelector("#newPassword").value;


        let userData = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            userName: userName,
        };

        try {
            //Sends patch request with the "userData" object as body.
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

