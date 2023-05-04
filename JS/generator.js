"use strict"

async function renderGeneratorPage () {

    main.innerHTML = `
        <div class = "tops_generate">
            <div id="arrow">
                <img>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div id="arrow">
                <img>
            </div>
        </div>

        <div class = "bottoms_generate">
            <div id="arrow">
                <img>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div id="arrow">
                <img>
            </div>
        </div>

        <div class = "shoes_generate">
            <div id="arrow">
                <img>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div id="arrow">
                <img>
            </div>
        </div>

        <div class = "generateOrSave">
        <button>GENERATOR</button>
        <p>Save it</p>
        </div>
    `;

    let request = await fetch("api/users.php");
    let response = await request.json();
    console.log(response);


    function generator (type, array) {

    }

}