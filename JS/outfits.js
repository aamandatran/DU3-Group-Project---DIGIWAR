"use strict";

async function renderOutfits(event) {
    const digiwars = document.querySelector("#wardrobePage>div>div#digiwars");
    const yours = document.querySelector("#wardrobePage>div>div#yours");
    const outfits = document.querySelector("#wardrobePage>div>div#savedOutfits");

    // Indicates which anchor element is selected
    outfits.classList.add("selected");
    digiwars.classList.remove("selected");
    yours.classList.remove("selected");

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
    outfitPopUp();
    deleteOutfits();

    if (outfitDivs.childNodes.length === 0) {
        document.querySelector("#wardrobeFeed > p").innerHTML = "Could not find any outfits... go to the generator and save outfits!";
    }

    function outfitPopUp() {

        document.querySelectorAll("ul > li.outfit").forEach((outfit) => {
            outfit.addEventListener("click", function (event) {
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
            })
        });
    }

    function deleteOutfits() {
        document.querySelectorAll(".outfitDeleteButton").forEach((button) => {
            button.addEventListener("click", function (event) {
                event.stopPropagation();

                feedback("Are you sure?")
                document.querySelector("#feedbackContainer>div").innerHTML = `
                <button id="yes">Yes</button>  
                <button id="no">No</button>  
            `;
                document.getElementById("no").addEventListener("click", function (event) {
                    feedbackContainer.remove();
                    document.querySelectorAll("button").forEach((button) => {
                        button.disabled = false;
                    })
                });
                document.getElementById("yes").addEventListener("click", function (event) {
                    let outfitElement = button.closest(".outfit");
                    let outfitID = outfitElement.id;
                    let userID = localStorage.getItem("id");
                    document.querySelectorAll("button").forEach((button) => {
                        button.disabled = false;
                    })
                    feedbackContainer.remove();
                    deleteOutfit(userID, outfitID);
                })

            })
        })
    }


    let filterArray = ["allItems", "streetwear", "casual", "sporty", "formal", "business", "datenight", "summer", "winter", "spring", "autumn"];
    for (let filter of filterArray) {
        document.getElementById(filter).addEventListener("click", async function (event) {
            event.preventDefault();
            let outfitdivs;
            if (event.target.innerText === "All") {
                outfitdivs = await createOutfitDivs(id, "");
                outfitPopUp();
                deleteOutfits();
                if (outfitdivs.childNodes.length === 0) {
                    document.querySelector("#wardrobeFeed > p").innerHTML = "Could not find any outfits... go to the generator and save outfits!";
                }
            } else {
                outfitdivs = await createOutfitDivs(id, filter);
                outfitPopUp();
                deleteOutfits();
                if (outfitdivs.childNodes.length === 0) {
                    document.querySelector("#wardrobeFeed > p").innerHTML = `Could not find any ${filter} outfits... go to the generator and save outfits!`;
                }
            }
        })

    }

    /*document.getElementById("allItems").addEventListener("click", async function (event) {
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
    }); */

}