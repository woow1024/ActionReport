<?php
	function DoSearch(){
		$user = $_POST['user'];
		$time = $_POST['time'];
		
		//echo($user);
		//echo($time);
		//include "sqlparse.php";
		include "mysql.php";
		
		if(0 == $user){
			$sql = "select * from t_action_account where ";
			$sql .= "action_date > '$time'";
			//echo($sql);
		}
		else{
			$sql = "select * from t_action_account_guest where ";
			$sql .= "action_date > '$time'";
			//echo($sql);
		}
		//echo($sql);
		$result = Mysql::GetInstance()->Query($sql);
		#$result = mysql_query($sql);
		if($result){
			$num_rows = mysql_num_rows($result);
			
			if($num_rows > 0)
			{
				//echo("sss");
				//echo($num_rows);
				$rlist = array(array());
				$i = 0;
				while ($row=mysql_fetch_array($result))
				{
					$rlist[$i]["action_date"] 	= $row['action_date'];
					$rlist[$i]["jd_num"]  		= $row['jd_num'];	
					$rlist[$i]["yg_num"] 		= $row['yg_num'];	
					$rlist[$i]["tt_num"] 		= $row['tt_num'];	
					$rlist[$i]["dxgjs_num"] 	= $row['dxgjs_num'];	
					$i++;
				}
				echo json_encode($rlist);
			}
			//echo("22222");
		}
		else{
			//echo("33333");
			echo(mysql_errno());
		}
	}
	#include "sessioncheck.php";
	DoSearch();
?>