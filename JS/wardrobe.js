"use strict";

function renderWardrobePage() {
    display_header_menu()
    document.querySelector("#wardrobeButton").style.fontWeight = "600";

    main.innerHTML = `
        <div id="wardrobeParent"> 
            <div id="wardrobePage">   
                <section id="banner"></section>
                <div>
                    <nav id="filter">
                        <a href="#">Filter</a>
                        <nav id="filtering">
                            <a href="#" id="allItems">All</a>
                            <a href="#" id="tops">Tops</a>
                            <a href="#" id="bottoms">Bottoms</a>
                            <a href="#" id="shoes">Shoes</a>
                        </nav>
                    </nav>
                    <a href="#" id="yours">Yours</a>
                    <a href="#" id="digiwars">Digiwars</a>
                    <a href="#" id="savedOutfits">Outfits</a>
                </div>
                <section id="wardrobeFeed">
                    <ul></ul>
                    <p></p>
                </section>
            </div>
        </div>
    `;

    const digiwars = document.getElementById("digiwars");
    const yours = document.getElementById("yours");

    // Fetch users wardrobe by Id
    async function getUserItems() {
        // document.querySelector("#filtering button#addClothes").style.display = "";
        yours.style.fontWeight = "600";
        digiwars.style.fontWeight = "500";

        let id = localStorage.getItem("id");
        console.log(id);

        let request = await fetch("API/your_wardrobe.php", {
            method: "POST",
            body: JSON.stringify({
                "id": id
            })
        });

        let your_wardrobe = await request.json();
        // Displays the clothing items and enables filtering for users wardrobe
        createItemDivs(your_wardrobe, "all", "yours")
        filterByItem(your_wardrobe, "yours")
    };

    getUserItems()
    yours.addEventListener("click", getUserItems);

    // GET-request to displays the clothing items from DIGIWAR
    digiwars.addEventListener("click", async function (event) {
        // document.querySelector("#filtering button#addClothes").style.display = "none";
        digiwars.style.fontWeight = "600";
        yours.style.fontWeight = "500";

        let request = await fetch("API/digiwars_wardrobe.php");
        let digiwars_wardrobe = await request.json();
        createItemDivs(digiwars_wardrobe, "all", "digiwars")
        filterByItem(digiwars_wardrobe, "digiwars")
    });

    // const outfits = document.getElementById("savedOutfits");
    // outfits.addEventListener("click", async function (event) {

    // });

    // Display pop up to add clothes
    // document.getElementById("addClothes").addEventListener("click", renderUploadItemPopUp);

}

