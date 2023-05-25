<?php
ini_set("display_errors", 1);
require_once("functions.php");

$method = $_SERVER["REQUEST_METHOD"];

//Sending the json file with profilepictures
if($method == "GET") {
    $profilePics = getFileContents(__dir__."profilepictures.json");
    sendJSON($profilePics);
}
?>