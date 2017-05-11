<?php
/*****************************
*数据库连接
*****************************/

#初始化数据库
class Mysql{
	
			
	private static $_instance = NULL;
	private $conn = NULL;
	
	private function __construct(){
			$this->connect();
	}
	private function __clone(){
		
	}
	
	private function connect(){
		$mysql_conf = array("host"=>"127.0.0.1:3306",
					"user"=> "root",
					"pwd" =>"root",
					"database" => "test"
			);
		$this->conn = @mysql_connect($mysql_conf['host'], $mysql_conf['user'], $mysql_conf['pwd']);
		mysql_select_db($mysql_conf['database'], $this->conn);
		mysql_query("set character set 'utf-8'", $this->conn);
		mysql_query("set names 'utf-8'", $this->conn);
	}
	
	
	public function close(){
		mysql_close($conn);
	}
	
	public static function GetInstance(){
		if(is_null(self::$_instance))
		{
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	public function Query($sql){
		$result = mysql_query($sql, $this->conn);
		return $result;
	}
}

?>