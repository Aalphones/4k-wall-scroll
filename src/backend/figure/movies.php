<?php
include '../functions.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json; charset=utf-8");

$figureId = isset($_GET['figureId']) ? $_GET['figureId'] : 0;

$sql = "SELECT * FROM movie, figure_movie WHERE figure_movie.movieId=movie.id AND figure_movie.figureId=" . $figureId;

$result = sqlSelect($sql);
$movies = array();

foreach ($result as $row) {
	$movie = (object)$row;
	$movies[] = $movie;
}

echo json_encode($movies, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
