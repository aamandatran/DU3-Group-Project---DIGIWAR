async function createOutfitDivs(id, style) {
  document.querySelector("#wardrobeFeed > ul").innerHTML = "";
  document.querySelector("#wardrobeFeed > p").innerHTML = "";

  let response = await fetch("api/users.php");
  let users = await response.json();

  console.log(style);
  id = parseInt(id);
  style = style.toLowerCase();
  console.log(style);

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
          let li = document.createElement("li");

          li.innerHTML = `
              <div class="outfitTop" style=background-image:${outfit.top}></div>
              <div class="outfitBottom" style=background-image:${outfit.bottom}></div>
              <div class="outfitShoe" style=background-image:${outfit.shoe}></div>
              <section class="descriptionHidden">${outfit.description}</section>
              <section class="stylesHidden">${stylesHTML}</section>
              <button class=outfitDeleteButton><img src="../MEDIA/trashcan.png"></button>
          `;

          li.classList.add("outfit");
          li.setAttribute("id", outfit.outfitID);
          li.style.backgroundColor = outfit.backgroundColor;

          document.querySelector("#wardrobeFeed > ul").append(li);
          document.querySelector("ul").setAttribute("id", "outfitsUl");

          console.log(document.querySelector("#wardrobeFeed > ul"));
        }
      }
      break;
    }
  }
  return document.querySelector("#wardrobeFeed > ul");
}





