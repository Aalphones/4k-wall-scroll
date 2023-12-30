<?php
include '../functions.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json; charset=utf-8");

$sql = "SELECT * FROM person";

$result = sqlSelect($sql);
$persons = array();

foreach ($result as $row) {
	$person = (object)$row;
	$persons[] = $person;
}

echo json_encode($persons, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
