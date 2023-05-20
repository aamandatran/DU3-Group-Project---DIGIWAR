<?php
ini_set("display_errors", 1);
require_once("functions.php");

$filename = "users.json";
$method = $_SERVER["REQUEST_METHOD"];

$data = getFileContents("php://input");
$users = getFileContents($filename);

if($method == "POST") {
    
    
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

if ($method=="DELETE") {

    $userID = $data["userID"];
    $outfitID=$data["outfitID"];

    foreach ($users as $user) {
        if ($user["id"]==$userID) {
            $outfits=$user["outfits"];

            foreach ($outfits as $key=> $outfit) {
                if ($outfit["outfitID"]== $outfitID) {
                    unset($outfits[$key]);
                    break;
                }
            }

            saveToFile($filename,$users);
            break;
        }
    }
}   

?>