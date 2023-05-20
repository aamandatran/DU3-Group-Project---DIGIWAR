async function createOutfitDivs(id, style) {
  document.querySelector("#wardrobeFeed > ul").innerHTML = "";
  document.querySelector("#wardrobeFeed > p").innerHTML = "";

  let response = await fetch("api/users.php");
  let users = await response.json();

  console.log(style);
  id = parseInt(id);
  style = style.toLowerCase();
  console.log(style);

  let outfitArray = '';
  for (let user of users) {
    if (user.id === id) {
      let outfits = user.outfits;
      console.log(outfits);
      for (let outfit of outfits) {
        let stylesHTML = '';
        for (let outfitStyle of outfit.styles) {
          stylesHTML += `<div>${outfitStyle}</div>`;
        }
        console.log(stylesHTML);
        if (style === "" || outfit.styles.includes(style)) {
          outfitArray += `
            <div class="outfit" id="${outfit.outfitID}" style=background-color:${outfit.backgroundColor}>
              <div class="outfitTop" style=background-image:${outfit.top}></div>
              <div class="outfitBottom" style=background-image:${outfit.bottom}></div>
              <div class="outfitShoe" style=background-image:${outfit.shoe}></div>
              <section class="descriptionHidden">${outfit.description}</section>
              <section class="stylesHidden">${stylesHTML}</section>
              <button class=outfitDeleteButton><img src="../MEDIA/trashcan.png"></button>
            </div>
          `;
          console.log(outfitArray);
        }
      }
      break;
    }
  }
  setupDeleteButtons()
  return outfitArray;
}



async function deleteOutfit(userID, outfitID) {
  let response = await fetch("api/new_outfit.php", {
    method: "DELETE",
    headers: { "Content-type": "application/json", },
    body: JSON.stringify({
      userID: userID,
      outfitID: outfitID,
    })
  })
  if (response.ok) {
    let outfitElement = document.getElementById(outfitID);
    outfitElement.remove();
  }

}
function setupDeleteButtons() {
  let deleteButtons = document.querySelectorAll(".outfitDeleteButton");
  console.log(deleteButtons);
  deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener("click", function (event) {
      let outfitElement = event.target.closest(".outfit");
      let outfitID = outfitElement.id;
      let userID = localStorage.getItem("id");
      deleteOutfit(userID, outfitID)
    })
  });
}



