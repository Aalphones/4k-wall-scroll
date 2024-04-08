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

$sql = "REPLACE INTO link(id, name, url, type) VALUES(" .
	"{$data->id}, " .
	"\"{$data->name}\", " .
	"\"{$data->url}\", " .
	"\"{$data->type}\"" .
	")";

sqlExecute($sql);

if (isset($data->franchiseId)) {
	$sql = "REPLACE INTO franchise_link(franchiseId, linkId) VALUES(" .
		"{$data->franchiseId}, " .
		"{$data->id}" .
		")";
}

if (isset($data->personId)) {
	$sql = "REPLACE INTO person_link(personId, linkId) VALUES(" .
		"{$data->personId}, " .
		"{$data->id}" .
		")";
}

if (isset($data->figureId)) {
	$sql = "REPLACE INTO figure_link(figureId, linkId) VALUES(" .
		"{$data->figureId}, " .
		"{$data->id}" .
		")";
}

$success = ['message' => 'Erfolgreich', 'id' => $_POST["id"]];
echo json_encode($success);
