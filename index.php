<?php

$host=$_SERVER['HTTP_HOST'];
$uri=$_SERVER['REQUEST_URI'];
$availables_routes=array("/", "/acerca", "/equipo", "/servicios");

if(in_array($uri, $availables_routes)){
	$cookie_value=$uri;
}else{
    $cookie_value="404";
}

if(count(explode("/", $uri)) > 2){
    header("Location: http://".$host."/404");
    exit();
}

setcookie('path', $cookie_value, time()+(86400 * 30), "/");
$index=file_get_contents('site.html');
echo $index;
