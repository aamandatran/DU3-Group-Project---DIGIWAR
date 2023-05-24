"use strict";

function renderWardrobePage() {
    display_header_menu()
    document.getElementById("wardrobeButton").classList.add("selected");

    main.innerHTML = `
        <div id="wardrobeParent"> 
            <div id="wardrobePage">   
                <section>
                    <div id="banner">
                        <div>ONE STEP CLOSER TO END THE WAR</div>
                    </div>
                </section>
                <div>
                    <div id="yours">Yours</div>
                    <div id="digiwars">Digiwars</div>
                    <div id="savedOutfits">Outfits</div>
                </div>
                <div id="bottom"></div>
            </div>
            <div id="popupWindow" class="popup">
                <div id="popupContent">
                    <h1 id=outfitH1>Outfit</h1>
                    <button id="closePopupButton">X</button>
                    <div id="popupOutfit"></div>
                    <div id=descriptionOutfit></div>
                    <div id=stylesOutfit></div>
                </div>
            </div>
        </div>
    `;

    const digiwars = document.querySelector("#wardrobePage>div>div#digiwars");
    const yours = document.querySelector("#wardrobePage>div>div#yours");
    const outfits = document.querySelector("#wardrobePage>div>div#savedOutfits");


    outfits.addEventListener("click", renderOutfits);

    // Fetch users wardrobe by Id
    async function getUserItems(event) {
        // CSS indicator
        yours.classList.add("selected");
        digiwars.classList.remove("selected");
        outfits.classList.remove("selected");

        document.getElementById("bottom").innerHTML = `
            <nav id="filter">
                <a href="#">FILTER</a>
                <nav id="filtering">
                    <a href="#" id="allItems">All</a>
                    <a href="#" id="tops">Tops</a>
                    <a href="#" id="bottoms">Bottoms</a>
                    <a href="#" id="shoes">Shoes</a>
                </nav>
                <button id="addClothes">Add clothes</button>
            </nav>
            <section id="wardrobeFeed">
                <ul></ul>
                <p></p>
            </section>
        `;

        // Display pop up to add clothes
        document.getElementById("addClothes").addEventListener("click", renderUploadItemPopUp);

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

    // When refreshing the website it should always display users wardrobe
    getUserItems()

    yours.addEventListener("click", getUserItems);


    // GET-request to displays the clothing items from DIGIWAR
    digiwars.addEventListener("click", async function (event) {
        // CSS indicator
        digiwars.classList.add("selected");
        yours.classList.remove("selected");
        outfits.classList.remove("selected");

        document.getElementById("bottom").innerHTML = `
            <nav id="filter">
                <a href="#">FILTER</a>
                <nav id="filtering">
                    <a href="#" id="allItems">All</a>
                    <a href="#" id="tops">Tops</a>
                    <a href="#" id="bottoms">Bottoms</a>
                    <a href="#" id="shoes">Shoes</a>
                </nav>
            </nav>
            <section id="wardrobeFeed">
                <ul></ul>
                <p></p>
            </section>
        `;

        let request = await fetch("API/digiwars_wardrobe.php");
        let digiwars_wardrobe = await request.json();
        createItemDivs(digiwars_wardrobe, "all", "digiwars")
        filterByItem(digiwars_wardrobe, "digiwars")
    });
}

// Filters wardrobe by item
function filterByItem(wardrobe, whose) {

    function addItemEventListener(itemId, category) {
        document.getElementById(itemId).addEventListener("click", async function (event) {
            event.preventDefault();
            if (whose === "digiwars") {
                createItemDivs(wardrobe, category, whose)
            } else {
                // Else === "yours", i.e users wardrobe
                createItemDivs(wardrobe, category, whose)
            }
        });
    }

    addItemEventListener("allItems", "all")
    addItemEventListener("tops", "tops")
    addItemEventListener("bottoms", "bottoms")
    addItemEventListener("shoes", "shoes")
}


function createItemDivs(array, item, whose) {
    // Empty the feed
    const wardrobeFeed = document.querySelector("#wardrobeFeed > ul");
    wardrobeFeed.innerHTML = "";

    function createDivsWithFeedback(items, fileType) {
        if (items.length === 0) {
            // Feedback
            wardrobeFeed.innerHTML = `There are no ${item} in your wardrobe...`;
        } else {
            wardrobeFeed.innerHTML = "";
            for (let item of items) {
                // Sends string with filename to add to divs classlist, will use this to send to API to know which file to search in
                createDivs(item, fileType);
            }
        }
    }

    switch (item) {
        case "tops":
            createDivsWithFeedback(array.tops, "tops.json");
            break;
        case "bottoms":
            createDivsWithFeedback(array.bottoms, "bottoms.json");
            break;
        case "shoes":
            createDivsWithFeedback(array.shoes, "shoes.json");
            break;
        case "all":
            // ""all" is sent to this function when all items should be displayed, i.e no filtering
            if (
                array.tops.length === 0 &&
                array.bottoms.length === 0 &&
                array.shoes.length === 0
            ) {
                wardrobeFeed.innerHTML =
                    "Your wardrobe is empty... Try adding your own clothes or select clothes from DIGIWARS Catalog!";
            } else {
                wardrobeFeed.innerHTML = "";
                for (let top of array.tops) {
                    createDivs(top, "tops.json");
                }
                for (let bottom of array.bottoms) {
                    createDivs(bottom, "bottoms.json");
                }
                for (let shoe of array.shoes) {
                    createDivs(shoe, "shoes.json");
                }
            }
            break;
    }

    function createDivs(item, file) {
        let li = document.createElement("li");
        li.classList.add("imageContainer");
        let imageDiv = document.createElement("div");
        imageDiv.classList.add("feedImage");
        imageDiv.classList.add(item.path);
        li.append(imageDiv);

        imageDiv.style.backgroundImage = `url(${item.path})`;
        wardrobeFeed.append(li);

        // Checks if the item belongs to users wardrobe or DIGIWARS, different button functions for each wardrobe, delete for users wardrobe and add for DIGIWARS
        if (whose === "yours") {
            imageDiv.innerHTML = `
                    <button class='delete itemButton ${file}'>
                        <img src="../MEDIA/trashcan.png">
                    </button>
                `;
        } else {
            if (inArray(localStorage.getItem("id"), item.id)) {
                imageDiv.innerHTML = `
                    <button class='checkbox itemButton ${file}'>
                        <img src="../MEDIA/added.png">
                    </button>
                `;
            } else {
                imageDiv.innerHTML = `
                    <button class='checkbox itemButton ${file}'>
                        <img src="../MEDIA/add.png">
                    </button>
                `;
            }
        }
    }

    document.querySelectorAll("button.itemButton").forEach(button => {
        button.addEventListener("click", deleteOrAdd);
    });
}

function deleteOrAdd(e) {
    console.log(e);
    const id = localStorage.getItem("id");
    const path = e.target.parentElement.parentElement.classList[1];
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
                    feedback(data.message)
                } else {
                    feedback(data.message)
                    e.target.setAttribute("src", "../MEDIA/added.png");
                }
            }).catch(error => {
                console.log(error);
            });
    }

    if (classlist === "delete") {

        feedback("Are you sure?")
        document.querySelector("#feedbackContainer>div").innerHTML = `
                <button id="yes">Yes</button>  
                <button id="no">No</button>  
            `;

        document.getElementById("no").addEventListener("click", function (event) {
            feedbackContainer.remove();
            main.classList.remove("feedback_opacity")
            document.querySelectorAll("button").forEach((button) => {
                button.disabled = false;
            })
        });

        document.getElementById("yes").addEventListener("click", function (event) {
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
                        feedback(data.message)
                    } else {
                        // To update the wardrobe feed now that an item was deleted
                        e.target.parentElement.parentElement.parentElement.remove();

                        feedbackContainer.remove();
                        main.classList.remove("feedback_opacity")
                        document.querySelectorAll("button").forEach((button) => {
                            button.disabled = false;
                        })

                        feedback(data.message)
                    }
                }).catch(error => {
                    console.log(error);
                });
        });
    }
}
