"use strict";
let main = document.querySelector("main");

let filterArray = ["all", "streetwear", "casual", "sporty", "formal", "business", "party", "summer", "winter", "spring", "autumn"];

//If localstorage item isLoggedIn is true it will render wardrobe page
if (window.localStorage.getItem("isLoggedIn")) {
    renderWardrobePage();
//Else the start page will render
} else {
    renderStartPage();
}