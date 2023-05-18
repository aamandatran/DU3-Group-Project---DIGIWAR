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


function deleteOutfit() {
  outfits = document.querySelectorAll("#outfitsUl")

  outfits.forEach(outfit => {
    let button = outfit.createElement("button");
    button.classList.add("outfitDeleteButton");

    button.innerHTML = `
    <img src="../MEDIA/trashcan.png">
    `

    button.addEventListner("click", function (event) {

    })
  });
}