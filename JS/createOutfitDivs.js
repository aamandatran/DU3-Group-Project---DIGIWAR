"use strict"

//This function creates the outfit divs according to which user it is and what filter style
async function createOutfitDivs(id, style) {
  //Empty the wardrobefeed
  document.querySelector("#wardrobeFeed > ul").innerHTML = "";
  document.querySelector("#wardrobeFeed > p").innerHTML = "";

  //Fetch array of user
  let response = await fetch("api/users.php");
  let users = await response.json();

  id = parseInt(id);
  style = style.toLowerCase();

  //Loop users to find matching user id
  for (let user of users) {
    if (user.id === id) {
      //Save the users outfit array under variable outfits
      let outfits = user.outfits;

      //Loop users outfits
      for (let outfit of outfits) {
        //Create divs containing the outfits styles
        let stylesHTML = '';
        for (let outfitStyle of outfit.styles) {
          if(outfitStyle === "datenight") {
            outfitStyle = "Date night";
          }
          let capitalizedString = outfitStyle.charAt(0).toUpperCase() + outfitStyle.slice(1);
          stylesHTML += `<div>${capitalizedString}</div>`;
        }

        //If no style is sent then all outfits no matter style will be created
        //If the outfits chosen styles includes style then all outfits with that style will be created
        if (style === "" || outfit.styles.includes(style)) {

          //Creating the outfit li and appending it
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
        }
      }
      break;
    }
  }

  //This function returns an ul filled or not with outfits
  return document.querySelector("#wardrobeFeed > ul");
}