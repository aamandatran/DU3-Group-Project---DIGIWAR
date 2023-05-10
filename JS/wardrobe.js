"use strict";

function renderWardrobePage() {
    main.innerHTML = `
        <div id="wardrobeParent"> 
            <div id="wardrobePage">
                <div id="top">
                    <h1>Welcome to your wardrobe!</h1>
                    <nav id="wardrobeNav">
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
        </div>
    `;

    getUserItems()

    const yours = document.getElementById("yours");
    async function getUserItems() {
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
                createItemDiv(your_wardrobe, "all");
                filterByItem(your_wardrobe);
            }
        };
    };

    yours.addEventListener("click", getUserItems);

    const digiwars = document.getElementById("digiwars");
    digiwars.addEventListener("click", async function (event) {
        let request = await fetch("API/digiwars_wardrobe.php");
        let digiwars_wardrobe = await request.json();
        createItemDiv(digiwars_wardrobe, "all");
        filterByItem(digiwars_wardrobe);
    });

    // const outfits = document.getElementById("outfits");
    // outfits.addEventListener("click", async function (event) {

    // });

    document.getElementById("addClothes").addEventListener("click", renderUploadItemPopUp);
}

function filterByItem(wardrobe) {
    document.getElementById("tops").addEventListener("click", async function (event) {
        createItemDiv(wardrobe, "tops");
    });
    document.getElementById("bottoms").addEventListener("click", async function (event) {
        createItemDiv(wardrobe, "bottoms");
    });
    document.getElementById("shoes").addEventListener("click", async function (event) {
        createItemDiv(wardrobe, "shoes");
    });
}

function createItemDiv(array, item) {
    // Empty the feed
    const wardrobeFeed = document.querySelector("#wardrobeFeed > ul");
    wardrobeFeed.innerHTML = "";

    if (item === "tops") {
        if (array.tops.length === 0) {
            document.querySelector("#wardrobeFeed > p").innerHTML = "There are no tops in your wardrobe...";
        } else {
            document.querySelector("#wardrobeFeed > p").innerHTML = "";
            for (let item of array.tops) {
                let div = document.createElement("div");
                div.style.backgroundImage = `url(${item.path})`;
                div.classList.add("feedImages");
                wardrobeFeed.append(div);
            }
        }
    }

    if (item === "bottoms") {
        if (array.bottoms.length === 0) {
            document.querySelector("#wardrobeFeed > p").innerHTML = "There are no bottoms in your wardrobe...";
        } else {
            document.querySelector("#wardrobeFeed > p").innerHTML = "";
            for (let item of array.bottoms) {
                let div = document.createElement("div");
                div.style.backgroundImage = `url(${item.path})`;
                div.classList.add("feedImages");
                wardrobeFeed.append(div);
            }
        }
    }

    if (item === "shoes") {
        if (array.shoes.length === 0) {
            document.querySelector("#wardrobeFeed > p").innerHTML = "There are no shoes in your wardrobe...";
        } else {
            document.querySelector("#wardrobeFeed > p").innerHTML = "";
            for (let item of array.shoes) {
                let div = document.createElement("div");
                div.style.backgroundImage = `url(${item.path})`;
                div.classList.add("feedImages");
                wardrobeFeed.append(div);
            }
        }
    }

    if (item === "all") {
        if (array.tops.length === 0 && array.bottoms.length === 0 && array.shoes.length === 0) {
            document.querySelector("#wardrobeFeed > p").innerHTML = "Your wardrobe is empty... Try adding your own clothes or select clothes from DIGIWARS Catalog!";
        } else {
            document.querySelector("#wardrobeFeed > p").innerHTML = "";

            for (let item of array.tops) {
                let div = document.createElement("div");
                div.style.backgroundImage = `url(${item.path})`;
                div.classList.add("feedImages");
                wardrobeFeed.append(div);
            }

            for (let item of array.bottoms) {
                let div = document.createElement("div");
                div.style.backgroundImage = `url(${item.path})`;
                div.classList.add("feedImages");
                wardrobeFeed.append(div);
            }

            for (let item of array.shoes) {
                let div = document.createElement("div");
                div.style.backgroundImage = `url(${item.path})`;
                div.classList.add("feedImages");
                wardrobeFeed.append(div);
            }
        }
    }
}