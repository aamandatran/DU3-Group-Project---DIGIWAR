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