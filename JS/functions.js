function displayProfilePics(array) {
    //Denna funktionen är samma som i login/register och displayar alla bilder. 
    let html = "";
    for (let profilepic of array) {
        html += `
                <li class=editProfileOptions>
                <img src=${profilepic}>
                </li>
                `;
    }
    return html;
}