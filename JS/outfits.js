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
                <a href="#" id="all">All</a>
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
        //Selects all delete buttons and adds event listners on each of them 
        document.querySelectorAll(".outfitDeleteButton").forEach((button) => {
            button.addEventListener("click", function (event) {
                event.stopPropagation();

                //The feedback function is called when the trashcan is clicked with the message "are you sure?""
                feedback("Are you sure?")
                //The feedback container contains two buttons "yes" and "no"
                document.querySelector("#feedbackContainer>div").innerHTML = `
                <button id="yes">Yes</button>  
                <button id="no">No</button>  
            `;
                //We add an event listner to the button no and If no is clicked then the feedback container is removed and the buttons gets enabled. 
                document.getElementById("no").addEventListener("click", function (event) {
                    feedbackContainer.remove();
                    document.querySelectorAll("button").forEach((button) => {
                        button.disabled = false;
                    })
                });
                //We add an event listner to the yes button aswell. 
                document.getElementById("yes").addEventListener("click", async function (event) {
                    //We find the closest ".outfit" class element
                    let outfitElement = button.closest(".outfit");
                    //The outfit element contains the outfitID which is stored in an id. We then put the outfitID in the variable outfitID
                    let outfitID = outfitElement.id;
                    let userID = localStorage.getItem("id");
                    document.querySelectorAll("button").forEach((button) => {
                        //We enable all the buttons again. 
                        button.disabled = false;
                    })

                    //Sends a DELETE request to the new_outfit.php with the userID and outfitID as the body. 
                    let response = await fetch("api/new_outfit.php", {
                        method: "DELETE",
                        headers: { "Content-type": "application/json", },
                        body: JSON.stringify({
                            userID: userID,
                            outfitID: outfitID,
                        })
                    })
                    if (response.ok) {
                        //If the response is ok then we remove the outfit element and the feedback container 
                        let outfitElement = document.getElementById(outfitID);
                        outfitElement.remove();
                        feedbackContainer.remove();
                    }
                })

            })
        })
    }

    //Allows filtering for outfits
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
