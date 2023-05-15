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

  let colorsArray = ["pink", "blue", "green", "black", "white", "purple"];
  let chosenColor = colorsArray[Math.floor(Math.random() * colorsArray.length)]

  backgroundDiv.style.backgroundColor = chosenColor;
}