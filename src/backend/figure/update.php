<?php
include '../functions.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json; charset=utf-8");

$data = (object)$_POST;

$sql = "REPLACE INTO figure(id, description, title, type, eye, hair, gender) VALUES(" .
	"{$data->id}, " .
	"\"{$data->description}\", " .
	"\"{$data->title}\", " .
	"\"{$data->type}\", " .
	"\"{$data->eye}\", " .
	"\"{$data->hair}\", " .
	"\"{$data->gender}\"" .
	")";

sqlExecute($sql);

$success = ['message' => 'Erfolgreich', 'id' => $_POST["id"]];
echo json_encode($success);
