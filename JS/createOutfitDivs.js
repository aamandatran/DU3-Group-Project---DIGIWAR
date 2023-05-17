async function createOutfitDivs(id) {
    let response = await fetch("api/users.php");
    let users = await response.json();

    id = parseInt(id);

    console.log("hallå");
    let outfitArray = '';
    for (let user of users) {

      if (user.id === id) {
        console.log(user);
        console.log(user.id);
        console.log(id);
        console.log("tjo");
        console.log(user.outfits);
        let outfits = user.outfits;
        console.log(outfits);
        for (let outfit of outfits) {
          outfitArray += `
            <div class="outfit" style=background-color:${outfit.backgroundColor}>
              <div class="outfitTop" style=background-image:${outfit.top}></div>
              <div class="outfitBottom" style=background-image:${outfit.bottom}></div>
              <div class="outfitShoe" style=background-image:${outfit.shoe}></div>
            </div>
          `;
        }
        break;
      }
    }
  
    return outfitArray;
  }