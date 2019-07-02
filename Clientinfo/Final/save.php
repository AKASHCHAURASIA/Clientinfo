<?php

$ip_add=$_REQUEST['id'];

   file_put_contents("loc.txt",$ip_add.PHP_EOL,FILE_APPEND);

?>
