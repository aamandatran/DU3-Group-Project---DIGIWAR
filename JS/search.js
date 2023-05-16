"use strict"

// Function to perform the search operation
async function searchUser(searchTerm) {
  // Implement your search logic here
  // You can use the search term to search for a user
  // For example, make an API request to search for the user based on the searchTerm
  // Once you get the search results, you can handle them accordingly
  console.log('Searching for user:', searchTerm);

    let response = await fetch("api/users.php");
    let users = await response.json();
    console.log(users);

    for(let user of users) {
        if(user.username === searchTerm) {
            console.log("found");
            renderSearchProfile(user);
            break;
        }
    }


}