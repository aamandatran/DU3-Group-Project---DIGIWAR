"use strict"

async function renderGeneratorPage() {
  display_header_menu()
  document.querySelector("#menuContainer>#outfitGeneratorButton").style.fontWeight = "600";

  function displayArrows(item, direction) {
    const arrowButton = document.createElement("button");
    arrowButton.classList.add("arrowButton");
    arrowButton.classList.add(`arrow${item}`);
    arrowButton.innerHTML = `
            <img src=../MEDIA/keyboard-arrow-${direction}.png class = arrow>
            `;
    main.appendChild(arrowButton);
    console.log(arrowButton);
    //arrowButton.addEventListener("click", generateItem);
    return arrowButton;
  }


  const topsLeftArrow = displayArrows("Top", "left");
  const topsRightArrow = displayArrows("Top", "right");
  const bottomsLeftArrow = displayArrows("Bottom", "left");
  const bottomsRightArrow = displayArrows("Bottom", "right");
  const shoesLeftArrow = displayArrows("Shoe", "left");
  const shoesRightArrow = displayArrows("Shoe", "right");

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
      </div>
    `;

  function registerEventListeners() {
    const arrowButtons = document.querySelectorAll(".arrowButton");
    arrowButtons.forEach((button) => {
      button.addEventListener("click", generateItem);
    });
  }

  const generatorParent = document.querySelector("#generatorParent");
  generatorParent.innerHTML += ` 
    <div id="popupWindow" class="popup">
    <div id="popupContent">
      <!-- Placeholder for selected items -->
      <div id="popupSelectedItems">
        <div id="popupSelectedTop"></div>
        <div id="popupSelectedBottom"></div>
        <div id="popupSelectedShoe"></div>
      </div>
      <button id="closePopupButton">Close</button>
    </div>
  </div>
  `;


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
}