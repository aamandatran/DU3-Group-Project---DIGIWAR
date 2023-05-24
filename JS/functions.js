"use strict";

let filterArray = ["all", "streetwear", "casual", "sporty", "formal", "business", "datenight", "summer", "winter", "spring", "autumn"];

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

// This function loops through an array and returns true if the id used to call this function is in the array
function inArray(id, array) {
    var length = array.length;
    for (var i = 0; i < length; i++) {
        if (array[i] == id) return true;
    }

    return false;
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