<?php
include '../functions.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json; charset=utf-8");

$data = (object)$_POST;

$sql = "REPLACE INTO franchise(id, parentId, description, title) VALUES(" .
	"{$data->id}, " .
	"\"{$data->parentId}\", " .
	"\"{$data->description}\", " .
	"\"{$data->title}\"" .
	")";

sqlExecute($sql);

$success = ['message' => 'Erfolgreich', 'id' => $_POST["id"]];
echo json_encode($success);
