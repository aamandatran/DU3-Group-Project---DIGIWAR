<?php
ini_set('display_errors', 1);
require_once("functions.php");

$filename = "users.json";
$method = $_SERVER["REQUEST_METHOD"];

if($method == "POST") {
//Används när man vill logga in
    $data = getFileContents("php://input");

    $username = $data["username"];
    $password = $data["password"];
    //Vi hämtar informationen från request


    $users = getFileContents($filename);

    if($username == "" or $password == "") {
    //Ifall ingen information skickades
        $error = [
            "message" => "Empty values, please write a username and password"
        ];
        sendJSON($error, 400);
    }

    for($i = 0; $i < count($users); $i++) {
    //En loop som går genom om användarnamn och lösenord stämmer överens med varje användare
        if($users[$i]["username"] == $username and $users[$i]["password"] == $password){
            //Om användarnamn och lösenord stämmer överens så skickas användaren tillbaka
            sendJSON($users[$i]);
        } else if($users[$i]["username"] == $username and $users[$i]["password"] != $password) {
            //Om användarnamnet stämmer men lösenordet är inkorrekt
            $error = [
                "message" => "Password is incorrect"
            ];
            sendJSON($error, 400);
        } else {
            //Om användarnamnet inte hittades
            $userfound = false;
        }
    }

    if(!$userfound) {
        //Om användarnamnet inte hittades så skickas detta felmeddelande
        $error = [
            "message" => "Not found"
        ];
        sendJSON($error, 404);
    }

} else {
//Om en annan request än POST används

    $error = [
        "message" => "Only POST works."
    ];
    sendJSON($error, 400);
}
?>