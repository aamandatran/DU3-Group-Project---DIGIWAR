"use strict"

async function renderGeneratorPage () {

    main.innerHTML = `
    <div id = generatorParent>
        <div id = generator>
            <div id = generatorGrid>
                <div class = "tops_generate">
                    <div id="arrow">
                        <img>
                    </div>
                    <div></div>
                    <div id="selectedTop"></div>
                    <div></div>
                    <div id="arrow">
                        <img>
                    </div>
                </div>

                <div class = "bottoms_generate">
                    <div id="arrow">
                        <img>
                    </div>
                    <div></div>
                    <div id="selectedBottom"></div>
                    <div></div>
                    <div id="arrow">
                        <img>
                    </div>
                </div>

                <div class = "shoes_generate">
                    <div id="arrow">
                        <img>
                    </div>
                    <div></div>
                    <div id="selectedShoe"></div>
                    <div></div>
                    <div id="arrow">
                        <img>
                    </div>
                </div>
            </div>

            <div class = "generateOrSave">
            <button>GENERATOR</button>
            <p id="saveIt">Save it</p>
            </div>
        </div>
    </div>
    `;

    let username = window.localStorage.getItem("username");

    let request = await fetch("api/users.php");
    let users = await request.json();
    console.log(users);
    for(let user of users) {
        if(user.username === username) {
            let id = user.id;
            console.log(id);
            let userData = {
                id: id
            };
        
            const post_request = new Request ("api/your_wardrobe.php", {
                method: "POST",
                headers: {"Content-type": "application/json; charset=UTF-8"},
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
        
            function generator (event) {

                let selectedTop = tops[Math.floor(Math.random() * tops.length)];
                let selectedBottom = bottoms[Math.floor(Math.random() * bottoms.length)];
                let selectedShoe = shoes[Math.floor(Math.random() * shoes.length)];
              
                document.getElementById("selectedTop").innerHTML = `<img src=${selectedTop.path}>`;
                document.getElementById("selectedBottom").innerHTML = `<img src=${selectedBottom.path}>`;
                document.getElementById("selectedShoe").innerHTML = `<img src=${selectedShoe.path}>`;

            }

            let saveIt = document.querySelector("#saveIt");
           // saveIt.addEventListener("click", renderNewOutfitPopUp);
        }
    }


}