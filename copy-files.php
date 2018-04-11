<?php

$url = stripslashes($argv[1]);
copy_files_in_dir($url);


function copy_files_in_dir($url) {
    
    $contents = json_decode(file_get_contents($url), true);
    //print_r($contents);

    foreach ($contents as $file) {

        //echo $file, PHP_EOL;	

        $path = $file["path"];
        $is_dir = ($file["type"] == "dir");
    
        if ($is_dir) {
            copy_files_in_dir($url . "/" . $path);
        } else {
            $download_url = $file["download_url"];
            //echo $download_url, PHP_EOL;

            $copy = copy($download_url, $path);
 
            if( !$copy ) {
                //echo "Failed to copy $path\n";
            }
            else{
                //echo "Successfully copied $path\n";
            }
        }
    }
}

?>