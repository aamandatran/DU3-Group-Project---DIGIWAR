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