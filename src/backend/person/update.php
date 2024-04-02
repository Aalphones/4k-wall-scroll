<?php
include '../functions.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json; charset=utf-8");

$data = (object)$_POST;

$sql = "REPLACE INTO person(id, title, description, profession, race, eye, hair, gender, birthplace, birthday, nationality, height) VALUES(" .
	"{$data->id}, " .
	"\"{$data->title}\", " .
	"\"{$data->description}\", " .
	"\"{$data->profession}\", " .
	"\"{$data->race}\", " .
	"\"{$data->eye}\", " .
	"\"{$data->hair}\", " .
	"\"{$data->gender}\", " .
	"\"{$data->birthplace}\", " .
	"\"{$data->birthday}\", " .
	"\"{$data->nationality}\", " .
	"\"{$data->height}\"" .
	")";

sqlExecute($sql);

if (isset($data->preview)) {
	$preview_file = $path . '../../../media/person/preview/' . $data->id . '.jpg';
	base64_to_disk($data->preview, $preview_file);
}

if (isset($data->image)) {
	$image_file = $path . '../../../media/person/' . $data->id . '.jpg';
	base64_to_disk($data->image, $image_file);
}

$success = ['message' => 'Erfolgreich', 'id' => $_POST["id"]];
echo json_encode($success);
