"use strict"

function display_header_menu() {
    let profilePic = localStorage.getItem("profilepicture");
    let userName = localStorage.getItem("username");

    let header = document.querySelector("header");

    header.innerHTML = `
    <div id=logoContainer>
    <h1>DIGIWAR</h1>
    <p>end the war with your wardrobe</p>
    </div>

    <div id=menuContainer>
    <button class=menuOptions id=outfitGeneratorButton>Outfit Generator</button>
    <button class=menuOptions id=wardrobeButton>Wardrobe</button>

    <div id=userContainer>
    <button class=menuOptions id=editProfileButton>${userName}</button>
    <div id=menuProfilePic>
    <img src=${profilePic}>
    </div>
    </div>
    </div>
    `

    let generatorButton = document.querySelector("#outfitGeneratorButton");
    generatorButton.addEventListener("click", function (event) {
        renderGeneratorPage()
    })

    let wardrobeButton = document.querySelector("#wardrobeButton");
    wardrobeButton.addEventListener("click", function (event) {
        renderWardrobePage()
    })

    let editProfileButton = document.querySelector("#editProfileButton")
    editProfileButton.addEventListener("click", function (event) {
        editProfile()
    })



}

