<?php
include '../functions.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json; charset=utf-8");

$sql = "SELECT * FROM nationality";

$result = sqlSelect($sql);
$toRet = array();

foreach ($result as $row) {
	$nationality = (object)$row;
	$toRet[] = $nationality;
}

echo json_encode($toRet, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
