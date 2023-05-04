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

    let username = window.localStorage.getItem("username");

    let request = await fetch("api/users.php");
    let users = await request.json();
    console.log(users);
    for(let user of users) {
        if(user.username === username) {
            let id = user.id;
            console.log(id);
            let userData = {
                id: id
            };
        
            const post_request = new Request ("api/your_wardrobe.php", {
                method: "POST",
                headers: {"Content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify(userData),
            });
        
            const response = await fetch(post_request);
            let clothes = await response.json();
            console.log(response);
            console.log(clothes);
        
            function generator (type, array) {
        
            }
        }
    }


}