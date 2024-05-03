<?php
include '../functions.php';

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Allow-Headers: Content-Type");
	exit;
}

// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// Get the JSON data from the request body
$json_data = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($json_data);

$sql = "REPLACE INTO franchise(id, parentId, description, title) VALUES(" .
	"{$data->id}, " .
	"\"{$data->parentId}\", " .
	"\"{$data->description}\", " .
	"\"{$data->title}\"" .
	")";

sqlExecute($sql);

if (isset($data->preview)) {
	$preview_file = $path . '../../media/franchise/preview/' . $data->id . '.jpg';
	base64_to_disk($data->preview, $preview_file);
}

if (isset($data->image)) {
	$cover_file = $path . '../../media/franchise/cover/' . $data->id . '.jpg';
	base64_to_disk($data->image, $cover_file);
}

if (isset($data->logo)) {
	$logo_file = $path . '../../media/franchise/logo/' . $data->id . '.png';
	base64_to_disk($data->logo, $logo_file);
}

$success = ['message' => 'Erfolgreich', 'id' => $_POST["id"]];
echo json_encode($success);
