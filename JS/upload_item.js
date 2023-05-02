"use strict";

const main = document.querySelector("main");

function renderUploadItemPopUp() {
    main.innerHTML = ` 
        <div>
            <h1>New item</h1>
            <fieldset>
                <legend>Choose a category</legend>
                <button id="tops">TOPS</button>
                <button id="bottoms">BOTTOMS</button>
                <button id="shoes">SHOES</button>
            </fieldset>
        </div>
    `;


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
        <div>
            <h1>New item</h1>
            <div id="itemImage"></div>
            <form id="upload" action="API/your_wardrobe.php" method="POST">
                <input type="file" name="item">
                <button type="submit">Upload image</button>
            </form>
            <div>
                <p>Username</p>
                <button id="uploadItem">DONE</button>
            </div>
        </div>
    `;

        const form = document.getElementById("upload");
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const formData = new FormData(form);
            formData.append("file", filename);
            formData.append("id", 1);
            const request = new Request("API/your_wardrobe.php", {
                method: "POST",
                body: formData
            });

            fetch(request)
                .then(response => response.json())
                .then(data => {
                    // Resets the form
                    form.reset();

                    if (!data.ok) {
                        console.log(data.message);
                    } else {
                        console.log(data.message);
                        let img = document.createElement("img");
                        img.src = data.path;
                        document.getElementById("itemImage").append(img);
                    }
                });

        })
    }
}