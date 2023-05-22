"use strict"


function openPopup() {
  const popup = document.getElementById('popupWindow');
  popup.classList.add('show');
  console.log("hej");
}

function closePopup() {
  const popup = document.getElementById('popupWindow');
  popup.classList.remove('show');
}



function randomColor(event) {
  console.log("hejdå");
  let backgroundDiv = document.getElementById("popupSelectedItems");

  let colorsArray = ["#ffe4e9", "#ceeaec", "#cfe1c8", "black", "#f6efef", "#dbd0e3", "#fffbdb", "#f9c8d0", "#f1e0c9"];
  let chosenColor = colorsArray[Math.floor(Math.random() * colorsArray.length)]

  backgroundDiv.style.backgroundColor = chosenColor;
}

