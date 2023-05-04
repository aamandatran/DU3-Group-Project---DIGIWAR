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

// Sends back every item to display on website
if($requestMethod == "GET") {
    // Filter items by DIGIWARS ID which is 0
    $wardrobe = [
        "tops" => filterItemsById($tops, 0),
        "bottoms" => filterItemsById($bottoms, 0),
        "shoes" => filterItemsById($shoes, 0)
    ];

    sendJSON($wardrobe, 200);
}



?>
