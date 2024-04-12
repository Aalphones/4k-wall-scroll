<?php
include '../functions.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json; charset=utf-8");

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

$sql = "REPLACE INTO person_figure(personId, figureId, description) VALUES(" .
	"\"{$data->personId}\", " .
	"\"{$data->figureId}\", " .
	"\"{$data->description}\"" .
	")";

sqlExecute($sql);

$sql = "SELECT 
figure.title AS figure_title, 
person.title AS person_title, 
person_figure.personId,
person_figure.figureId,
person_figure.description
FROM 
person_figure
LEFT JOIN 
figure ON figure.id = person_figure.figureId
LEFT JOIN 
person ON person_figure.personId = person.id
WHERE person.id = \"" . $data->personId . "\"
OR figure.id = \"" . $data->figureId . "\"";

$result = sqlSelect($sql);
$toRet = array();

foreach ($result as $row) {
	$info = (object)$row;
	$toRet[] = $info;
}

echo json_encode($toRet, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
