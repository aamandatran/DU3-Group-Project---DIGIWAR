<?php
ini_set('display_errors', 1);
require_once("functions.php");

$filename="users.json";
$method=$_SERVER["REQUEST_METHOD"];
$contentType=$_SERVER["CONTENT_TYPE"];

if ($method!=="PATCH") {
    $error=[
        "message"=>"Only PATCH works."
    ];
    sendJSON($error,400);
}
if ($contentType!=="application/json") {
    $error=[
        "message"=>"only JSON works."
    ];
    sendJSON($error,400);
}

$dataJSON= file_get_contents("php://input");
$data=json_decode($dataJSON,true);

$oldPassword=$data["oldPassword"];
$newPassword=$data["newPassword"];

$usersJSON=file_get_contents($filename);
$users=json_decode($usersJSON,true);

foreach ($users as $user) {
  if ($oldPassword===$user["password"]) {
    $user["password"]=$newPassword;
    break;
  }
}

saveToFile($filename,$users);

$response=[
    "message"=>"password updated succesfully!"
];
sendJSON($response)
?>