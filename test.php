<?php
$strJson = file_get_contents("all_user.json");
$v=rtrim(trim($strJson), ',');

$v=$v."]";

file_put_contents("all.json",$v,FILE_APPEND);
//Decode the JSON and convert it into an associative array.
$jsonDecoded = json_decode($v, true);


$str = file_get_contents("https://check.torproject.org/cgi-bin/TorBulkExitList.py?ip=1.1.1.1");
preg_match_all('/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/', $str, $ip_matches);

//Give our CSV file a name.
for($i=0; $i<count($jsonDecoded);$i++)
{
	if(($jsonDecoded[$i]["Hardware"]["Ip_may"] === $jsonDecoded[$i]["ExternalScript"]["Webrtc"]["Publicip"]) && $jsonDecoded[$i]["Hardware"]["Mobile"]["Check"])
  { $jsonencoded=json_encode($jsonDecoded[$i], true);
		JSON_create("Mobile.json",$jsonencoded);
   $mob++;
  }

  else if(($jsonDecoded[$i]["Hardware"]["Ip_may"] === $jsonDecoded[$i]["ExternalScript"]["Webrtc"]["Publicip"]))
  {
$des++;
$jsonencoded=json_encode($jsonDecoded[$i], true);
JSON_create("Desktop.json",$jsonencoded);
  }
  else if(($jsonDecoded[$i]["Hardware"]["Ip_may"] !== $jsonDecoded[$i]["ExternalScript"]["Webrtc"]["Publicip"]))
  {$jsonencoded=json_encode($jsonDecoded[$i], true);
		JSON_create("Proxy_VPN.json",$jsonencoded);
  $vpn++;}

  else if(($jsonDecoded[$i]["Hardware"]["Ip_may"] !== $jsonDecoded[$i]["ExternalScript"]["Webrtc"]["Publicip"]))
{
  for($j=0;$j<count($ip_matches[0]);$j++)
  {  if(($jsonDecoded[$i]["Hardware"]["Ip_may"]==$ip_matches[0][$i]))
         { $jsonencoded=json_encode($jsonDecoded[$i], true);
					 JSON_create("Tor-user-visit.json",$jsonencoded);
         $tor++;
			 }
}
}
}
function JSON_create($fn,$jsonen){

	if(!file_exists($fn))

	{  file_put_contents($fn,"[".PHP_EOL,FILE_APPEND);}

	file_put_contents($fn,$jsonen.",".PHP_EOL,FILE_APPEND);
}

?>
