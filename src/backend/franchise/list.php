<?php
include '../functions.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json; charset=utf-8");

$sql = "SELECT * FROM franchise";

$result = sqlSelect($sql);
$franchises = array();

foreach ($result as $row) {
	$franchise = (object)$row;
	$franchises[] = $franchise;
}

echo json_encode($franchises, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
