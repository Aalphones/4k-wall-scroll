<?php
include '../functions.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json; charset=utf-8");

$data = (object)$_POST;

$sql = "REPLACE INTO person_figure(id, personId, figureId, description) VALUES(" .
	"{$data->id}, " .
	"\"{$data->personId}\", " .
	"\"{$data->figureId}\", " .
	"\"{$data->description}\"" .
	")";

sqlExecute($sql);

$success = ['message' => 'Erfolgreich', 'id' => $_POST["id"]];
echo json_encode($success);
