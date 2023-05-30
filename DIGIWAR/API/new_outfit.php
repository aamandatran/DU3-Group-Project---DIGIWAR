<?php
ini_set("display_errors", 1);
require_once("functions.php");

$filename = "users.json";
$method = $_SERVER["REQUEST_METHOD"];

//Fetching the information from the POST or DELETE request
$data = getFileContents("php://input");
$users = getFileContents($filename);

//POST is used for saving an outfit from generator
if($method == "POST") {
    
    //Saving the outfit values
    $userID = $data["userID"];
    $styles = $data["styles"];
    $top = $data["top"];
    $bottom = $data["bottom"];
    $shoe = $data["shoe"];
    $backgroundColor = $data["backgroundColor"];
    $description = $data["description"];

    //If the selected outfit styles is 0 an error with bad request will be sent
    if (count($styles) == 0) {
        $error = [
            "message" => "You must choose a style!"
        ];
        sendJSON($error, 400);
    }

    $highestID = 0;
    $outfitID = 0;
    foreach ($users as $user) {
        foreach ($user["outfits"] as $outfit) {
            if ($outfit["outfitID"] > $highestID) {
                $highestID = $outfit["outfitID"];
                $outfitID = $highestID + 1;
            }
        }
    }
    

    // Use the reference &$user to modify the original array
    foreach ($users as &$user) { 
        if ($user["id"] == $userID) {
            $outfit = [
                "styles" => $styles,
                "top" => $top,
                "bottom" => $bottom,
                "shoe" => $shoe,
                "backgroundColor" => $backgroundColor,
                "description" => $description,
                "outfitID"=> $outfitID
            ];

            // Append the new outfit to the "outfits" array
            $user["outfits"][] = $outfit;

            // Update the user data in the users array
            saveToFile($filename, $users);

            // Exit the loop since the user is found and updated
            break; 
        }
    }
}


if ($method == "DELETE") {
    $userID = $data["userID"];
    $outfitID = $data["outfitID"];

    $newUserArray = [];

    foreach ($users as $user) {
        if ($user["id"] == $userID) {
            $outfits = $user["outfits"];

            foreach ($outfits as $key => $outfit) {
                if ($outfit["outfitID"] == $outfitID) {
                    // Remove the specific outfit from the $outfits array
                    unset($outfits[$key]); 
                    // Reassign the updated $outfits array
                    $user["outfits"] = array_values($outfits); 
                }
            }
        }

        $newUserArray[] = $user;
    }

    saveToFile($filename, $newUserArray);
    $message = ["message" => "Outfit deleted successfully"];
    sendJSON($message, 200);
}
?>