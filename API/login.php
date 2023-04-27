<?php
ini_set('display_errors', 1);
require_once("functions.php");

$filename = "users.json";
$method = $_SERVER["REQUEST_METHOD"];

if($method == "POST") {

    $dataJSON = file_get_contents("php://input");
    $data = json_decode($dataJSON, true);

    $username = $data["username"];
    $password = $data["password"];

    $users = getFileContents($filename);

    if($username == "" or $password == "") {
        $error = [
            "message" => "Empty values, please write a username and password"
        ];
        sendJSON($error, 400);
    }

    for($i = 0; $i < count($users); $i++) {
        if($users[$i]["username"] == $username and $users[$i]["password"] == $password){
            sendJSON($users[$i]);
        } else if($users[$i]["username"] == $username and $users[$i]["password"] != $password) {
            $error = [
                "message" => "Password is incorrect"
            ];
            sendJSON($error, 400);
        } else {
            $userfound = false;
        }
    }

    if(!$userfound) {
        $error = [
            "message" => "Not found"
        ];
        sendJSON($error, 404);
    }

} else {
    $error = [
        "message" => "Only POST works."
    ];
    sendJSON($error, 400);
}
?>