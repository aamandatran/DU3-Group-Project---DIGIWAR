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
        if (style === "" || outfit.styles.includes(style)) {
          outfitArray += `
            <div class="outfit" style=background-color:${outfit.backgroundColor}>
              <div class="outfitTop" style=background-image:${outfit.top}></div>
              <div class="outfitBottom" style=background-image:${outfit.bottom}></div>
              <div class="outfitShoe" style=background-image:${outfit.shoe}></div>
            </div>
          `;
          console.log(outfitArray);
        }
      }
      break;
    }
  }
  
  return outfitArray;
}