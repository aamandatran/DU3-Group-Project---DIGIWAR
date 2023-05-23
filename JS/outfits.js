"use strict";

async function renderOutfits(event) {
    const digiwars = document.querySelector("#wardrobePage > div > div#digiwars");
    const yours = document.querySelector("#wardrobePage > div > div#yours");
    const outfits = document.querySelector("#wardrobePage > div > div#savedOutfits");

    // Indicates which anchor element is selected
    outfits.classList.add("selected");
    digiwars.classList.remove("selected");
    yours.classList.remove("selected");

    //Get users id
    let id = localStorage.getItem("id");

    //Call createOutfitDivs(id) that creates the outfit divs
    const outfitDivs = await createOutfitDivs(id, "");

    //Changing the bottom part to match outfit page
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
        <section id = "wardrobeFeed">
            <p></p>
        </section>
    `;
    //Prepends the outfit divs to the #wardroeFeed section
    document.getElementById("wardrobeFeed").prepend(outfitDivs);
    //Activates the pop up window and delete functions
    outfitPopUp();
    deleteOutfits();

    //If there is no outfit divs, feedback will be displayed
    if (outfitDivs.childNodes.length === 0) {
        document.querySelector("#wardrobeFeed > p").innerHTML = "Could not find any outfits... go to the generator and save outfits!";
    }

    //This function allows the outfit to open a pop up window providing more information about the outfit
    function outfitPopUp() {

        //Gives each outfit li an eventlistener
        document.querySelectorAll("ul > li.outfit").forEach((outfit) => {
            //This function will activate the pop up function
            outfit.addEventListener("click", function (event) {

                //Saves the outfit information values
                let backgroundColor = event.currentTarget.style.backgroundColor;
                let top = event.currentTarget.children[0].outerHTML;
                let bottom = event.currentTarget.children[1].outerHTML;
                let shoe = event.currentTarget.children[2].outerHTML;
                let description = event.currentTarget.children[3].innerHTML;
                let styles = event.currentTarget.children[4].innerHTML;

                //Sets the selected items 
                document.getElementById("popupOutfit").innerHTML = `
                ${top}
                ${bottom}
                ${shoe}
                `;
                //Sets the selected information
                document.getElementById("popupOutfit").style.backgroundColor = backgroundColor;
                document.getElementById("descriptionOutfit").innerHTML = description;
                document.getElementById("stylesOutfit").innerHTML = styles;

                //Shows the pop up window
                openPopup();

                //Adds eventlistener to be able to close the pop up window
                let closePopupButton = document.getElementById("closePopupButton");
                closePopupButton.addEventListener("click", closePopup);
            });
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

    //Allows filtering for outfits
    let filterArray = ["allItems", "streetwear", "casual", "sporty", "formal", "business", "datenight", "summer", "winter", "spring", "autumn"];
    //Gives each filter an eventlistener to filter the outfits and display the matching outfits 
    for (let filter of filterArray) {
        document.getElementById(filter).addEventListener("click", async function (event) {
            event.preventDefault();
            let outfitdivs;
            //If the filter is all, all outfits will render
            if (event.target.innerText === "All") {
                outfitdivs = await createOutfitDivs(id, "");
                //Activates pop up and delete functions
                outfitPopUp();
                deleteOutfits();
                //if there is no outfits the feedback will be displayed
                if (outfitdivs.childNodes.length === 0) {
                    document.querySelector("#wardrobeFeed > p").innerHTML = "Could not find any outfits... go to the generator and save outfits!";
                }
            //If the filter is any other filter than all
            } else {
                //Displats outfits that matches the filter
                outfitdivs = await createOutfitDivs(id, filter);
                //Activates pop up and delete functions
                outfitPopUp();
                deleteOutfits();
                //If there is no outfits the feedback will be displayed
                if (outfitdivs.childNodes.length === 0) {
                    document.querySelector("#wardrobeFeed > p").innerHTML = `Could not find any ${filter} outfits... go to the generator and save outfits!`;
                }
            }
        });
    }
}
