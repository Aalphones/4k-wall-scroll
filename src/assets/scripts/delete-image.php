<?php
include './functions.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json; charset=utf-8");

$sql = "DELETE FROM wallpaper WHERE id='" . $_POST["id"] . "'";
sqlExecute($sql);

$thumb_file = $path . '../../thumbnails/' . $_POST["id"] . '.thumb.png';
if (file_exists($image_file)) {
    unlink($thumb_file);
}

$image_file = $path . '../../images/' . $_POST["id"] . '.png';
if (file_exists($image_file)) {
    unlink($image_file);
}

$success = ['message' => 'Erfolgreich', 'id' => $_POST["id"]];
echo json_encode($success);
