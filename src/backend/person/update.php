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

// Now you can access the data as $data->id, $data->title, etc.
$sql = "REPLACE INTO person(id, title, description, profession, eye, hair, gender, birthplace, birthday, death, nationality, height) VALUES(" .
	$data->id . "," .
	"\"" . $data->title . "\", " .
	"\"" . $data->description . "\", " .
	"\"" . $data->profession . "\", " .
	"\"" . $data->eye . "\", " .
	"\"" . $data->hair . "\", " .
	"\"" . $data->gender . "\", " .
	"\"" . $data->birthplace . "\", " .
	"\"" . $data->birthday . "\", " .
	($data->death !== null ? "\"" . $data->death . "\"" : "NULL") . ", " .
	(isset($data->nationality) ? "\"" . $data->nationality . "\"" : "NULL") . ", " .
	"\"" . $data->height . "\"" .
	")";

sqlExecute($sql);

if (isset($data->preview)) {
	$preview_file = $path . '../../media/person/preview/' . $data->id . '.jpg';
	base64_to_disk($data->preview, $preview_file);
}

if (isset($data->image)) {
	$image_file = $path . '../../media/person/' . $data->id . '.jpg';
	base64_to_disk($data->image, $image_file);
}

$sql = "SELECT 
person.id, 
person.updatedAt, 
person.description, 
person.title, 
person.profession, 
person.eye,
person.hair,
person.gender,
person.birthplace,
person.birthday,
person.death,
person.nationality AS nationality_id,
nationality.name AS nationality_name,
person.height,
person_figure.personId,
person_figure.figureId,
figure.title AS figure_title,
person_figure.description AS figure_description
FROM 
person
LEFT JOIN 
person_figure ON person.id = person_figure.personId
LEFT JOIN 
figure ON person_figure.figureId = figure.id
LEFT JOIN 
nationality ON person.nationality = nationality.id
WHERE person.id = \"" . $data->id . "\"";

$result = sqlSelect($sql);
$persons = array();

foreach ($result as $row) {
	$person_id = $row['id'];
	$person = array(
		'id' => $person_id,
		'updatedAt' => $row['updatedAt'],
		'description' => $row['description'],
		'title' => $row['title'],
		'profession' => $row['profession'],
		'eye' => $row['eye'],
		'hair' => $row['hair'],
		'gender' => $row['gender'],
		'birthday' => $row['birthday'],
		'birthplace' => $row['birthplace'],
		'death' => $row['death'],
		'nationality' => array(
			'id' => $row['nationality_id'],
			'name' => $row['nationality_name']
		),
		'height' => $row['height'],
		'figures' => array()
	);

	// Add figure data if exists
	if ($row['figureId']) {
		$figure = array(
			'figureId' => $row['figureId'],
			'title' => $row['figure_title'],
			'description' => $row['figure_description']
		);
		$person['figures'][] = $figure;
	}

	// Add or update person in persons array
	if (!isset($persons[$person_id])) {
		$persons[$person_id] = $person;
	} else {
		// If person already exists, add figure data to the existing person
		$persons[$person_id]['figures'] = array_merge($persons[$person_id]['figures'], $person['figures']);
	}
}

echo json_encode($persons[$data->id], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
