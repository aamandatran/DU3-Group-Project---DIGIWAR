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
    sendJSON($error,400);
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
$profilePicture=$data["profilepicture"];
//Hämtar informationen från requesten. 

$users=getFileContents($filename);
//Hämtar all information från json filen. 

if ($newPassword==="" or $oldPassword==="") {
    //Kollar så att fälten är ifyllda
    $error=[
        "message"=>"Empty values"
    ];
    sendJSON($error,400);
}elseif (strlen($newPassword<3)) {
    //Kollar så att man inte skrivit i ett för kort lösenord. 
    $error=[
        "message"=>"New password needs to be atleast 3 characters"
    ];
    sendJSON($error,400);
}else{
    foreach($users as $user){
        if ($user["password"]===$newPassword) {
            //Går igenom alla andvändarses lösenord för att kontrollera så att man inte tar ett befintligt lösenord. 
           $error=[
            "message"=>"Password is already taken"
           ];
           sendJSON($error,409);
        }
    }
}

foreach ($users as $user) {
  if ($oldPassword===$user["password"]) {
    //Här går vi igenom alla andvändares lösenord och hittar rätt andvändar med hjälp av det gamla lösenordet. 
    $user["password"]=$newPassword;
    //När vi hittat rätt andvändare så bytar vi ut det nya mot det gamla. 
    $user["profilePicture"]=$profilePicture;
    //Vi bytar ut den selecterade profilbilden mot den gamla. 
    break;
  }
}

saveToFile($filename,$users);

$response=[
    "message"=>"Profile updated succesfully!"
];
sendJSON($response)
?>