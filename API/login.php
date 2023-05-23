<?php
ini_set('display_errors', 1);
require_once("functions.php");

$filename = "users.json";
$method = $_SERVER["REQUEST_METHOD"];

//POST is used for logging in
if($method == "POST") {

    //Fetch the information from the POST request and save values
    $data = getFileContents("php://input");
    $username = $data["username"];
    $password = $data["password"];

    //Get content and decode "users.json"
    $users = getFileContents($filename);

    //If strings are empty bad request feedback will be sent back
    if($username == "" or $password == "") {
        $error = [
            "message" => "Empty values, please write a username and password"
        ];
        sendJSON($error, 400);
    }

    //This loop checks if the user in the user array matches the information from the POST request
    for($i = 0; $i < count($users); $i++) {
        if($users[$i]["username"] == $username and $users[$i]["password"] == $password){
            //If information matches everything except password will be sent back
            $correctUser = [
                "id" => $users[$i]["id"],
                "username" => $users[$i]["username"],
                "profilepicture" => $users[$i]["profilepicture"],
                "outfits" => $users[$i]["outfits"]
            ];
            sendJSON($correctUser);
        //Else if username exist but password is incorrect
        } else if($users[$i]["username"] == $username and $users[$i]["password"] != $password) {
            //Password is incorrect, bad request, will be sent back
            $error = [
                "message" => "Password is incorrect"
            ];
            sendJSON($error, 400);
        } else {
            //If username doesn't exist it will be set to false
            $userfound = false;
        }
    }

    //Checking if the username wasn't found
    if(!$userfound) {
        //NOT FOUND will be sent back
        $error = [
            "message" => "Not found"
        ];
        sendJSON($error, 404);
    }

//If another request other than POST is sent it will send back an error
} else {
    $error = [
        "message" => "Only POST works."
    ];
    sendJSON($error, 405);
}
?>