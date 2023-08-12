<?php
include './functions.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json; charset=utf-8");

$date = isset($_GET['updatedAt']) ? $_GET['updatedAt'] : null;

if ($date !== null) {
	$sql = "SELECT  * FROM wallpaper WHERE updatedAt >= '" . $date . "' ORDER BY id";
} else {
	$sql = "SELECT * FROM wallpaper";
}

$result = sqlSelect($sql);
$stableImages = array();

foreach ($result as $row) {
	$stableImage = (object)$row;
	$tagsArray = explode(",", $stableImage->tags);
	$tagsArray = array_filter($tagsArray, 'strlen'); // This removes empty strings
	$stableImage->tags = array_values($tagsArray); // Reset array keys if needed
	$stableImages[] = $stableImage;
}

echo json_encode($stableImages, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
