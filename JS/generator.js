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

  //Changing mains content to generator

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
      
                </div>
      
                <div id=newOutfit2>
                </fieldset>
                <!-- Placeholder for selected items -->
                  <div id="popupSelectedItems">
                    <div id="popupSelectedTop"></div>
                    <div id="popupSelectedBottom"></div>
                    <div id="popupSelectedShoe"></div>
                  </div>
      
                  <div id="pickBackgroundColor">Pick a background color</div>
      
                  <input type=text id=description name=description placeholder="Write a description"> 
                </div>
      
                  <button id="savePopupButton" type=submit>Save</button>
                </div>
            </form>
        </div>
    </div>`;

  //Gives each button an eventlistener 
  function registerEventListeners() {
    const arrowButtons = document.querySelectorAll(".arrowButton");
    arrowButtons.forEach((button) => {
      button.addEventListener("click", generateItem);
    });
  }

  let closePopupButton = document.getElementById("closePopupButton");
  closePopupButton.addEventListener("click", closePopup);

  let backgroundColorButton = document.getElementById("pickBackgroundColor");
  backgroundColorButton.addEventListener("click", randomColor);
  function randomColor(event) {
    let backgroundDiv = document.getElementById("popupSelectedItems");

    let colorsArray = ["#ffe4e9", "#ceeaec", "#cfe1c8", "black", "#f7f0ea", "#dbd0e3", "#fffbdb", "#f9c8d0", "#f7debb"];
    let chosenColor = colorsArray[Math.floor(Math.random() * colorsArray.length)]

    backgroundDiv.style.backgroundColor = chosenColor;
  }


  let username = window.localStorage.getItem("username");

  let request = await fetch("api/users.php");
  let users = await request.json();
  console.log(users);


  let tops, bottoms, shoes; // Declare the variables outside the loop

  for (let user of users) {
    if (user.username === username) {
      let id = user.id;
      console.log(id);
      let userData = {
        id: id
      };

      const post_request = new Request("api/your_wardrobe.php", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(userData),
      });

      const response = await fetch(post_request);
      let wardrobe = await response.json();
      console.log(response);
      console.log(wardrobe);

      tops = wardrobe.tops;
      bottoms = wardrobe.bottoms;
      shoes = wardrobe.shoes;

      break;
    }
  }

  let previousSelectedTop;
  let previousSelectedBottom;
  let previousSelectedShoe;

  function generateItem(event) {
    event.stopPropagation();

    console.log("hej");
    console.log(event.currentTarget);

    const currentTarget = event.currentTarget;
    let selectedTop, selectedBottom, selectedShoe;

    if (currentTarget.classList.contains("arrowTop")) {
      if (tops.length > 1) {
        do {
          selectedTop = tops[Math.floor(Math.random() * tops.length)];
        } while (selectedTop === previousSelectedTop);
        previousSelectedTop = selectedTop;
      } else {
        selectedTop = tops[0];
      }
      document.querySelector("#selectedTop > div").style.backgroundImage = `url(${selectedTop.path})`;
      document.getElementById('popupSelectedTop').style.backgroundImage = `url(${selectedTop.path})`;
      console.log("Arrow Top clicked");
    } else if (currentTarget.classList.contains("arrowBottom")) {
      if (bottoms.length > 1) {
        do {
          selectedBottom = bottoms[Math.floor(Math.random() * bottoms.length)];
        } while (selectedBottom === previousSelectedBottom);
        previousSelectedBottom = selectedBottom;
      } else {
        selectedBottom = bottoms[0];
      }
      document.querySelector("#selectedBottom > div").style.backgroundImage = `url(${selectedBottom.path})`;
      document.getElementById('popupSelectedBottom').style.backgroundImage = `url(${selectedBottom.path})`;
      console.log("Arrow Bottom clicked");
    } else if (currentTarget.classList.contains("arrowShoe")) {
      if (shoes.length > 1) {
        do {
          selectedShoe = shoes[Math.floor(Math.random() * shoes.length)];
        } while (selectedShoe === previousSelectedShoe);
        previousSelectedShoe = selectedShoe;
      } else {
        selectedShoe = shoes[0];
      }
      document.querySelector("#selectedShoe > div").style.backgroundImage = `url(${selectedShoe.path})`;
      document.getElementById('popupSelectedShoe').style.backgroundImage = `url(${selectedShoe.path})`;
      console.log("Arrow Shoe clicked");
    }
  }

  registerEventListeners();

  let generateButton = document.querySelector("#generatorButton");
  generateButton.addEventListener("click", generator);

  function generator(event) {

    let selectedTop = tops[Math.floor(Math.random() * tops.length)];
    let selectedBottom = bottoms[Math.floor(Math.random() * bottoms.length)];
    let selectedShoe = shoes[Math.floor(Math.random() * shoes.length)];

    document.querySelector("#selectedTop > div").style.backgroundImage = `url(${selectedTop.path})`;
    document.querySelector("#selectedBottom > div").style.backgroundImage = `url(${selectedBottom.path})`;
    document.querySelector("#selectedShoe > div").style.backgroundImage = `url(${selectedShoe.path})`;

    document.getElementById('popupSelectedTop').style.backgroundImage = `url(${selectedTop.path})`;
    document.getElementById('popupSelectedBottom').style.backgroundImage = `url(${selectedBottom.path})`;
    document.getElementById('popupSelectedShoe').style.backgroundImage = `url(${selectedShoe.path})`;
  }

  let saveIt = document.querySelector("#saveIt");
  saveIt.addEventListener("click", openPopup);

  var form = document.getElementById('newOutfitBottom');

  // Attach an event listener to the form submission
  form.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get all the checkboxes within the form
    var checkboxes = form.querySelectorAll('input[type="checkbox"]');

    let styles = [];
    // Iterate over the checkboxes to check which ones are checked
    for (var i = 0; i < checkboxes.length; i++) {
      var checkbox = checkboxes[i];
      if (checkbox.checked) {
        console.log(checkbox);
        console.log(checkbox.id + ' is checked.');

        styles.push(checkbox.id);
        // Do something with the checked checkbox (e.g., store the value, display it, etc.)
      }
    }

    console.log(styles);


    let id = window.localStorage.getItem("id");
    console.log(id);
    let description = document.getElementById("description").value;
    console.log(description);

    let backgroundColor = document.getElementById("popupSelectedItems").style.backgroundColor;
    console.log(backgroundColor);

    let backgroundImageTop = document.getElementById("popupSelectedTop").style.backgroundImage;
    console.log(backgroundImageTop);

    let backgroundImageBottom = document.getElementById("popupSelectedBottom").style.backgroundImage;
    console.log(backgroundImageBottom);

    let backgroundImageShoe = document.getElementById("popupSelectedShoe").style.backgroundImage;
    console.log(backgroundImageShoe);

    let OutfitData = {
      styles: styles,
      userID: id,
      top: backgroundImageTop,
      bottom: backgroundImageBottom,
      shoe: backgroundImageShoe,
      backgroundColor: backgroundColor,
      description: description
    };

    const request = new Request("api/new_outfit.php", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(OutfitData),
    });

    const response = await fetch(request);
    console.log(response);

    if (response.status === 200) {
      console.log("det gick");
      closePopup();
      feedback("Outfit is saved!");
      var checkboxes = form.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
      });
    } else {
      let error = await response.json();
      console.log(error);
      feedback(error.message);
    }

  });
}