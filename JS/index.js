"use strict";

if(window.localStorage.getItem("isLoggedIn")) {
    renderWardrobePage();
} else {
    renderLoginPage();
}