<?php
/*******登陆管理类******/
class LoginMgr{
	private static $_instance = NULL;
	private function __construct(){
		
	}
	private function __clone(){
		
	}
	
	static public function GetInstance(){
		if(is_null(self::$_instance))
		{
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	public function Dologin(){
			
			if($this->IsLogin()){
				//echo ("{'result' : 已经登陆}");
				header('Location: ../main.html');
				return;
			}
			else{
					if(!isset($_POST['username']) || !isset($_POST['password'])){
						//echo ("{'result' : empty}");
						//return;
						header('Location: ../Login.html');
					}
					else
					{
						$username = htmlspecialchars($_POST['username']);
						$password = ($_POST['password']);
						
						include('./mysql_conn.php');
						$check_result = mysql_query("select * from user where username ='$username' and password = MD5('$password') limit 1");
						echo("select * from user where username ='$username' and password = MD5('$password') limit 1");
						if($check_result){
							$value = mysql_fetch_array($check_result);
							echo("checkvalue");
							if($value){
								$_SESSION['username'] = $username;
								$_SESSION['password'] = $password;
								/*"<%=basePath%>\sub\submit.jsp"*/
								header('Location: ../main.html');
								//echo ("{'result' : 0}");
								return;
							}
						}
						header('Location: ../Login.html');
						//echo ("{'result' : 1}");
						#alert("用户名或密码不正确！");
					}
				
			}
			/*
			if(!isset($_POST['submit'])){
				#die("非法访问!");
			}
			*/
	}
	
	public function IsLogin(){
		if(isset($_SESSION['username']) && isset($_SESSION['password']))
			return true;
		else
			return false;
	}
	
	public function LoginOff(){
		#$_SESSION.empty();
	}
}

?>