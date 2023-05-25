"use strict"

//This function allows the user to stay logged in when refreshing the site, sending them to their wardrobe
function stay_loggedin() {
    window.localStorage.setItem("isLoggedIn", true)
    renderWardrobePage();
}

//Feedback function when called takes a message that is displayed in the feedbackContainer
function feedback(message) {
    let body = document.querySelector("body");
    let div = document.createElement("div");

    //We set an id to the div and creates the feedback content with innerHTML
    div.setAttribute("id", "feedbackContainer")
    div.innerHTML = `
        <p>${message}</p>
        <div>
            <button id="close">CLOSE</button>  
        </div>
    `;
    let closingButton = document.getElementById("close");
    //We select all the buttons to be able to disable them while the feedback is show
    let buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        //Before we set the buttons to disabled we have to make sure that the closing button is not being disabled 
        if (button !== closingButton) {
            button.disabled = true;
        }
    })
    //Appends the div to the body
    body.append(div);

    let feedbackContainer = document.getElementById("feedbackContainer");
    //Adds an eventListner to the closing button
    feedbackContainer.querySelector("#close").addEventListener("click", () => {
        //When clicked the feedback container is removed. 
        feedbackContainer.remove();
        buttons.forEach((button) => {
            //We then enables the buttons again when the feedback disapears. 
            button.disabled = false;
        })
    });
}

