<?php
include '../functions.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json; charset=utf-8");

if (strpos($stableImage->data, ".png") === false && strpos($stableImage->thumbnail, ".thumb.jpg") === false) {
	$thumb_file = $path . '../../../wallpaper/thumbnails/' . $_POST["id"] . '.thumb.jpg';
	base64_to_disk($_POST["thumbnail"], $thumb_file);

	$image_file = $path . '../../../wallpaper/' . $_POST["id"] . '.jpg';
	base64_to_disk($_POST["data"], $image_file);

	$original_file = $path . '../../../wallpaper/original/' . $_POST["id"] . '.original.png';
	base64_to_disk($_POST["original"], $original_file);

	$stableImage = (object)$_POST;
	$stableImage->data = $path . './wallpaper/' . $_POST["id"] . '.jpg';
	$stableImage->thumbnail = $path . './wallpaper/thumbnails/' . $_POST["id"] . '.thumb.jpg';
	$stableImage->original = $path . './wallpaper/original/' . $_POST["id"] . '.original.png';
}

$sql = "REPLACE INTO wallpaper(id, data, thumbnail, original, name, createdAt, width, height, tags, positivePrompt, negativePrompt, steps, sampler, cfg, seed, model) VALUES(" .
	"{$stableImage->id}, " .
	"\"{$stableImage->data}\", " .
	"\"{$stableImage->thumbnail}\", " .
	"\"{$stableImage->original}\", " .
	"\"{$stableImage->name}\", " .
	"\"{$stableImage->createdAt}\", " .
	"{$stableImage->width}, " .
	"{$stableImage->height}, " .
	"\"{$stableImage->tags}\", " .
	"\"{$stableImage->positivePrompt}\", " .
	"\"{$stableImage->negativePrompt}\", " .
	"{$stableImage->steps}, " .
	"\"{$stableImage->sampler}\", " .
	"{$stableImage->cfg}, " .
	"{$stableImage->seed}, " .
	"\"{$stableImage->model}\"" .
	")";

sqlExecute($sql);

$tagsArray = explode(",", $stableImage->tags);
$tagsArray = array_filter($tagsArray, 'strlen'); // This removes empty strings
$stableImage->tags = array_values($tagsArray); // Reset array keys if needed

echo json_encode($stableImage, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
