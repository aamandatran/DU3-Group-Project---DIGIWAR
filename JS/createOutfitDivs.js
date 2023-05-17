"use strict"

async function createOutfitDivs (id) {
    
    let response = await fetch("api/users.php");
    let users = await response.json();

    for(let user of users) {
        if(user.id === id) {
            
        }
    }
}