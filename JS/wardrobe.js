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
        let id = localStorage.getItem("id");
        console.log(id);

        let request = await fetch("API/your_wardrobe.php", {
            method: "POST",
            body: JSON.stringify({
                "id": id
            })
        });

        let your_wardrobe = await request.json();
        createItemDivs(your_wardrobe, "all", "yours");
        filterByItem(your_wardrobe, "yours");
    };

    yours.addEventListener("click", getUserItems);

    const digiwars = document.getElementById("digiwars");
    digiwars.addEventListener("click", async function (event) {
        let request = await fetch("API/digiwars_wardrobe.php");
        let digiwars_wardrobe = await request.json();
        createItemDivs(digiwars_wardrobe, "all", "digiwars");
        filterByItem(digiwars_wardrobe, "digiwars");
    });

    // const outfits = document.getElementById("outfits");
    // outfits.addEventListener("click", async function (event) {

    // });

    document.getElementById("addClothes").addEventListener("click", renderUploadItemPopUp);
}

function filterByItem(wardrobe, whose) {
    document.getElementById("tops").addEventListener("click", async function (event) {
        if (whose === "digiwars") {
            createItemDivs(wardrobe, "tops", "digiwars");
        } else {
            createItemDivs(wardrobe, "tops", "yours");
        }
    });
    document.getElementById("bottoms").addEventListener("click", async function (event) {
        if (whose === "digiwars") {
            createItemDivs(wardrobe, "bottoms", "digiwars");
        } else {
            createItemDivs(wardrobe, "bottoms", "yours");
        }
    });
    document.getElementById("shoes").addEventListener("click", async function (event) {
        if (whose === "digiwars") {
            createItemDivs(wardrobe, "shoes", "digiwars");
        } else {
            createItemDivs(wardrobe, "shoes", "yours");
        }
    });
}

function createItemDivs(array, item, whose) {
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
                if (whose === "yours") {
                    div.innerHTML = `
                        <button class="delete itemButton">
                            <img src="../MEDIA/trashcan.png">
                        </button>
                    `;
                } else {
                    div.innerHTML = `
                        <button class="checkbox itemButton">
                            <img src="../MEDIA/empty-checkbox.png">
                        </button>
                    `;
                }

                document.querySelector("button.itemButton").addEventListener("click", deleteOrAdd);
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
                if (whose === "yours") {
                    div.innerHTML = `
                        <button class="delete itemButton">
                            <img src="../MEDIA/trashcan.png">
                        </button>
                    `;
                } else {
                    div.innerHTML = `
                        <button class="checkbox itemButton">
                            <img src="../MEDIA/empty-checkbox.png">
                        </button>
                    `;
                }

                document.querySelector("button.itemButton").addEventListener("click", deleteOrAdd);
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
                if (whose === "yours") {
                    div.innerHTML = `
                        <button class="delete itemButton">
                            <img src="../MEDIA/trashcan.png">
                        </button>
                    `;
                } else {
                    div.innerHTML = `
                        <button class="checkbox itemButton">
                            <img src="../MEDIA/empty-checkbox.png">
                        </button>
                    `;
                }

                document.querySelector("button.itemButton").addEventListener("click", deleteOrAdd);
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
                if (whose === "yours") {
                    div.innerHTML = `
                        <button class="delete itemButton">
                            <img src="../MEDIA/trashcan.png">
                        </button>
                    `;
                } else {
                    div.innerHTML = `
                        <button class="checkbox itemButton">
                            <img src="../MEDIA/empty-checkbox.png">
                        </button>
                    `;
                }

                document.querySelector("button.itemButton").addEventListener("click", deleteOrAdd);
            }

            for (let item of array.bottoms) {
                let div = document.createElement("div");
                div.style.backgroundImage = `url(${item.path})`;
                div.classList.add("feedImages");
                wardrobeFeed.append(div);
                if (whose === "yours") {
                    div.innerHTML = `
                        <button class="delete itemButton">
                            <img src="../MEDIA/trashcan.png">
                        </button>
                    `;
                } else {
                    div.innerHTML = `
                        <button class="checkbox itemButton">
                            <img src="../MEDIA/empty-checkbox.png">
                        </button>
                    `;
                }

                document.querySelector("button.itemButton").addEventListener("click", deleteOrAdd);
            }

            for (let item of array.shoes) {
                let div = document.createElement("div");
                div.style.backgroundImage = `url(${item.path})`;
                div.classList.add("feedImages");
                wardrobeFeed.append(div);
                if (whose === "yours") {
                    div.innerHTML = `
                        <button class="delete itemButton">
                            <img src="../MEDIA/trashcan.png">
                        </button>
                    `;
                } else {
                    div.innerHTML = `
                        <button class="checkbox itemButton">
                            <img src="../MEDIA/empty-checkbox.png">
                        </button>
                    `;
                }

                document.querySelector("button.itemButton").addEventListener("click", deleteOrAdd);
            }
        }
    }
}

function deleteOrAdd(e) {
    console.log(e);
}