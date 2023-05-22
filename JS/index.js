"use strict";
let main = document.querySelector("main");

if (window.localStorage.getItem("isLoggedIn")) {
    renderWardrobePage();
} else {
    renderStartPage();
}