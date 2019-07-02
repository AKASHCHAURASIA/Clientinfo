<?php

$ip_add=$_REQUEST['id'];
   if(!file_exists('all_user.json'))

   {  file_put_contents("all_user.json","[".PHP_EOL,FILE_APPEND);}

   file_put_contents("all_user.json",$ip_add.",".PHP_EOL,FILE_APPEND);
   
	   
?>
<html>
<div> Hi this is a HoneyPot :)</div>
</html>
