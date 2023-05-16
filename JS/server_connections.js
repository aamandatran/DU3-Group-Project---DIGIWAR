"use strict"

function stay_loggedin() {
    window.localStorage.setItem("isLoggedIn", true)
    renderWardrobePage();
}

function feedback(message) {
    let header = document.querySelector("header")
    header.classList.add("feedback_opacity")

    let wrapper = document.querySelector("#editProfileWrapper")
    let div = document.createElement("div")

    div.setAttribute("id", "feedbackContainer")
    div.innerHTML = `
        <p>${message}</p> <button id="close">CLOSE</button>
    
    `

    wrapper.append(div)
    wrapper.classList.add("feedback_opacity")

    let feedbackContainer = document.querySelector("#feedbackContainer");
    feedbackContainer.querySelector("button").addEventListener("click", () => {
        feedbackContainer.remove();
        header.classList.remove("feedback_opacity")
        wrapper.classList.remove("feedback_opacity")
    });
}

/*
function feedback(message) {
    let body = document.querySelector("body")

    let wrapper = document.querySelector("#editProfileWrapper")
    let div = document.createElement("div")

    div.setAttribute("id", "feedbackContainer")
    div.innerHTML = `
        <p>${message}</p> <button id="close">CLOSE</button>
    
    `

    body.append(div)
    wrapper.classList.add("feedback_opacity")

    let feedbackContainer = document.querySelector("#feedbackContainer");
    feedbackContainer.querySelector("button").addEventListener("click", () => {
        feedbackContainer.remove();
        wrapper.classList.remove("feedback_opacity")
    });
}

*/