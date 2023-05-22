<?php
ini_set("display_errors", 1);
require_once("functions.php");

$filename = "users.json";
$method = $_SERVER["REQUEST_METHOD"];

//POST is used for register users
if ($method == "POST") {

    //If users.json doesn't exist it will be created
    if(!file_exists("users.json")) {
        file_put_contents("users.json", "{}");
    }
    
    //Fetches information from POST request and save values
    $data = getFileContents("php://input");    
    $username = $data["username"];
    $password = $data["password"];
    $profilepicture = $data["profilepicture"];
    
    //Get content and decode "users.json"
    $users = getFileContents($filename);

    //If username or password is an empty string, bad request will be sent
    if($username == "" or $password == "") {
        $error = [
            "message" => "Empty values"
        ];
        sendJSON($error, 400);
    } 
    
    //If username or password is less than 3 characters, bad request will be sent
    if(strlen($username) < 3 or strlen($password) < 3) {
        $error = [
            "message" => "Username or Password needs to be at least 3 characters"
        ];
        sendJSON($error, 400);
    }
    
    //If profilepicture is false, bad request will be sent
    if(!$profilepicture) {
        $error = [
            "message" => "Profile picture not selected"
        ];
        sendJSON($error, 400);
    } 
    
    //Looping users to check if the username is already taken, conflict will be sent back
    foreach ($users as $user) {
        if ($user["username"] == $username) {
            $error = [
                "message" => "Conflict (the username is already taken)"
            ];
            sendJSON($error, 409);
        }
    }
    
    //Looping users to give the new user the highest id
    $highestID = 0;
    foreach($users as $user) {
        if($user["id"] > $highestID) {
            $highestID = $user["id"];
        }
    }
    $id = $highestID + 1;

    //Setting the users outfit closet to an empty array
    $outfits = [];
    
    //Saving the users information
    $newUser = [
        "id" => $id,
        "username" => $username,
        "password" => $password,
        "profilepicture" => $profilepicture,
        "outfits" => $outfits
    ];
    
    //Adding the new user to the user array, updating and saving users.json, sending the new user object
    $users[] = $newUser;
    saveToFile("users.json", $users);
    sendJSON($newUser, 200);        
}
?>