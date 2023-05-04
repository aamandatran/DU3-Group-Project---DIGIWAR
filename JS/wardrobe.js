"use strict";

function renderWardrobePage() {
    document.querySelector("body").innerHTML = `
        <div id="wrapper">
            <div id="top">
                <h1>Welcome to your wardrobe!</h1>
                <nav>
                    <a id="yours" href="#">YOURS</a>
                    <a id="digiwars" href="#">DIGIWAR'S</a>
                    <a id="outfits" href="#">SAVED OUTFITS</a>
                </nav>
            </div>
            <div id="bottom">
                <div id="filtering">
                    <fieldset id="categories">
                        <legend>Choose a category</legend>
                        <button id="tops">TOPS</button>
                        <button id="bottoms">BOTTOMS</button>
                        <button id="shoes">SHOES</button>
                    </fieldset>
                    <button id="addClothes">Add Clothes</button>
                </div>
                <div id="wardrobeFeed">
                    <p></p>
                    <ul></ul>
                </div>
            </div>
        </div>
    `;

    const yours = document.getElementById("yours");
    yours.addEventListener("click", async function (event) {
        let usersRequest = await fetch("api/users.php");
        let users = await usersRequest.json();

        const username = localStorage.getItem("username");
        for (let user of users) {
            if (user.username === username) {
                let id = user.id;
                console.log(id);

                let request = await fetch("API/your_wardrobe.php", {
                    method: "POST",
                    body: JSON.stringify({
                        "id": id
                    })
                });

                let your_wardrobe = await request.json();

                for (let item of your_wardrobe.tops) {
                    let div = document.createElement("div");
                    div.style.backgroundImage = `url(${item.path})`;
                    div.classList.add("feedImages");
                    document.querySelector("div#wardrobeFeed > ul").append(div);
                }

                for (let item of digiwars_wardrobe.bottoms) {
                    let div = document.createElement("div");
                    div.style.backgroundImage = `url(${item.path})`;
                    div.classList.add("feedImages");
                    document.querySelector("div#wardrobeFeed > ul").append(div);
                }

                for (let item of digiwars_wardrobe.shoes) {
                    let div = document.createElement("div");
                    div.style.backgroundImage = `url(${item.path})`;
                    div.classList.add("feedImages");
                    document.querySelector("div#wardrobeFeed > ul").append(div);
                }
            }
        }
    });

    const digiwars = document.getElementById("digiwars");
    digiwars.addEventListener("click", async function (event) {
        let request = await fetch("API/digiwars_wardrobe.php");
        let digiwars_wardrobe = await request.json();
        for (let item of digiwars_wardrobe.tops) {
            let div = document.createElement("div");
            div.style.backgroundImage = `url(${item.path})`;
            div.classList.add("feedImages");
            document.querySelector("div#wardrobeFeed > ul").append(div);
        }

        for (let item of digiwars_wardrobe.bottoms) {
            let div = document.createElement("div");
            div.style.backgroundImage = `url(${item.path})`;
            div.classList.add("feedImages");
            document.querySelector("div#wardrobeFeed > ul").append(div);
        }

        for (let item of digiwars_wardrobe.shoes) {
            let div = document.createElement("div");
            div.style.backgroundImage = `url(${item.path})`;
            div.classList.add("feedImages");
            document.querySelector("div#wardrobeFeed > ul").append(div);
        }

    });

    // const outfits = document.getElementById("outfits");
    // outfits.addEventListener("click", async function (event) {

    // });

    document.getElementById("addClothes").addEventListener("click", renderUploadItemPopUp);


}