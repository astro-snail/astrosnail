<?php

$data = json_decode(file_get_contents('php://input'), true);
print_r($data);

$url = $data["repository"]["url"];
echo $url, PHP_EOL;

$clone_url = $data["repository"]["clone_url"];
echo $clone_url, PHP_EOL;

$contents_url = strstr($data["repository"]["contents_url"],"{", true);
$contents_url = substr($contents_url, 0, strlen($contents_url)-1);
echo $contents_url, PHP_EOL;

exec('php copy-files.php "' . addslashes($contents_url) . '"', $output);
print_r($output);

?>