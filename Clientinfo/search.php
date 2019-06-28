<?php

$ip_add=$_REQUEST['id'];

   file_put_contents("test.json",$ip_add.PHP_EOL,FILE_APPEND);

?>
