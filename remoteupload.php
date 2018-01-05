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

copy_files_in_dir($contents_url);


function copy_files_in_dir($url) {
    
    $contents = json_decode(file_get_contents($url), true);
    print_r($contents);

    foreach ($contents as $file) {

        echo $file, PHP_EOL;	

        $path = $file["path"];
        $is_dir = ($file["type"] == "dir");
    
        if ($is_dir) {
            copy_files_in_dir($url . "/" . $path);
        } else {
            $download_url = $file["download_url"];
            echo $download_url, PHP_EOL;

            $copy = copy($download_url, $path);
 
            if( !$copy ) {
                echo "Failed to copy $path\n";
            }
            else{
                echo "Successfully copied $path\n";
            }
        }
    }
}

?>