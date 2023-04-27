<?php
ini_set("display_errors", 1);
require_once("functions.php");

$method = $_SERVER["REQUEST_METHOD"];

if($method == "GET") {
    $profilePics = getFileContents("profilepictures.json");
}
if($method == "POST") {

    if(!file_exists("users.json")) {
        file_put_contents("users.json", "{}");
    }

    $data

}
?>