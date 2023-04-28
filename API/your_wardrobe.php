<?php
ini_set("display_errors", 1);
require_once("functions.php");

// Reads the content in the JSON-files and decodes from JSON to PHP
$tops = getFileContents("tops.json");
$bottoms = getFileContents("bottoms.json");
$shoes = getFileContents("shoes.json");

$requestMethod = $_SERVER["REQUEST_METHOD"];

// Get data from the request body
$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);

if(isset($_FILES["item"])) {
    $source = $_FILES["item"]["tmp_name"];
    $destination = "../MEDIA/" . $_FILES["item"]["name"];

    if (move_uploaded_file($source, $destination)) {
        $newItem = ["path" => $destination, "id" => [intval($_POST["id"])]];

        if($_POST["file"] == "tops.json") {
            $tops[] = $newItem;
            saveToFile("tops.json", $tops);
        } elseif($_POST["file"] == "bottoms.json") {
            $bottoms[] = $newItem;
            saveToFile("bottoms.json", $bottoms);
        } elseif($_POST["file"] == "shoes.json") {
            $shoes[] = $newItem;
            saveToFile("shoes.json", $shoes);
        }
    
        $message = ["message" => "The item has been added successfully!"];
        sendJSON($message, 200);
    } else {
        $message = ["message" => "Something went wrong with uploading the item... please try again!"];
        sendJSON($message, 409);
    } 
}


?>