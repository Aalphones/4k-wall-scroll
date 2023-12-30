<?php
include '../functions.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json; charset=utf-8");

$personId = isset($_GET['personId']) ? $_GET['personId'] : 0;

$sql = "SELECT figure.id, figure.updatedAt, figure.description, figure.title, figure.type, figure.eye, figure.hair, figure.gender FROM figure, person_figure WHERE person_figure.figureId=figure.id AND person_figure.personId=" . $personId;

$result = sqlSelect($sql);
$figures = array();

foreach ($result as $row) {
	$figure = (object)$row;
	$figures[] = $figure;
}

echo json_encode($figures, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
