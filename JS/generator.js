"use strict"

async function renderGeneratorPage() {
    display_header_menu()
    main.innerHTML = `
    <div id = generatorParent>
        <div id = generator>
            <div id = generatorGrid>
                <div class = "tops_generate">
                    ${displayArrows("Top", "left")}
                    <div></div>
                    <div id="selectedTop">
                        <div></div>
                    </div>
                    <div></div>
                    ${displayArrows("Top", "right")}
                    </div>

                <div class = "bottoms_generate">
                    ${displayArrows("Bottom", "left")}
                    <div></div>
                    <div id="selectedBottom">
                        <div></div>
                    </div>
                    <div></div>
                    ${displayArrows("Bottom", "right")}
                    </div>

                <div class = "shoes_generate">
                ${displayArrows("Shoe", "left")}
                <div></div>
                    <div id="selectedShoe">                        
                        <div></div>
                    </div>
                    <div></div>
                    ${displayArrows("Shoe", "right")}
                    </div>
            </div>

            <div class = "generateOrSave">
            <button id = generatorButton>GENERATOR</button>
            <div id = saveIt>
                <img src = ../MEDIA/heart.png>
                <p>Save it!</p>
            </div>
            </div>
        </div>
    </div>
    `;


    

    let username = window.localStorage.getItem("username");

    let request = await fetch("api/users.php");
    let users = await request.json();
    console.log(users);
    for (let user of users) {
        if (user.username === username) {
            let id = user.id;
            console.log(id);
            let userData = {
                id: id
            };
            function displayArrows (item, direction) {
        let html = "";
            html = `
            <img src=keyboard-arrow-${direction} class = arrow arrow${item}>
            `;        
        html.addEventListener("click", generateItem);
        return html;
    }
            const post_request = new Request ("api/your_wardrobe.php", {
                method: "POST",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify(userData),
            });

            const response = await fetch(post_request);
            let wardrobe = await response.json();
            console.log(response);
            console.log(wardrobe);

            let tops = wardrobe.tops;
            let bottoms = wardrobe.bottoms;
            let shoes = wardrobe.shoes;

            let generateButton = document.querySelector("button");
            generateButton.addEventListener("click", generator);

            function generator(event) {

                let selectedTop = tops[Math.floor(Math.random() * tops.length)];
                let selectedBottom = bottoms[Math.floor(Math.random() * bottoms.length)];
                let selectedShoe = shoes[Math.floor(Math.random() * shoes.length)];

                document.getElementById("selectedTop").innerHTML = `<img src=${selectedTop.path}>`;
                document.getElementById("selectedBottom").innerHTML = `<img src=${selectedBottom.path}>`;
                document.getElementById("selectedShoe").innerHTML = `<img src=${selectedShoe.path}>`;

            }

            let arrowButton = document.querySelectorAll(".arrow");
            arrowButton.addEventListener("click", generateItem);

            function generateItem (event) {

                console.log(event.value);
            }

            let saveIt = document.querySelector("#saveIt");
            // saveIt.addEventListener("click", renderNewOutfitPopUp);
        }
    }


}