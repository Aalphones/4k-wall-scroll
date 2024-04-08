<?php
include '../functions.php';

// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

if (isset($_GET['figureId'])) {
	$sql = "SELECT * FROM link, figure_link WHERE link.id=figure_link.linkId AND figure_link.figureId=" . $_GET['figureId'] . "";
}

if (isset($_GET['personId'])) {
	$sql = "SELECT * FROM link, person_link WHERE link.id=person_link.linkId AND person_link.personId=" . $_GET['personId'] . "";
}

if (isset($_GET['franchiseId'])) {
	$sql = "SELECT * FROM link, franchise_link WHERE link.id=franchise_link.linkId AND franchise_link.franchiseId=" . $_GET['franchiseId'] . "";
}

$result = sqlSelect($sql);
$toret = array();

foreach ($result as $row) {
	$toret[] = (object)$row;
}

echo json_encode($toret, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
