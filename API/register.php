<?php
ini_set("display_errors", 1);
require_once("functions.php");

$filename = "users.json";
$method = $_SERVER["REQUEST_METHOD"];

if($method == "GET") {
    
}
if($method == "POST") {

    if(!file_exists($filename)) {
        file_put_contents($filename, "{}");
    }

    $data

}
?>