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
      <img src=../MEDIA/keyboard-arrow-${direction}.png class = arrow>
      `;
    main.appendChild(arrowButton);
    return arrowButton;
  }

  //Creates an arrow button for every item and direction
  const topsLeftArrow = displayArrows("Top", "left");
  const topsRightArrow = displayArrows("Top", "right");
  const bottomsLeftArrow = displayArrows("Bottom", "left");
  const bottomsRightArrow = displayArrows("Bottom", "right");
  const shoesLeftArrow = displayArrows("Shoe", "left");
  const shoesRightArrow = displayArrows("Shoe", "right");


  //Changing mains content to generator page
  main.innerHTML = `
    <div id="generatorParent">
      <div id="generator">
        <div id="generatorGrid">
            <div class="tops_generate">
              ${topsLeftArrow.outerHTML}
              <div></div>
              <div id="selectedTop">
                <div></div>
              </div>
              <div></div>
              ${topsRightArrow.outerHTML}
            </div>
  
            <div class="bottoms_generate">
              ${bottomsLeftArrow.outerHTML}
              <div></div>
              <div id="selectedBottom">
                <div></div>
              </div>
              <div></div>
              ${bottomsRightArrow.outerHTML}
            </div>
  
            <div class="shoes_generate">
              ${shoesLeftArrow.outerHTML}
              <div></div>
              <div id="selectedShoe">
                <div></div>
              </div>
              <div></div>
              ${shoesRightArrow.outerHTML}
            </div>
          </div>
  
          <div class="generateOrSave">
            <button id="generatorButton">GENERATOR</button>
            <div id="saveIt">
              <img src="../MEDIA/heart.png">
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
      
                <div> 
                  <input type=checkbox id=streetwear name=streetwear>
                  <label for=streetwear id=streetwearLabel>Streetwear</label>
                </div>
      
                <div> 
                  <input type=checkbox id=casual name=casual>
                  <label for=casual id=casualLabel>Casual</label>
                </div>
      
                <div> 
                  <input type=checkbox id=sporty name=sporty>
                  <label for=sporty id=sportyLabel>Sporty</label>
                </div>          
      
                <div> 
                  <input type=checkbox id=formal name=formal>
                  <label for=formal id=formalLabel>Formal</label>
                </div>            
                  
                <div> 
                  <input type=checkbox id=business name=business>
                  <label for=business id=businessLabel>Business</label>
                </div>            
                  
                <div> 
                  <input type=checkbox id=datenight name=datenight>
                  <label for=datenight id=datenightLabel>Date night</label>
                </div>            
                  
                <div> 
                  <input type=checkbox id=summer name=summer>
                  <label for=summer id=summerLabel>Summer</label>
                </div>            
                  
                <div> 
                  <input type=checkbox id=winter name=winter>
                  <label for=winter id=winterLabel>Winter</label>
                </div>
      
                <div> 
                  <input type=checkbox id=spring name=spring>
                  <label for=spring id=springLabel>Spring</label>
                </div>

                <div> 
                  <input type=checkbox id=autumn name=autumn>
                  <label for=autumn id=autumnLabel>Autumn</label>
                </div>            
              </fieldset>
            </div>
      
            <div id=newOutfit2>
              <div id="popupSelectedItems">
                <div id="popupSelectedTop"></div>
                <div id="popupSelectedBottom"></div>
                <div id="popupSelectedShoe"></div>
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
  const post_request = new Request("api/your_wardrobe.php", {
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
      generate(event, tops, previousSelectedTop, "selectedTop", "popupSelectedTop", "Top");
    } else if (currentTarget.classList.contains("arrowBottom")) {
      generate(event, bottoms, previousSelectedBottom, "selectedBottom", "popupSelectedBottom", "Bottom");
    } else {
      generate(event, shoes, previousSelectedShoe, "selectedShoe", "popupSelectedShoe", "Shoe");
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
    let selectedTop = tops[Math.floor(Math.random() * tops.length)];
    let selectedBottom = bottoms[Math.floor(Math.random() * bottoms.length)];
    let selectedShoe = shoes[Math.floor(Math.random() * shoes.length)];

    //Changes and displays the items
    document.querySelector("#selectedTop > div").style.backgroundImage = `url(${selectedTop.path})`;
    document.querySelector("#selectedBottom > div").style.backgroundImage = `url(${selectedBottom.path})`;
    document.querySelector("#selectedShoe > div").style.backgroundImage = `url(${selectedShoe.path})`;

    //Changes and displays the selected items to the pop up window
    document.getElementById('popupSelectedTop').style.backgroundImage = `url(${selectedTop.path})`;
    document.getElementById('popupSelectedBottom').style.backgroundImage = `url(${selectedBottom.path})`;
    document.getElementById('popupSelectedShoe').style.backgroundImage = `url(${selectedShoe.path})`;
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
    let backgroundImageTop = document.getElementById("popupSelectedTop").style.backgroundImage;
    let backgroundImageBottom = document.getElementById("popupSelectedBottom").style.backgroundImage;
    let backgroundImageShoe = document.getElementById("popupSelectedShoe").style.backgroundImage;

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
    const request = new Request("api/new_outfit.php", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(OutfitData),
    });

    const response = await fetch(request);

    //If response is ok the pop up window will close and feedback will be sent back to user
    if (response.status === 200) {
      closePopup();
      feedback("Outfit is saved!");
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