// Filters wardrobe by item
function filterByItem(wardrobe, whose) {
    document.getElementById("allItems").addEventListener("click", async function (event) {
        if (whose === "digiwars") {
            createItemDivs(wardrobe, "all", "digiwars")
        } else {
            // Else === "yours", i.e users wardrobe
            createItemDivs(wardrobe, "all", "yours")
        }
    });

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

    // This is to know which key in object to loop through
    if (item === "tops") {
        if (array.tops.length === 0) {
            // Feedback
            document.querySelector("#wardrobeFeed > p").innerHTML = "There are no tops in your wardrobe...";
        } else {
            document.querySelector("#wardrobeFeed > p").innerHTML = "";
            for (let items of array.tops) {
                // Sends string "tops.json" to add to divs classlist, will use this to send to API to know which file to search in
                createDivs(items, "tops.json");
            }
        }
    }

    if (item === "bottoms") {
        if (array.bottoms.length === 0) {
            document.querySelector("#wardrobeFeed > p").innerHTML = "There are no bottoms in your wardrobe...";
        } else {
            document.querySelector("#wardrobeFeed > p").innerHTML = "";
            for (let items of array.bottoms) {
                createDivs(items, "bottoms.json");
            }
        }
    }

    if (item === "shoes") {
        if (array.shoes.length === 0) {
            document.querySelector("#wardrobeFeed > p").innerHTML = "There are no shoes in your wardrobe...";
        } else {
            document.querySelector("#wardrobeFeed > p").innerHTML = "";
            for (let items of array.shoes) {
                createDivs(items, "shoes.json");
            }
        }
    }

    // ""all" is sent to this function when all items should be displayed, i.e no filtering
    if (item === "all") {
        if (array.tops.length === 0 && array.bottoms.length === 0 && array.shoes.length === 0) {
            document.querySelector("#wardrobeFeed > p").innerHTML = "Your wardrobe is empty... Try adding your own clothes or select clothes from DIGIWARS Catalog!";
        } else {
            document.querySelector("#wardrobeFeed > p").innerHTML = "";

            if (array.tops.length === 0) {
                document.querySelector("#wardrobeFeed > p").innerHTML = "There are no tops in your wardrobe...";
            } else {
                document.querySelector("#wardrobeFeed > p").innerHTML = "";
                for (let items of array.tops) {
                    createDivs(items, "tops.json");
                }
            }

            if (array.bottoms.length === 0) {
                document.querySelector("#wardrobeFeed > p").innerHTML = "There are no bottoms in your wardrobe...";
            } else {
                document.querySelector("#wardrobeFeed > p").innerHTML = "";
                for (let items of array.bottoms) {
                    createDivs(items, "bottoms.json");
                }
            }

            if (array.shoes.length === 0) {
                document.querySelector("#wardrobeFeed > p").innerHTML = "There are no shoes in your wardrobe...";
            } else {
                document.querySelector("#wardrobeFeed > p").innerHTML = "";
                for (let items of array.shoes) {
                    createDivs(items, "shoes.json");
                }
            }
        }
    }

    function createDivs(item, file) {
        let div = document.createElement("div");
        div.style.backgroundImage = `url(${item.path})`;
        div.classList.add("feedImages");
        wardrobeFeed.append(div);

        // Checks if the item belongs to users wardrobe or DIGIWARS, different button functions for each wardrobe, delete for users wardrobe and add for DIGIWARS
        if (whose === "yours") {
            div.innerHTML = `
                <button class='delete itemButton ${file}'>
                    <img src="../MEDIA/trashcan.png">
                </button>
            `;
        } else {
            div.innerHTML = `
                <button class='checkbox itemButton ${file}'>
                    <img src="../MEDIA/empty-checkbox.png">
                </button>
            `;
        }
    }

    document.querySelectorAll("button.itemButton").forEach(button => {
        button.addEventListener("click", deleteOrAdd);
    });

    function deleteOrAdd(e) {
        console.log(e);
        const id = localStorage.getItem("id");
        const path = e.target.parentNode.parentNode.attributes[0].nodeValue;
        // Classlist will either be checkbox or delete, important when sending a request to API
        const classlist = e.target.parentElement.classList[0];
        // The filename in classlist which indicates which JSON file to search in
        const file = e.target.parentElement.classList[2];

        if (classlist === "checkbox") {
            const request = new Request("API/digiwars_wardrobe.php", {
                method: "PATCH",
                body: JSON.stringify({
                    path: path,
                    id: id,
                    file: file
                })
            });

            fetch(request)
                .then(response => response.json())
                .then(data => {
                    if (!data.ok) {
                        console.log(data.message);
                    } else {
                        console.log(data.message);
                        e.target.setAttribute("src", "../MEDIA/checkbox-selected.png");
                    }
                }).catch(error => {
                    console.log(error);
                });
        }

        if (classlist === "delete") {
            const request = new Request("API/your_wardrobe.php", {
                method: "DELETE",
                body: JSON.stringify({
                    path: path,
                    id: id,
                    file: file
                })
            });

            fetch(request)
                .then(response => response.json())
                .then(data => {
                    if (!data.ok) {
                        console.log(data.message);
                    } else {
                        console.log(data.message);
                        // To update the wardrobe feed now that an item was deleted
                        renderWardrobePage();
                    }
                }).catch(error => {
                    console.log(error);
                });
        }
    }
}
