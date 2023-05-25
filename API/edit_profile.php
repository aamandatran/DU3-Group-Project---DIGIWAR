<?php
ini_set('display_errors', 1);
require_once("functions.php");

$filename = __dir__."users.json";
$method = $_SERVER["REQUEST_METHOD"];
$contentType = $_SERVER["CONTENT_TYPE"];

//We check if the right method is used.  
if ($method != "PATCH") {
    $error = [
        "message" => "Only PATCH-method is allowed"
    ];
    sendJSON($error, 405);
}
//We check if the right content typ is used. 
if ($contentType !== "application/json") {
    $error = [
        "message" => "Content type needs to be JSON"
    ];
    sendJSON($error, 400);
}

//We then gather the old and new password and the username from the //input. 
$data = getFileContents("php://input");

$oldPassword = $data["oldPassword"];
$newPassword = $data["newPassword"];
$userName = $data["userName"];

//We then gather all information from the users json.  
$users=getFileContents($filename);


//If the new password and old password is empty then we send back a error message "empty values"
if ($newPassword == "" or $oldPassword == "") {
    $error = [
        "message" => "Password can not have empty values"
    ];
    sendJSON($error, 400);
    //We check so that the new password is atleast 3 characters
}elseif (strlen($newPassword) < 3) {
    $error = [
        "message" => "New password needs to be at least 3 characters"
    ];
    sendJSON($error, 400);
}
    //We then check if the new password isnt the same as the old one. 
 if ($oldPassword == $newPassword) {
    $error = [
        "message" => "Your new password can NOT be the same as your old password!"
        ];
        sendJSON($error, 400);
    }



foreach ($users as $index => $user) {
    if ($userName == $user["username"]) {
        if ($oldPassword == $user["password"]) {
            //Här går vi igenom alla andvändares lösenord och hittar rätt andvändare med hjälp av det gamla lösenordet. 
            $users[$index]["password"] = $newPassword;
            //När vi hittat rätt andvändare så bytar vi ut det nya mot det gamla.  
            $response = [
                "message" => "Password updated succesfully!"
            ];
            saveToFile($filename, $users);
            sendJSON($response, 200);
            break;

    } else {
        $error = [
            "message" => "Old password is incorrect!"
        ];
        sendJSON($error, 400);
        }
    }
}
?>