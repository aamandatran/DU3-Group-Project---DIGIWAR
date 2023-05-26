"use strict"

//Render generator page
async function renderGeneratorPage() {

  //displays the header menu
  display_header_menu()
  //Outfit Generator page is activated
  document.getElementById("outfitGeneratorButton").classList.add("selected");

  //Creates the arrow buttons dom and appends it
  function displayArrows(item, direction) {
    const arrowButton = document.createElement("button");
    arrowButton.classList.add("arrowButton");
    arrowButton.classList.add(`arrow${item}`);
    arrowButton.innerHTML = `
      <img src=DIGIWAR\/..\/MEDIA\/keyboard-arrow-${direction}.png class = arrow>
      `;
    main.appendChild(arrowButton);
    return arrowButton.outerHTML;
  }

  //Creates the selected item divs and appends it
  function createSelectedItemDiv(item, arrowleft, arrowright) {
    let new_div = document.createElement("div");
    new_div.classList.add(`${item}_generate`);

    new_div.innerHTML = `
      ${arrowleft}
      <div></div>
      <div id="selected${item}">
        <div></div>
      </div>
      <div></div>
      ${arrowright}
    `;
    main.append(new_div);
    return new_div;
  }


  //Changing mains content to generator page
  //Creates the top, bottom and shoe divs
  main.innerHTML = `
    <div id="generatorParent">
      <div id="generator">
        <div id="generatorGrid">
          ${createSelectedItemDiv("top", displayArrows("Top", "left"), displayArrows("Top", "right")).outerHTML}
          ${createSelectedItemDiv("bottom", displayArrows("Bottom", "left"), displayArrows("Bottom", "right")).outerHTML}
          ${createSelectedItemDiv("shoe", displayArrows("Shoe", "left"), displayArrows("Shoe", "right")).outerHTML}
        </div>  
  
        <div class="generateOrSave">
          <button id="generatorButton">GENERATOR</button>
          <div id="saveIt">
            <img src="DIGIWAR\/..\/MEDIA\/heart.png">
            <p>Save it!</p>
          </div>
        </div>
      </div>

      <div id="popupWindow" class="popup">
        <div id="popupContent">
  
          <div id=newOutfitTop>
            <h1>New Outfit</h2>
            <button id="closePopupButton">X</button>
          </div>
      
          <form id=newOutfitBottom>
            <div id=newOutfit1>

              <fieldset id="styleCategories">
                <legend>Choose style</legend>
      
                ${filterArray.map(filter => {
    //Creates the filter divs and appends them
    if (filter === "all") {
      return "";
    }
    let filterDiv = document.createElement("div");
    let capitalizedString = filter.charAt(0).toUpperCase() + filter.slice(1);
    filterDiv.innerHTML = `
                                <input type=checkbox id=${filter} name=${filter}>
                                <label for=${filter} id=${filter}Label>${capitalizedString}</label>
                              `;
    main.append(filterDiv);
    return filterDiv.outerHTML;
  }).join("")}

              </fieldset>
            </div>
      
            <div id=newOutfit2>
              <div id="popupSelectedItems">
                <div id="popupSelectedtop"></div>
                <div id="popupSelectedbottom"></div>
                <div id="popupSelectedshoe"></div>
              </div>
      
              <div id="pickBackgroundColor">Pick a background color</div>
      
              <input type=text id=description name=description placeholder="Write a description"> 
            </div>
      
            <button id="savePopupButton" type=submit>Save</button>
          </form>
        </div>
      </div>
    </div>
  `;

  //Gives each button an eventlistener 
  //When an arrow button get clicked it will call for generateitem function
  function registerEventListeners() {
    const arrowButtons = document.querySelectorAll(".arrowButton");
    arrowButtons.forEach((button) => {
      button.addEventListener("click", generateItem);
    });
  }
  registerEventListeners();

  //Closes the pop up window
  let closePopupButton = document.getElementById("closePopupButton");
  closePopupButton.addEventListener("click", closePopup);

  //Function to pick a random background color for outfit pop up window
  let backgroundColorButton = document.getElementById("pickBackgroundColor");
  backgroundColorButton.addEventListener("click", randomColor);
  function randomColor(event) {
    let backgroundDiv = document.getElementById("popupSelectedItems");

    let colorsArray = ["#ffe4e9", "#ceeaec", "#cfe1c8", "black", "#f7f0ea", "#dbd0e3", "#fffbdb", "#f9c8d0", "#f7debb"];
    let chosenColor = colorsArray[Math.floor(Math.random() * colorsArray.length)]

    backgroundDiv.style.backgroundColor = chosenColor;
  }

  //Get the logged in users id
  let id = localStorage.getItem("id");
  let userData = {
    id: id
  };

  //Sending a POST request to gain access over users wardrobe
  const post_request = new Request("API/your_wardrobe.php", {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(userData),
  });

  const response = await fetch(post_request);
  let wardrobe = await response.json();

  //Saving the values in item variables
  let tops = wardrobe.tops;
  let bottoms = wardrobe.bottoms;
  let shoes = wardrobe.shoes;

  let previousSelectedTop;
  let previousSelectedBottom;
  let previousSelectedShoe;

  //When clicking an arrow button generateItem will be called to only generate one item at a time of the desired item type
  function generateItem(event) {

    event.stopPropagation();
    const currentTarget = event.currentTarget;

    // Check which arrow button was clicked and call the generate function for that item type
    if (currentTarget.classList.contains("arrowTop")) {
      generate(event, tops, previousSelectedTop, "selectedtop", "popupSelectedtop", "Top");
    } else if (currentTarget.classList.contains("arrowBottom")) {
      generate(event, bottoms, previousSelectedBottom, "selectedbottom", "popupSelectedbottom", "Bottom");
    } else {
      generate(event, shoes, previousSelectedShoe, "selectedshoe", "popupSelectedshoe", "Shoe");

    }
    function generate(event, itemArray, previousSelectedItem, selectedElementId, popupElementId, itemType) {

      const currentTarget = event.currentTarget;

      // Check if the current target element contains the appropriate arrow class for the given item type
      if (currentTarget.classList.contains(`arrow${itemType}`)) {

        // Declare a variable to store the selected item
        let selected;

        // Check if there is more than one item in the itemArray
        if (itemArray.length > 1) {
          //Select a random item from the itemArray that is not equal to the previousSelectedItem
          do {
            selected = itemArray[Math.floor(Math.random() * itemArray.length)];
          } while (selected === previousSelectedItem);
          previousSelectedItem = selected;

          // If there is only one item, select it directly
        } else {
          selected = itemArray[0];
        }

        //Update the display of the selected item
        document.querySelector(`#${selectedElementId} > div`).style.backgroundImage = `url(${selected.path})`;
        document.getElementById(popupElementId).style.backgroundImage = `url(${selected.path})`;
      }
    }
  }

  //When clicking generate button generator function will be called
  let generateButton = document.querySelector("#generatorButton");
  generateButton.addEventListener("click", generator);

  //This function randomize the three item types and displays them
  function generator(event) {

    //Selects random items from the item types wardrobe arrays and saves the value
    if (tops.length === 0 || bottoms.length === 0 || shoes.length === 0) {
      feedback("You don't have any clothes! Try adding some in the wardrobe first!");
    } else {

      let selectedTop = tops[Math.floor(Math.random() * tops.length)];
      let selectedBottom = bottoms[Math.floor(Math.random() * bottoms.length)];
      let selectedShoe = shoes[Math.floor(Math.random() * shoes.length)];

      //Changes and displays the items
      document.querySelector("#selectedtop > div").style.backgroundImage = `url(${selectedTop.path})`;
      document.querySelector("#selectedbottom > div").style.backgroundImage = `url(${selectedBottom.path})`;
      document.querySelector("#selectedshoe > div").style.backgroundImage = `url(${selectedShoe.path})`;

      //Changes and displays the selected items to the pop up window
      document.getElementById('popupSelectedtop').style.backgroundImage = `url(${selectedTop.path})`;
      document.getElementById('popupSelectedbottom').style.backgroundImage = `url(${selectedBottom.path})`;
      document.getElementById('popupSelectedshoe').style.backgroundImage = `url(${selectedShoe.path})`;
    }

    //Clicking save it will call the openPopup function
    let saveIt = document.querySelector("#saveIt");
    //openPopup will open the generate outfit pop up window
    saveIt.addEventListener("click", openPopup);

    let form = document.getElementById('newOutfitBottom');
    // Attach an event listener to the form submission
    form.addEventListener('submit', async function (event) {
      // Prevent the form from submitting
      event.preventDefault();

      // Get all the checkboxes within the form
      let checkboxes = form.querySelectorAll('input[type="checkbox"]');

      let styles = [];
      //Loop over the checkboxes to check which ones are checked
      for (let i = 0; i < checkboxes.length; i++) {
        let checkbox = checkboxes[i];
        if (checkbox.checked) {
          //Save the checked checkboxes in the style array
          styles.push(checkbox.id);
        }
      }

      //Save all information the user has selected in the outfit generator pop up window
      let id = window.localStorage.getItem("id");
      let description = document.getElementById("description").value;
      let backgroundColor = document.getElementById("popupSelectedItems").style.backgroundColor;
      let backgroundImageTop = document.getElementById("popupSelectedtop").style.backgroundImage;
      let backgroundImageBottom = document.getElementById("popupSelectedbottom").style.backgroundImage;
      let backgroundImageShoe = document.getElementById("popupSelectedshoe").style.backgroundImage;

      //Save the information in object OutfitData
      let OutfitData = {
        styles: styles,
        userID: id,
        top: backgroundImageTop,
        bottom: backgroundImageBottom,
        shoe: backgroundImageShoe,
        backgroundColor: backgroundColor,
        description: description
      };

      //Send a POST request to save the outfit in the users outfit array in users.json
      const request = new Request("API/new_outfit.php", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(OutfitData),
      });

      const response = await fetch(request);

      //If response is ok the pop up window will close and feedback will be sent back to user
      if (response.status === 200) {

        let checkboxes = form.querySelectorAll('input[type="checkbox"]');
        //Resetting
        //Uncheck every checkbox
        checkboxes.forEach(function (checkbox) {
          checkbox.checked = false;
        });
        //Reset the background color
        document.getElementById("popupSelectedItems").style.backgroundColor = "";
        //Reset the description value
        document.getElementById("description").value = "";
        //If response is NOT ok an error message will be sent back in feedback
      } else {
        let error = await response.json();
        feedback(error.message);
      }
    });
  }
}
