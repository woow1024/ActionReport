<?php
/*****************************
*���ݿ�����
*****************************/

#��ʼ�����ݿ�
function mysql_init(){
	$host = "127.0.0.1:3306";
	$user = "root";
	$pwd = "root";
	$database = "yskj";
	$mysql_conn = @mysql_connect($host, $user, $pwd);
	if (!$mysql_conn){
		die("���ݿ��ʼ��ʧ��: " . mysql_error());
	}
	mysql_select_db($database, $mysql_conn);
	mysql_query("set character set 'utf-8'");
	mysql_query("set names 'utf-8'");
}

mysql_init();

?>