"use strict"

function stay_loggedin() {
    window.localStorage.setItem("isLoggedIn", true)
    renderWardrobePage();
}

function feedback(message) {
    let body = document.querySelector("body")

    let main = document.querySelector("main")
    let div = document.createElement("div")

    div.setAttribute("id", "feedbackContainer")
    div.innerHTML = `
        <p>${message}</p> <button id="close">CLOSE</button>
    
    `

    body.append(div)
    main.classList.add("feedback_opacity")

    let feedbackContainer = document.querySelector("#feedbackContainer");
    feedbackContainer.querySelector("#close").addEventListener("click", () => {
        feedbackContainer.remove();
        main.classList.remove("feedback_opacity")
    });
}

