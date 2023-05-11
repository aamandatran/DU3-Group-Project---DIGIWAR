"use strict"

async function renderGeneratorPage () {

    main.innerHTML = `
    <div id = generatorParent>
        <div id = generator>
            <div id = generatorGrid>
                <div class = "tops_generate">
                    <img class = arrow src = ../MEDIA/keyboard-arrow-left.png>
                    <div></div>
                    <div id="selectedTop">
                        <div></div>
                    </div>
                    <div></div>
                    <img class = arrow src = ../MEDIA/keyboard-arrow-right.png>
                </div>

                <div class = "bottoms_generate">
                    <img class = arrow src = ../MEDIA/keyboard-arrow-left.png>
                    <div></div>
                    <div id="selectedBottom">
                        <div></div>
                    </div>
                    <div></div>
                    <img class = arrow src = ../MEDIA/keyboard-arrow-right.png>
                </div>

                <div class = "shoes_generate">
                    <img class = arrow src = ../MEDIA/keyboard-arrow-left.png>
                    <div></div>
                    <div id="selectedShoe">                        
                        <div></div>
                    </div>
                    <div></div>
                    <img class = arrow src = ../MEDIA/keyboard-arrow-right.png>
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
              
                document.querySelector("#selectedTop > div").style.backgroundImage = `url(${selectedTop.path})`
                document.querySelector("#selectedBottom > div").style.backgroundImage = `url(${selectedBottom.path})`;
                document.querySelector("#selectedShoe > div").style.backgroundImage = `url(${selectedShoe.path})`;

            }

            let saveIt = document.querySelector("#saveIt");
           // saveIt.addEventListener("click", renderNewOutfitPopUp);
        }
    }


}