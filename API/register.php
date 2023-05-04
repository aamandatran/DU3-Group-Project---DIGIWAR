<?php
ini_set("display_errors", 1);
require_once("functions.php");

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "POST") {
    if(!file_exists("users.json")) {
        file_put_contents("users.json", "{}");
    }
    
    $jsondata = file_get_contents("php://input");
    $data = json_decode($jsondata, true);
    
    $username = $data["username"];
    $password = $data["password"];
    $profilepicture = $data["profilepicture"];
    
    $jsonusers = file_get_contents("users.json");
    $users = json_decode($jsonusers, true);

    if($username == "" or $password == "") {
        $error = [
            "message" => "Empty values"
        ];
        sendJSON($error, 400);
    } 
    
    if(strlen($username) < 3 or strlen($password) < 3) {
        $error = [
            "message" => "Username or Password needs to be at least 3 characters"
        ];
        sendJSON($error, 400);
    }
    
    if(!$profilepicture) {
        $error = [
            "message" => "Profile picture not selected"
        ];
        sendJSON($error, 400);
    } 
    
    foreach ($users as $user) {
        if ($user["username"] == $username) {
            $error = [
                "message" => "Conflict (the username is already taken)"
            ];
            sendJSON($error, 409);
        }
    }
    
    $highestID = 0;
    
    foreach($users as $user) {
        if($user["id"] > $highestID) {
            $highestID = $user["id"];
        }
    }
    
    $id = $highestID + 1;
    
    $newUser = [
        "id" => $id,
        "username" => $username,
        "password" => $password,
        "profilepicture" => $profilepicture
    ];
    
    $users[] = $newUser;
    saveToFile("users.json", $users);
    sendJSON($newUser, 200);        
}

?>