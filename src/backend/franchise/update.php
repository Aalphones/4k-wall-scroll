<?php
include '../functions.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json; charset=utf-8");

$data = (object)$_POST;

$sql = "REPLACE INTO franchise(id, parentId, description, title) VALUES(" .
	"{$data->id}, " .
	"\"{$data->parentId}\", " .
	"\"{$data->description}\", " .
	"\"{$data->title}\"" .
	")";

sqlExecute($sql);

if (isset($data->preview)) {
	$preview_file = $path . '../../../media/franchise/preview/' . $data->id . '.jpg';
	base64_to_disk($data->preview, $preview_file);
}

if (isset($data->cover)) {
	$cover_file = $path . '../../../media/franchise/cover/' . $data->id . '.jpg';
	base64_to_disk($data->cover, $cover_file);
}

if (isset($data->logo)) {
	$logo_file = $path . '../../../media/franchise/logo/' . $data->id . '.png';
	base64_to_disk($data->logo, $logo_file);
}

$success = ['message' => 'Erfolgreich', 'id' => $_POST["id"]];
echo json_encode($success);
