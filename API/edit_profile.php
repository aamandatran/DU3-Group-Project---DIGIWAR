<?php
ini_set('display_errors', 1);
require_once("functions.php");

$filename="users.json";
$method=$_SERVER["REQUEST_METHOD"];
$contentType=$_SERVER["CONTENT_TYPE"];

if ($method!=="PATCH") {
    //Kollar så att det är rätt metod som andvänds. 
    $error=[
        "message"=>"Only PATCH works."
    ];
    sendJSON($error,405);
}
if ($contentType!=="application/json") {
    //Kollar så att det är rätt content type
    $error=[
        "message"=>"only JSON works."
    ];
    sendJSON($error,400);
}

$data=getFileContents("php://input");

$oldPassword=$data["oldPassword"];
$newPassword=$data["newPassword"];
$selectedProfilePicture=$data["profilePic"];
$userName=$data["userName"];
//Hämtar informationen från requesten. 

if (!isset($selectedProfilePicture)) {
    //Om man inte har valt en profilbild
    $error=[
        "message"=>"You have not chosen a profile picture!"
    ];
}

$users=getFileContents($filename);
//Hämtar all information från json filen. 


if ($newPassword=="" or $oldPassword=="") {
    //Kollar så att fälten är ifyllda
    $error=[
        "message"=>"Empty values"
    ];
    sendJSON($error,400);
}elseif (strlen($newPassword)<3) {
    //Kollar så att man inte skrivit i ett för kort lösenord. 
    $error=[
        "message"=>"New password needs to be atleast 3 characters"
    ];
    sendJSON($error,400);
}else{
        if ($oldPassword==$newPassword) {
            //Kollar så att det nya lösenordet inte är samma som det gamla.
           $error=[
            "message"=>"Your new password can NOT be the same as your old password"
           ];
           sendJSON($error,400);
        }
}


foreach ($users as $index=> $user) {
    if ($userName==$user["username"]) {
        if ($oldPassword==$user["password"]) {
            //Här går vi igenom alla andvändares lösenord och hittar rätt andvändare med hjälp av det gamla lösenordet. 
            $users[$index]["password"]=$newPassword;
            //När vi hittat rätt andvändare så bytar vi ut det nya mot det gamla. 
            $users[$index]["profilepicture"]=$selectedProfilePicture;
            //Vi bytar ut den selecterade profilbilden mot den gamla. 
            $response=[
                "newPassword"=>$newPassword,
                "message"=>"Profile updated succesfully!"
            ];
            saveToFile($filename,$users);
            sendJSON($response);
            break;

    }else{
        $error=[
            "message"=>"Incorrect old password!"
        ];
        sendJSON($error,401);
        }
    }
}




?>