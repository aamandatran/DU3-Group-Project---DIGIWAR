"use strict"

function stay_loggedin() {
    window.localStorage.setItem("isLoggedIn", true)
    renderWardrobePage();
}

function feedback(message) {
    let header = document.querySelector("header")
    header.classList.add("awnser_feedback")
    let main = document.querySelector("main>div")
    let div = document.createElement("div")
    main.classList.add("awnser_feedback")
    main.append(div)
    div.setAttribute("id", "feedback")
    div.innerHTML = `
        <div id=feedbackContainer>
        <p>${message}</p> <button id="close">CLOSE</button>
        </div>
    
    `
    let feedback = document.querySelector("#feedback")
    let feedbackContainer = document.querySelector("#feedbackContainer");
    feedbackContainer.querySelector("button").addEventListener("click", () => {
        feedback.remove();
        main.classList.remove("awnser_feedback")
        header.classList.remove("awnser_feedback")
    });
}