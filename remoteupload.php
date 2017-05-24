<?php

$data = json_decode(file_get_contents('php://input'), true);
print_r($data);

$clone_url = $data["repository"]["clone_url"];
echo $clone_url, PHP_EOL;

$contents_url = strstr($data["repository"]["contents_url"],"{", true);
echo $contents_url, PHP_EOL;

$contents = json_decode(file_get_contents($contents_url), true);
print_r($contents);



/*// maximum execution time in seconds
set_time_limit (24 * 60 * 60);

// folder to save downloaded files to. must end with slash
$destination_folder = 'files/';

$url = $_POST['url'];
$newfname = $destination_folder . basename($url);

$file = fopen ($url, "rb");
if ($file) {
  $newf = fopen ($newfname, "wb");

  if ($newf)
  while(!feof($file)) {
    fwrite($newf, fread($file, 1024 * 8 ), 1024 * 8 );
  }
}

if ($file) {
  fclose($file);
}

if ($newf) {
  fclose($newf);
}*/

?>
