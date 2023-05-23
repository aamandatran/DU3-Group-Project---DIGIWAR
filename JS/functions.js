"use strict";

//This function will display the array of profile pictures
function displayProfilePics(array) {
    let html = "";
    for (let profilepic of array) {
        html += `
                <li class=editProfileOptions>
                <img src=${profilepic}>
                </li>
                `;
    }
    return html;
}

function inArray(id, array) {
    var length = array.length;
    for (var i = 0; i < length; i++) {
        if (array[i] == id) return true;
    }
    return false;
}

function header_startPage () {
    //Clicking header will send you to start page
    let header = document.querySelector("header");
    header.innerHTML = `
        <div id="toStartPage">DIGIWAR</div>
    `;
    document.querySelector("#toStartPage").addEventListener("click", renderStartPage);
}

//This function add the class show to the pop up window allowing it to display
function openPopup() {
    const popup = document.getElementById("popupWindow");
    popup.classList.add("show");
}
  
//This function removes the class show to the pop up window and disable it to display
function closePopup() {
    const popup = document.getElementById("popupWindow");
    popup.classList.remove("show");
}