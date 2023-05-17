"use strict";

function renderUploadItemPopUp() {
    const wardrobeParent = document.querySelector("#wardrobeParent");
    wardrobeParent.innerHTML += ` 
        <div id="uploadPopUp"> 
            <div class="cancel">X</div>
            <h1>New item</h1>
                <fieldset id="categories">
                    <legend>Choose a category</legend>
                    <button id="tops">Tops</button>
                    <button id="bottoms">Bottoms</button>
                    <button id="shoes">Shoes</button>
                </fieldset>
        </div>  
    `;

    document.querySelector(".cancel").addEventListener("click", function (event) {
        document.getElementById("uploadPopUp").innerHTML = "";
        renderWardrobePage()
    })

    // Event listener for each button to add item to the correct JSON file
    let topsButton = document.querySelector("#uploadPopUp #tops");
    topsButton.addEventListener("click", function (event) {
        showUploadPage("tops.json")
        console.log("it works");

    });

    let bottomsButton = document.querySelector("#uploadPopUp #bottoms");
    bottomsButton.addEventListener("click", function (event) {
        showUploadPage("bottoms.json")

    });

    let shoesButton = document.querySelector("#uploadPopUp #shoes");
    shoesButton.addEventListener("click", function (event) {
        showUploadPage("shoes.json")

    });

    function showUploadPage(filename) {
        const uploadPopUp = document.querySelector("#uploadPopUp");
        uploadPopUp.innerHTML = ` 
            <div class="cancel">X</div>
            <h1>New item</h1>
            <div id="itemImage"></div>
                <form id="upload" action="API/your_wardrobe.php" method="POST">
                    <input type="file" name="item">
                    <button type="submit">Upload image</button>
                </form>
            <button id="done">Done</button>
        `;

        document.querySelector("div.cancel").addEventListener("click", function (event) {
            uploadPopUp.innerHTML = "";
            uploadPopUp.style.top = "15vh";
            renderWardrobePage()
        })

        document.querySelector("button#done").addEventListener("click", function (event) {
            uploadPopUp.innerHTML = "";
            uploadPopUp.style.top = "15vh";
            renderWardrobePage()
        })



        const form = document.getElementById("upload");
        form.addEventListener("submit", async function (event) {
            // Prevents deafault action of form
            event.preventDefault();

            const formData = new FormData(form);
            // Filename that was sent when this function was called
            formData.append("file", filename);
            // Get Id of user
            let usersRequest = await fetch("api/users.php");
            let users = await usersRequest.json();

            const username = localStorage.getItem("username");
            for (let user of users) {
                if (user.username === username) {
                    let id = user.id;
                    console.log(id);
                    formData.append("id", id);
                }
            }

            const request = new Request("API/your_wardrobe.php", {
                method: "POST",
                body: formData
            });

            fetch(request)
                .then(response => response.json())
                .then(data => {

                    // If data is ok, the uploaded file will be displayed on the website
                    if (!data.ok) {
                        console.log(data.message);
                    } else {
                        document.querySelector("#itemImage").style.backgroundImage = `url(${data.path})`;
                        console.log(data.message);
                        console.log(data.path);
                    }
                }).catch(error => {
                    console.log(error);
                });
        })
    }
}