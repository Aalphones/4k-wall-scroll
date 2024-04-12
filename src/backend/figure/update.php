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
	$preview_file = $path . '../../media/figure/preview/' . $data->id . '.jpg';
	base64_to_disk($data->preview, $preview_file);
}

if (isset($data->image)) {
	$image_file = $path . '../../media/figure/' . $data->id . '.jpg';
	base64_to_disk($data->image, $image_file);
}

$sql = "SELECT 
figure.id, 
figure.updatedAt, 
figure.description, 
figure.title, 
figure.type, 
figure.eye, 
figure.hair, 
figure.gender, 
franchise.id AS franchise_id, 
franchise.title AS franchise_title, 
figure.firstSeen, 
figure.firstSeenYear,
person_figure.personId,
person_figure.figureId,
person.title AS person_title,
person_figure.description AS person_description
FROM 
figure
LEFT JOIN 
person_figure ON figure.id = person_figure.figureId
LEFT JOIN 
person ON person_figure.personId = person.id
LEFT JOIN 
franchise ON figure.franchise = franchise.id
WHERE figure.id = \"" . $data->id . "\"";

$result = sqlSelect($sql);
$figures = array();

foreach ($result as $row) {
	$figure_id = $row['id'];
	$figure = array(
		'id' => $figure_id,
		'updatedAt' => $row['updatedAt'],
		'description' => $row['description'],
		'title' => $row['title'],
		'type' => $row['type'],
		'eye' => $row['eye'],
		'hair' => $row['hair'],
		'gender' => $row['gender'],
		'franchise' => array(
			'id' => $row['franchise_id'],
			'title' => $row['franchise_title']
		),
		'firstSeen' => $row['firstSeen'],
		'firstSeenYear' => $row['firstSeenYear'],
		'persons' => array()
	);

	// Add person data if exists
	if ($row['personId']) {
		$person = array(
			'personId' => $row['personId'],
			'title' => $row['person_title'],
			'description' => $row['person_description']
		);
		$figure['persons'][] = $person;
	}

	// Add or update figure in figures array
	if (!isset($figures[$figure_id])) {
		$figures[$figure_id] = $figure;
	} else {
		// If figure already exists, add person data to the existing figure
		$figures[$figure_id]['persons'] = array_merge($figures[$figure_id]['persons'], $figure['persons']);
	}
}

echo json_encode($figures[$data->id], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
