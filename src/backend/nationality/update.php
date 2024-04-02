<?php
include '../functions.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json; charset=utf-8");

$data = (object)$_POST;

$sql = "REPLACE INTO nationality(id, name) VALUES(" .
	"{$data->id}, " .
	"\"{$data->name}\"" .
	")";

sqlExecute($sql);

if (isset($data->preview)) {
	$thumb_file = $path . '../../../media/flags/preview/' . $data->id . '.jpg';
	base64_to_disk($data->preview, $thumb_file);
}

if (isset($data->image)) {
	$image_file = $path . '../../../media/flags/' . $data->id . '.jpg';
	base64_to_disk($data->image, $image_file);
}

$success = ['message' => 'Erfolgreich', 'id' => $_POST["id"]];
echo json_encode($success);
