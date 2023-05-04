"use strict";

function renderUploadItemPopUp() {
    main.innerHTML = ` 
    <div class="popUp"> 
        <h1>New item</h1>
            <fieldset id="categories">
                <legend>Choose a category</legend>
                <button id="tops">TOPS</button>
                <button id="bottoms">BOTTOMS</button>
                <button id="shoes">SHOES</button>
            </fieldset>
    </div>  
    `;

    // Event listener for each button to add item to the correct JSON file
    let topsButton = main.querySelector("#tops");
    topsButton.addEventListener("click", function (event) {
        showUploadPage("tops.json")

    });

    let bottomsButton = main.querySelector("#bottoms");
    bottomsButton.addEventListener("click", function (event) {
        showUploadPage("bottoms.json")

    });

    let shoesButton = main.querySelector("#shoes");
    shoesButton.addEventListener("click", function (event) {
        showUploadPage("shoes.json")

    });

    function showUploadPage(filename) {
        main.innerHTML = ` 
        <div class="popUp">
            <h1>New item</h1>
            <div id="itemImage"></div>
            <form id="upload" action="API/your_wardrobe.php" method="POST">
                <input type="file" name="item">
                <button type="submit">Upload image</button>
            </form>
            <div>
                <p>Username</p>
                <button id="done">DONE</button>
            </div>
        </div>
    `;

        const form = document.getElementById("upload");
        form.addEventListener("submit", function (event) {
            // Prevents deafault action of form
            event.preventDefault();

            const formData = new FormData(form);
            // Filename that was sent when this function was called
            formData.append("file", filename);
            // Id of user
            const id = localStorage.getItem("username");
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