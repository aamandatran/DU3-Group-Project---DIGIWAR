<?php
ini_set("display_errors", 1);
require_once("functions.php");

// Reads the content in the JSON-files and decodes from JSON to PHP
$tops = getFileContents("tops.json");
$bottoms = getFileContents("bottoms.json");
$shoes = getFileContents("shoes.json");

$requestMethod = $_SERVER["REQUEST_METHOD"];

// Get data from the request body
$requestData = getFileContents("php://input");

// If we received an upload
if(isset($_FILES["item"])) {
    $source = $_FILES["item"]["tmp_name"];
    $originalFilename = $_FILES["item"]["name"];

    // Generate a unique filename to avoid filenames with the same name
    $uniqueFilename = sha1($originalFilename . time());

    // Replaces space with underscore
    $cleanFilename = str_replace(' ', '_', $uniqueFilename);

    // Set the temporary directory path
    $tempDir = ini_get('upload_tmp_dir');
    if (empty($tempDir)) {
        $tempDir = sys_get_temp_dir(); // Use system default temporary directory if upload_tmp_dir is not set
    }

    // Create the temporary directory if it doesn't exist
    if (!file_exists($tempDir)) {
        mkdir($tempDir, 0755, true);
    }

    $destination = "DIGIWAR/../MEDIA/" . $cleanFilename;

    if (rename($originalFilename, $destination)) {
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
            sendJSON($message, 201);
        } elseif($_POST["file"] == "bottoms.json") {
            $bottoms[] = $newItem;
            saveToFile("bottoms.json", $bottoms);
            $message["file"] = "bottoms.json";
            sendJSON($message, 201);
        } elseif($_POST["file"] == "shoes.json") {
            $shoes[] = $newItem;
            saveToFile("shoes.json", $shoes);
            $message["file"] = "shoes.json";
            sendJSON($message, 201);
        } else{
            $message = [
                "message" => "No category was selected... please select a category."
            ];
            sendJSON($message, 400);
        }
    } else {
        // If we received no upload, an error message is sent back
        $message = [
            "message" => "Something went wrong with uploading the item... please try again!"
        ];
        sendJSON($message, 418);
    } 
}

// Sends back every item to display on website
if($requestMethod == "POST") {
    if(!isset($requestData["id"])) {
        $message = ["message" => "User id was not sent..."];
        sendJSON($message, 400);
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
    $id = $requestData["id"];

    // Check which JSON file to iterate over and search for the item
    if($JSONfile == "tops.json") {
        $items =& $tops;
    } elseif($JSONfile == "bottoms.json") {
        $items =& $bottoms;
    } elseif($JSONfile == "shoes.json") {
        $items =& $shoes;
    }

    foreach($items as $key => $item) {
        if(strstr($path, $item["path"])) {
            // Check if Id array has more than one id
            if(count($item["id"]) > 1){
                // Gets the index of the Id to remove
                $index = array_search($id, $item["id"]);
                if($index !== false) {
                    // Removes the Id from the array
                    unset($item["id"][$index]);
                    $items[$key]["id"] = $item["id"];
                }
            } else {
                // Removes the item from the array and MEDIA directory
                unset($items[$key]);
                unlink("../MEDIA/" . $item["path"]);
            }

            // Saves the updated array back to the file
            saveToFile($JSONfile, $items);

            // Sends a success response
            $message = [
                "message" => "The item has been successfully deleted!",
                "ok" => true
            ];
            sendJSON($message, 200);
        }
    }

    // If something went wrong, for example if no file was sent
    $message = ["message" => "Something went wrong... please try again!"];
    sendJSON($message, 409);
}

?>