<?php
ini_set('display_errors', 1);
require_once("functions.php");

$filename = "users.json";
$method = $_SERVER["REQUEST_METHOD"];
$contentType = $_SERVER["CONTENT_TYPE"];

if ($method !== "PATCH") {
    //Kollar så att det är rätt metod som andvänds. 
    $error = [
        "message" => "Only PATCH works."
    ];
    sendJSON($error,405);
}
if ($contentType !== "application/json") {
    //Kollar så att det är rätt content type
    $error = [
        "message" => "only JSON works."
    ];
    sendJSON($error,400);
}


$data = getFileContents("php://input");

$selectedProfilePicture = $data["profilePic"];
$userName = $data["userName"];

$users = getFileContents($filename);


foreach ($users as $index => $user) {
    if ($userName == $user["username"]) {
            //När vi hittat rätt andvändare så bytar vi ut det nya mot det gamla. 
            $users[$index]["profilepicture"] = $selectedProfilePicture;
            //Vi bytar ut den selecterade profilbilden mot den gamla. 
            $response = [
                "newProfilePic" => $selectedProfilePicture,
                "message" => "Profile picture updated succesfully!"
            ];
            saveToFile($filename,$users);
            sendJSON($response);
            break;
    }
}


?>