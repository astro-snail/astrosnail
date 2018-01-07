<?php
ini_set('user_agent','astro-snail');

error_reporting(E_ALL);
ini_set('display_errors', 1);

$data = json_decode(file_get_contents('php://input'), true);
print_r($data);

$url = $data["repository"]["url"];
echo $url, PHP_EOL;

$clone_url = $data["repository"]["clone_url"];
echo $clone_url, PHP_EOL;

$contents_url = strstr($data["repository"]["contents_url"],"{", true);
$contents_url = substr($contents_url, 0, strlen($contents_url)-1);
echo $contents_url, PHP_EOL;

$contents = json_decode(file_get_contents($contents_url), true);
print_r($contents);

exec('php copy-files.php "' . addslashes($contents_url) . '"', $output);
print_r($output);

?>