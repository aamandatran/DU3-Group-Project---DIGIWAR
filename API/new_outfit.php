<?php
ini_set("display_errors", 1);
require_once("functions.php");

$filename = "users.json";
$method = $_SERVER["REQUEST_METHOD"];

if($method == "POST") {

    $data = getFileContents("php://input");

    $userID = $data["userID"];
    $styles = $data["styles"];
    $top = $data["top"];
    $bottom = $data["bottom"];
    $shoe = $data["shoe"];
    $backgroundColor = $data["backgroundColor"];
    $description = $data["description"];

    if (count($styles) === 0) {
        $error = [
            "message" => "You must choose a style!"
        ];
        sendJSON($error, 400);
    }

    
    $users = getFileContents($filename);
    
    $highestID=0;
        foreach ($users as $user) {
            foreach ($user["outfits"] as $outfit) {
                if ($outfit["outfitID"]>$highestID) {
                    $highestID=$outfit["outfitID"];
                }
            }
        }
        $outfitID=$highestID+1;

    foreach ($users as &$user) { // Use the reference &$user to modify the original array
       

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

            $user["outfits"][] = $outfit; // Append the new outfit to the "outfits" array

            // Update the user data in the users array
            saveToFile($filename, $users);
            break; // Exit the loop since the user is found and updated
        }
    }
}

?>