<?php
ini_set('display_errors', 1);
require_once("functions.php");

$filename = "users.json";
$method = $_SERVER["REQUEST_METHOD"];
$contentType = $_SERVER["CONTENT_TYPE"];

//Checking if the right mehod is used.
if ($method !== "PATCH") {
    $error=[
        "message" => "Only PATCH works."
    ];
    sendJSON($error,405);
}
//Checking so that the right content type is used. 
if ($contentType !== "application/json") {
    $error = [
        "message" => "only JSON works."
    ];
    sendJSON($error,400);
}


$data = getFileContents("php://input");
 
//Putting the new profile picture and the users username in variables.
$selectedProfilePicture = isset($data["profilePic"]) ? $data["profilePic"] : null;
if ($selectedProfilePicture==null) {
    $error = [
        "message" => "You have not selected a new profile Pic"
    ];
    sendJSON($error,400);
}
$userName = $data["userName"]; 
//Collecting all information from the json file and putting it in $users
$users = getFileContents($filename);


foreach ($users as $index => $user) {
    //Finding the right user in the array
    if ($userName == $user["username"]) {
        //When the right user is found we switch the new profile pic for the old one. 
        $users[$index]["profilepicture"] = $selectedProfilePicture;
            $response = [
                //The respons that is sent back contains the new profile pic and a message. 
                "newProfilePic" => $selectedProfilePicture,
                "message" => "Profile picture updated successfully!"
            ];
            //Saving the updated array in users.json
            saveToFile($filename,$users);
            //Sending the respons with sendJSON function.
            sendJSON($response);
            break;
    }
}


?>