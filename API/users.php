<?php
ini_set("display_errors", 1);
require_once("functions.php");

$method = $_SERVER["REQUEST_METHOD"];

//GET is used for fetching the users in users.json except for their passwords
if($method == "GET") {
    $users = getFileContents(__dir__."users.json");
    $displayUsers = [];
    foreach($users as $user) {
        $displayUser = [
            "username" => $user["username"],
            "id" => $user["id"],
            "profilepicture" => $user["profilepicture"],
            "outfits" => $user["outfits"]
        ];
        $displayUsers[] = $displayUser;
    }
    sendJSON($displayUsers);
}
?>