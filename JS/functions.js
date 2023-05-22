"use strict";

function displayProfilePics(array) {
    //Denna funktionen är samma som i login/register och displayar alla bilder. 
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

function openPopup() {
    const popup = document.getElementById('popupWindow');
    popup.classList.add('show');
  }
  
  function closePopup() {
    const popup = document.getElementById('popupWindow');
    popup.classList.remove('show');
  }