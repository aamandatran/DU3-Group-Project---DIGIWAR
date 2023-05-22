"use strict";

function renderWardrobePage() {
    display_header_menu()

    main.innerHTML = `
        <div id="wardrobeParent"> 
        
            <div id="wardrobePage">   
                <section>
                    <div id="banner">
                        <div>One Step Closer to End the War</div>
                    </div>
                </section>
                <div>
                    <a href="" id="yours">Yours</a><a
                    href="" id="digiwars">Digiwars</a><a
                    href="" id="savedOutfits">Outfits</a>
                </div>
                <div id="bottom">
                    <nav id="filter">
                        <a href="#">FILTER</a>
                        <nav id="filtering">
                            <a href="" id="allItems">All</a>
                            <a href="" id="tops">Tops</a>
                            <a href="" id="bottoms">Bottoms</a>
                            <a href="" id="shoes">Shoes</a>
                        </nav>
                        <button id="addClothes" style="display: none;">Add clothes</button>
                    </nav>
                    <section id="wardrobeFeed">
                        <ul></ul>
                        <p></p>
                    </section>
                </div>
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

    const digiwars = document.querySelector("#wardrobePage>div>a#digiwars");
    const yours = document.querySelector("#wardrobePage>div>a#yours");
    const outfits = document.querySelector("#wardrobePage>div>a#savedOutfits");


    outfits.addEventListener("click", renderOutfits);


    async function renderOutfits(event) {
        event.preventDefault();

        let id = localStorage.getItem("id");
        console.log("event is on");
        // Call createOutfitDivs(id) and wait for the result
        const outfitDivs = await createOutfitDivs(id, "");

        document.getElementById("bottom").innerHTML = `
          <nav id="filter">
            <a href="#">FILTER</a>
            <nav id="filtering">
              <a href="#" id="allItems">All</a>
              <a href="#" id="streetwear">Streetwear</a>
              <a href="#" id="casual">Casual</a>
              <a href="#" id="sporty">Sporty</a>
              <a href="#" id="formal">Formal</a>
              <a href="#" id="business">Business</a>
              <a href="#" id="datenight">Date Night</a>
              <a href="#" id="summer">Summer</a>
              <a href="#" id="winter">Winter</a>
              <a href="#" id="spring">Spring</a>
              <a href="#" id="autumn">Autumn</a>
            </nav>
          </nav>
          <section id="wardrobeFeed">
            <p></p>
          </section>
        `;
        document.getElementById("wardrobeFeed").prepend(outfitDivs);
        document.querySelectorAll("ul > li.outfit").forEach((outfit) => {
            outfit.addEventListener("click", OutfitPop);
        });

        document.querySelectorAll(".outfitDeleteButton").forEach((button) => {
            button.addEventListener("click", function (event) {
                event.stopPropagation();
                console.log(event.currentTarget);
                let outfitElement = event.target.closest(".outfit");
                let outfitID = outfitElement.id;
                let userID = localStorage.getItem("id");
                deleteOutfit(userID, outfitID);
            });
        });

        function OutfitPop(event) {

            console.log("popup");
            console.log(event.currentTarget.style.backgroundColor);
            let backgroundColor = event.currentTarget.style.backgroundColor;
            let top = event.currentTarget.children[0].outerHTML;
            let bottom = event.currentTarget.children[1].outerHTML;
            let shoe = event.currentTarget.children[2].outerHTML;
            let description = event.currentTarget.children[3].innerHTML;
            console.log(description);
            let styles = event.currentTarget.children[4].innerHTML;
            console.log(styles);
            document.getElementById("popupOutfit").innerHTML = `
            ${top}
            ${bottom}
            ${shoe}
            `;
            document.getElementById("popupOutfit").style.backgroundColor = backgroundColor;

            document.getElementById("descriptionOutfit").innerHTML = description;
            document.getElementById("stylesOutfit").innerHTML = styles;

            /*document.getElementById("popupContent").innerHTML += `
            <div id=descriptionOutfit>${description}</div>
            <div id=stylesOutfit>${styles}</div>
            `; */
            console.log(top);
            openPopup();
            // Add code to display the popup window
            let closePopupButton = document.getElementById("closePopupButton");
            closePopupButton.addEventListener("click", closePopup);
        }

        document.getElementById("allItems").addEventListener("click", async function (event) {
            event.preventDefault();
            console.log(event.target.innerText);
            let style = "";
            let html = await createOutfitDivs(id, style);
            if (html === "") {
                document.getElementById("outfitsUl").innerHTML = `
                    <p>Could not find any outfits... go to the generator and save outfits!</p>
                  `;
            } else {
                document.getElementById("outfitsUl").innerHTML = html;
            }
        });
        document.getElementById("streetwear").addEventListener("click", async function (event) {
            event.preventDefault();
            console.log(event.target.innerText);
            let style = event.target.innerText;
            let html = await createOutfitDivs(id, style);
            if (html.length === 0) {
                document.getElementById("outfitsUl").innerHTML = `
                    <p>Could not find any ${style} outfits... go to the generator and save outfits!</p>
                  `;
            } else {
                document.getElementById("outfitsUl").innerHTML = html;
            }
        });
        document.getElementById("casual").addEventListener("click", async function (event) {
            event.preventDefault();
            console.log(event.target.innerText);
            let style = event.target.innerText;
            let html = await createOutfitDivs(id, style);
            if (html === "") {
                document.getElementById("outfitsUl").innerHTML = `
                    <p>Could not find any ${style} outfits... go to the generator and save outfits!</p>
                  `;
            } else {
                document.getElementById("outfitsUl").innerHTML = html;
            }
        });
        document.getElementById("sporty").addEventListener("click", async function (event) {
            event.preventDefault();
            console.log(event.target.innerText);
            let style = event.target.innerText;
            let html = await createOutfitDivs(id, style);
            if (html === "") {
                document.querySelector("#wardrobeFeed > p").innerText = `
                    Could not find any ${style} outfits... go to the generator and save outfits!
                  `;
            } else {
                document.getElementById("outfitsUl").innerHTML = html;
            }
        });
        document.getElementById("formal").addEventListener("click", async function (event) {
            event.preventDefault();
            console.log(event.target.innerText);
            let style = event.target.innerText;
            let html = await createOutfitDivs(id, style);
            if (html === "") {
                document.querySelector("#wardrobeFeed > p").innerText = `
                    Could not find any ${style} outfits... go to the generator and save outfits!
                  `;
            } else {
                document.getElementById("outfitsUl").innerHTML = html;
            }
        });
        document.getElementById("business").addEventListener("click", async function (event) {
            event.preventDefault();
            console.log(event.target.innerText);
            let style = event.target.innerText;
            let html = await createOutfitDivs(id, style);
            if (html === "") {
                document.querySelector("#wardrobeFeed > p").innerText = `
                    Could not find any ${style} outfits... go to the generator and save outfits!
                  `;
            } else {
                document.getElementById("outfitsUl").innerHTML = html;
            }
        });
        document.getElementById("datenight").addEventListener("click", async function (event) {
            event.preventDefault();
            console.log(event.target.innerText);
            let style = event.target.innerText;
            let html = await createOutfitDivs(id, style);
            if (html === "") {
                document.querySelector("#wardrobeFeed > p").innerText = `
                    Could not find any ${style} outfits... go to the generator and save outfits!
                  `;
            } else {
                document.getElementById("outfitsUl").innerHTML = html;
            }
        });
        document.getElementById("summer").addEventListener("click", async function (event) {
            event.preventDefault();
            console.log(event.target.innerText);
            let style = event.target.innerText;
            let html = await createOutfitDivs(id, style);
            if (html === "") {
                document.querySelector("#wardrobeFeed > p").innerText = `
                    Could not find any ${style} outfits... go to the generator and save outfits!
                  `;
            } else {
                document.getElementById("outfitsUl").innerHTML = html;
            }
        });
        document.getElementById("winter").addEventListener("click", async function (event) {
            event.preventDefault();
            console.log(event.target.innerText);
            let style = event.target.innerText;
            let html = await createOutfitDivs(id, style);
            if (html === "") {
                document.querySelector("#wardrobeFeed > p").innerText = `
                    Could not find any ${style} outfits... go to the generator and save outfits!
                  `;
            } else {
                document.getElementById("outfitsUl").innerHTML = html;
            }
        });
        document.getElementById("spring").addEventListener("click", async function (event) {
            event.preventDefault();
            console.log(event.target.innerText);
            let style = event.target.innerText;
            let html = await createOutfitDivs(id, style);
            if (html === "") {
                document.querySelector("#wardrobeFeed > p").innerText = `
                    Could not find any ${style} outfits... go to the generator and save outfits!
                  `;
            } else {
                document.getElementById("outfitsUl").innerHTML = html;
            }
        });
        document.getElementById("autumn").addEventListener("click", async function (event) {
            event.preventDefault();
            console.log(event.target.innerText);
            let style = event.target.innerText;
            let html = await createOutfitDivs(id, style);
            if (html === "") {
                document.querySelector("#wardrobeFeed > p").innerText = `
                    Could not find any ${style} outfits... go to the generator and save outfits!
                  `;
            } else {
                document.getElementById("outfitsUl").innerHTML = html;
            }
        });

    }


    // Fetch users wardrobe by Id
    async function getUserItems() {
        document.querySelector("button#addClothes").style.display = "";

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

    yours.addEventListener("click", renderWardrobe);

    async function renderWardrobe(event) {
        event.preventDefault();

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

        getUserItems();
    }

    // GET-request to displays the clothing items from DIGIWAR
    digiwars.addEventListener("click", async function (event) {
        event.preventDefault();

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
    document.getElementById("allItems").addEventListener("click", async function (event) {
        event.preventDefault();
        if (whose === "digiwars") {
            createItemDivs(wardrobe, "all", "digiwars")
        } else {
            // Else === "yours", i.e users wardrobe
            createItemDivs(wardrobe, "all", "yours")
        }
    });

    document.getElementById("tops").addEventListener("click", async function (event) {
        event.preventDefault();
        if (whose === "digiwars") {
            createItemDivs(wardrobe, "tops", "digiwars");
        } else {
            createItemDivs(wardrobe, "tops", "yours");
        }
    });

    document.getElementById("bottoms").addEventListener("click", async function (event) {
        event.preventDefault();
        if (whose === "digiwars") {
            createItemDivs(wardrobe, "bottoms", "digiwars");
        } else {
            createItemDivs(wardrobe, "bottoms", "yours");
        }
    });

    document.getElementById("shoes").addEventListener("click", async function (event) {
        event.preventDefault();
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
        div.classList.add("imageContainer");
        let imageDiv = document.createElement("div");
        imageDiv.classList.add("feedImage");
        imageDiv.classList.add(item.path);
        div.append(imageDiv);

        imageDiv.style.backgroundImage = `url(${item.path})`;
        wardrobeFeed.append(div);

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
}
