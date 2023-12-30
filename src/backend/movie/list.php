<?php
include '../functions.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json; charset=utf-8");

$sql = "SELECT * FROM movie";

$result = sqlSelect($sql);
$movies = array();

foreach ($result as $row) {
	$movie = (object)$row;
	$movies[] = $movie;
}

echo json_encode($movies, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
