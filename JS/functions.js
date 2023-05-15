"use strict"

function display_header_menu() {
    let savedProfilePic = localStorage.getItem("profilepicture");
    let userName = localStorage.getItem("username");

    let header = document.querySelector("header");
    header.style.display = "flex";
    header.style.padding = "2vh";

    header.innerHTML = `
        <div id="toStartPage">DIGIWAR</div>
        <div id=menuContainer>
            <div class=menuOptions id=outfitGeneratorButton>Outfit Generator</div>
            <div class=menuOptions id=wardrobeButton>Wardrobe</div>
            <div class=menuOptions id=editProfileButton>
                <div>${userName}</div>
                <div id=menuProfilePic>
                <img src=${savedProfilePic}>
            </div>
            </div>
        </div>
    `

    header.classList.add("headerMenu")

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

    document.querySelector("#toStartPage").addEventListener("click", renderStartPage);
}

