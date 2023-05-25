"use strict";

function renderUploadItemPopUp() {
    const wardrobeParent = document.querySelector("#wardrobeParent");
    const popUp = document.createElement("div");
    popUp.classList.add("popup");
    popUp.classList.add("show");
    popUp.innerHTML = ` 
        <div id="uploadPopUp"> 
            <button id="closePopupButton">X</button>
            <h1>New item</h1>
                <fieldset id="categories">
                    <legend>Choose a category</legend>
                    <button id="tops">Tops</button>
                    <button id="bottoms">Bottoms</button>
                    <button id="shoes">Shoes</button>
                </fieldset>
        </div> 
    `;

    wardrobeParent.append(popUp);

    document.querySelector("#uploadPopUp>button#closePopupButton").addEventListener("click", function (event) {
        popUp.classList.remove("show");
        renderWardrobePage()
    })

    // Event listener for each button to add item to the correct JSON file
    let topsButton = document.querySelector("#uploadPopUp #tops");
    topsButton.addEventListener("click", function (event) {
        showUploadPage("tops.json")
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
            <button id="closePopupButton">X</button>
            <h1>New item</h1>
            <div id="itemImage"></div>
                <form id="upload" action="API/your_wardrobe.php" method="POST">
                    <input type="file" name="item" enctype="multipart/form-data">
                    <button type="submit">Upload image</button>
                </form>
            <button id="done">Done</button>
        `;

        document.querySelector("#uploadPopUp> button#closePopupButton").addEventListener("click", function (event) {
            popUp.classList.remove("show");
            renderWardrobePage()
        })

        document.querySelector("button#done").addEventListener("click", function (event) {
            popUp.classList.remove("show");
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
            const id = localStorage.getItem("id");
            formData.append("id", id);

            const request = new Request("API/your_wardrobe.php", {
                method: "POST",
                body: formData
            });

            fetch(request)
                .then(response => response.json())
                .then(data => {
                    // If data is ok, the uploaded file will be displayed on the website
                    if (!data.ok) {
                        feedback(data.message)
                    } else {
                        document.querySelector("#itemImage").style.backgroundImage = `url(${data.path})`;
                        feedback(data.message)
                    }
                }).catch(error => {
                    console.log(error);
                });
        })
    }
}