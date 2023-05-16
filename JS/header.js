"use strict"

function display_header_menu() {
    let savedProfilePic = localStorage.getItem("profilepicture");
    let userName = localStorage.getItem("username");

    let header = document.querySelector("header");

    if (window.localStorage.getItem("isLoggedIn")) {
        header.style.padding = "0";
        header.innerHTML = `
        <div id="toStartPage">DIGIWAR</div>
        <nav id=menuContainer>
            <form class=menuOptions id=search>
                <input type=text id=searchUser name=searchUser placeholder="Search User">
            </form>
            <div class=menuOptions>
                <a href="#" class=menuOption id=outfitGeneratorButton>Outfit Generator</a>
            </div>
            <div class=menuOptions>
                <a href="#" class=menuOption id=wardrobeButton>Wardrobe</a>
            </div>
            <div class=menuOptions>
                <a href="#" class=menuOption id="usernameNav">
                    <div>${userName}</div>
                    <div id=menuProfilePic>
                        <img src=${savedProfilePic}>
                    </div>
                </a>
                <nav class="subMenuOptions">
                    <a href="#" id=editProfileButton>Edit profile</a>
                    <a href="#" id="logOutButton">Log out</a>
                </nav>
            </div>
        </nav>
    `

        header.classList.add("headerMenu");

        // Get the search form and input element
        const searchForm = document.getElementById('search');
        const searchInput = document.getElementById('searchUser');
        
        // Add event listener to the search form
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the form from submitting
        
            console.log("jag");
            const searchTerm = searchInput.value.trim(); // Get the search term
        
            // Perform the search operation with the search term
            searchUser(searchTerm);
        });

        let generatorButton = document.querySelector("#outfitGeneratorButton");
        generatorButton.addEventListener("click", function (event) {
            renderGeneratorPage()
        })

        let wardrobeButton = document.querySelector("#wardrobeButton");
        wardrobeButton.addEventListener("click", function (event) {
            renderWardrobePage()
        })

        let editProfileButton = document.querySelector("#editProfileButton")
        editProfileButton.addEventListener("click", function (event) {
            editProfile()
        })

        let logOutButton = document.querySelector("#logOutButton");
        logOutButton.addEventListener("click", log_out)

        function log_out() {
            window.localStorage.removeItem("username");
            window.localStorage.removeItem("password");
            window.localStorage.removeItem("id");
            window.localStorage.removeItem("profilepicture");
            window.localStorage.removeItem("isLoggedIn");

            renderStartPage()
        }

    } else {
        header.style.padding = "3vh";
        header.innerHTML = `
            <div id="toStartPage">DIGIWAR</div>
            <button id="buttonToLoginPage">Login</button>
        `;
        document.querySelector("#buttonToLoginPage").addEventListener("click", renderLoginPage);
    }

    document.querySelector("#toStartPage").addEventListener("click", renderStartPage);
}

