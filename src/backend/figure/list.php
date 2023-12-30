<?php
include '../functions.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json; charset=utf-8");

$sql = "SELECT * FROM figure";

$result = sqlSelect($sql);
$figures = array();

foreach ($result as $row) {
	$figure = (object)$row;
	$figures[] = $figure;
}

echo json_encode($figures, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
