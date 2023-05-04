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

// Add a user Id to the array containing every Id who has access to the item from DIGIWARS wardrobe
if($requestMethod == "PATCH") {
    $path = $requestData["path"];
    $JSONfile = $requestData["file"];
    $id = $requestData["id"];

    // Check which JSON file to iterate over and search for the item
    if($JSONfile == "tops.json") {
        $items =& $tops;
    } elseif($JSONfile == "bottoms.json") {
        $items =& $bottoms;
    } elseif($JSONfile == "shoes.json") {
        $items =& $shoes;
    } else {
        // If something went wrong, for example if no file was sent
        $message = ["message" => "Something went wrong... please try again!"];
        sendJSON($message, 409);
    }

    foreach($items as $key => $item) {
        if($path == $item["path"]) {
            // Adds the new Id to the array
            $item["id"][] = $id;

            // Updates the item in the array
            $items[$key] = $item;

            // Saves the updated array back to the file
            saveToFile($JSONfile, $items);

            // Sends a success response
            $message = [
                "message" => "The item has been successfully added to your wardrobe!",
                "ok" => true
            ];
            sendJSON($message, 200);
        }
    }
}

?>
