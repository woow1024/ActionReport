<?php
/*****************************
*数据库连接
*****************************/

#初始化数据库
function mysql_init(){
	$host = "127.0.0.1:3306";
	$user = "root";
	$pwd = "root";
	$database = "yskj";
	$mysql_conn = @mysql_connect($host, $user, $pwd);
	if (!$mysql_conn){
		die("数据库初始化失败: " . mysql_error());
	}
	mysql_select_db($database, $mysql_conn);
	mysql_query("set character set 'utf-8'");
	mysql_query("set names 'utf-8'");
}

mysql_init();

?>