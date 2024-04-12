<?php
include '../functions.php';

header("Content-Type:application/json; charset=utf-8");
// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: DELETE");
	header("Access-Control-Allow-Headers: Content-Type");
	exit;
}

$sql = "DELETE FROM person_figure WHERE personId = " .
	"\"{$_GET['personId']}\" AND figureId = " .
	"\"{$_GET['figureId']}\"";

sqlExecute($sql);

$success = ['message' => 'Erfolgreich', 'id' => $_GET['personId']];
echo json_encode($success);
