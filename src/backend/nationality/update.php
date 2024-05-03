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

// Check if JSON decoding was successful
if ($data === null) {
	// If decoding fails, return an error response
	http_response_code(400);
	echo json_encode(array("error" => "Invalid JSON data"));
	exit;
}

$sql = "REPLACE INTO nationality(id, name) VALUES(" .
	"{$data->id}, " .
	"\"{$data->name}\"" .
	")";

sqlExecute($sql);

if (isset($data->preview)) {
	$thumb_file = $path . '../../media/flags/preview/' . $data->id . '.jpg';
	base64_to_disk($data->preview, $thumb_file);
}

if (isset($data->image)) {
	$image_file = $path . '../../media/flags/' . $data->id . '.jpg';
	base64_to_disk($data->image, $image_file);
}

$success = ['message' => 'Erfolgreich', 'id' => $_POST["id"]];
echo json_encode($success);
