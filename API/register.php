<?php
ini_set("display_errors", 1);
require_once("functions.php");

$method = $_SERVER["REQUEST_METHOD"];

//Används när man vill nå arrayen med våra utvalda profilbilder
if($method == "GET") {
    $profilePics = getFileContents("profilepictures.json");
    sendJSON($profilePics);

} else if($method == "POST") {
//Används när man vill skapa ett nytt konto
    if(!file_exists("users.json")) {
        file_put_contents("users.json", "{}");
    }

    $data = getFileContents("php://input");

    $username = $data["username"];
    $password = $data["password"];
    $profilepicture = $data["profilepicture"];
    //Vi hämtar informationen från request

    $users = getFileContents("users.json");

    if($username == "" or $password == "") {
    //Ifall inputfälten är tomma
        $error = [
            "message" => "Empty values"
        ];
        sendJSON($error, 400);
    } else if(strlen($username) < 3 or strlen($password) < 3) {
    //Ifall användarnamn eller lösenord är mindre än tre karaktärer
        $error = [
            "message" => "Username or Password needs to be at least 3 characters"
        ];
        sendJSON($error, 400);
    } else if($profilepicture == "") {
    //Ifall en profilbild inte valdes
        $error = [
            "message" => "Profile picture not selected"
        ];
        sendJSON($error, 400);
    } else {
        foreach($users as $user) {
        //Ifall användarnamnet är taget
            if($user["username"] == $username) {
                $error = [
                    "message" => "Username is already taken"
                ];
                sendJSON($error, 409);
            } 
        }
    }
        //Annars så skapas användaren, läggs till i databasen och skickas tillbaka.
        $newUser = [
            "username" => $username,
            "password" => $password,
            "profilepicture" => $profilepicture
        ];

        $users[] = $newUser;

        saveToFile("users.json", $users);

        sendJSON($newUser);
    

} else {
//Om en annan request än GET eller POST används
    $error = [
        "message" => "Only GET or POST works"
    ];
    sendJSON($error, 400);
}
?>