<?php
include '../functions.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json; charset=utf-8");

$sql = "SELECT 
person.id, 
person.updatedAt, 
person.description, 
person.title, 
person.profession, 
person.race,
person.eye,
person.hair,
person.gender,
person.birthplace,
person.birthday,
person.death,
person.nationality AS nationality_id,
nationality.name AS nationality_name,
person.height,
person_figure.id AS person_figure_id,
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
nationality ON person.nationality = nationality.id";

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
		'race' => $row['race'],
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
	if ($row['person_figure_id']) {
		$figure = array(
			'id' => $row['figureId'],
			'personId' => $row['personId'],
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

echo json_encode(array_values($persons), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
