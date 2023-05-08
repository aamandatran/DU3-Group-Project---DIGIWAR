<?php
ini_set("display_errors", 1);
require_once("functions.php");

$method = $_SERVER["REQUEST_METHOD"];

//Används när man vill nå arrayen med våra utvalda profilbilder
if($method == "GET") {
    $users = getFileContents("users.json");
    $displayUsers = [];
    foreach($users as $user) {
        $displayUser = [
            "username" => $user["username"],
            "id" => $user["id"],
            "profilepicture" => $user["profilepicture"]
        ];
        $displayUsers[] = $displayUser;
    }
    sendJSON($displayUsers);
}

?>