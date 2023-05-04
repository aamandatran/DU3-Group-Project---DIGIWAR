"use strict";

function renderWardrobePage() {
    body.innerHTML = `
        <div id="top">
            <h1>Welcome to your wardrobe!</h1>
            <nav>
                <a href="#">YOURS</a>
                <a href="#">DIGIWAR'S</a>
                <a href="#">SAVED OUTFITS</a>
            </nav>
        </div>
        <div id="bottom">
            <div id="filtering">
                <fieldset id="categories">
                    <legend>Choose a category</legend>
                    <button id="tops">TOPS</button>
                    <button id="bottoms">BOTTOMS</button>
                    <button id="shoes">SHOES</button>
                </fieldset>
                <button id="addClothes">Add Clothes</button>
            </div>
            <div id="wardrobeFeed">
                <p></p>
                <ul></ul>
            </div>
        </div>
    `;
}