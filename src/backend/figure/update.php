<?php
include '../functions.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json; charset=utf-8");

$data = (object)$_POST;

$sql = "REPLACE INTO figure(id, description, title, type, eye, hair, gender, franchise, firstSeen, firstSeenYear) VALUES(" .
	"{$data->id}, " .
	"\"{$data->description}\", " .
	"\"{$data->title}\", " .
	"\"{$data->type}\", " .
	"\"{$data->eye}\", " .
	"\"{$data->hair}\", " .
	"\"{$data->gender}\", " .
	"\"{$data->franchise}\", " .
	"\"{$data->firstSeen}\", " .
	"\"{$data->firstSeenYear}\"" .
	")";

sqlExecute($sql);

if (isset($data->preview)) {
	$preview_file = $path . '../../../media/figure/preview/' . $data->id . '.jpg';
	base64_to_disk($data->preview, $preview_file);
}

if (isset($data->image)) {
	$image_file = $path . '../../../media/figure/' . $data->id . '.jpg';
	base64_to_disk($data->image, $image_file);
}

$success = ['message' => 'Erfolgreich', 'id' => $_POST["id"]];
echo json_encode($success);
