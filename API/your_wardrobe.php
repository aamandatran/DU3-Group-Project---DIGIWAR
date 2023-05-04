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

// If we received an upload
if(isset($_FILES["item"])) {
    $source = $_FILES["item"]["tmp_name"];
    $destination = "../MEDIA/" . $_FILES["item"]["name"];

    if (move_uploaded_file($source, $destination)) {
        $newItem = [
            "path" => $destination, 
            "id" => [intval($_POST["id"])]
        ];

        // Message to server if item was added successfully
        $message = [
            "message" => "The item has been added successfully!",
            "path" => $destination,
            "ok" => true
        ];

        // Checks which JSON file to save newItem to
        if($_POST["file"] == "tops.json") {
            $tops[] = $newItem;
            saveToFile("tops.json", $tops);
            $message["file"] = "tops.json";
            sendJSON($message, 200);
        } elseif($_POST["file"] == "bottoms.json") {
            $bottoms[] = $newItem;
            saveToFile("bottoms.json", $bottoms);
            $message["file"] = "bottoms.json";
            sendJSON($message, 200);
        } elseif($_POST["file"] == "shoes.json") {
            $shoes[] = $newItem;
            saveToFile("shoes.json", $shoes);
            $message["file"] = "shoes.json";
            sendJSON($message, 200);
        } else{
            $message = [
                "message" => "No category was selected... please select a category."
            ];
            sendJSON($message, 409);
        }
    } else {
        // If we received no upload, an error message is sent back
        $message = [
            "message" => "Something went wrong with uploading the item... please try again!"
        ];
        sendJSON($message, 409);
    } 
}

// Sends back every item to display on website
if($requestMethod == "POST") {
    if(!isset($requestData["id"])) {
        $message = ["message" => "Id of user was not sent..."];
    }

    // Function filetItemsById is located in functions.php
    $wardrobe = [
        "tops" => filterItemsById($tops, $requestData["id"]),
        "bottoms" => filterItemsById($bottoms, $requestData["id"]),
        "shoes" => filterItemsById($shoes, $requestData["id"])
    ];

    sendJSON($wardrobe, 200);
}


if($requestMethod == "DELETE") {
    $path = $requestData["path"];
    $JSONfile = $requestData["file"];

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
        sendJSON($message, 418);
    }

    foreach($items as $key => $item) {
        if($path == $item["path"]) {
            // Remove the item from the array
            unset($items[$key]);

            // Save the updated array back to the file
            saveToFile($JSONfile, $items);

            // Send a success response
            $message = [
                "message" => "The item has been deleted successfully!",
                "ok" => true
            ];
            sendJSON($message, 200);
        }
    }
}

?>