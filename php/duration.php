<?php
	function DoSearch(){
		
		//echo("asdf");
		$dayInfo = $_POST['dayInfo'];
		$userInfo = $_POST['userInfo'];
		$ipInfo = $_POST['ipInfo'];
		$time = $_POST['time'];
		
		include "mysql.php";
		$sql = "select * from t_online_time where ";
		
		$bFlag = true;
		if(null != $dayInfo)
			ParseSql($bFlag, $sql, "date", $dayInfo, false);
		if(null != $userInfo)
			ParseSql($bFlag, $sql, "user", $userInfo, true);
		if(null != $ipInfo)
			ParseSql($bFlag, $sql, "ip", $ipInfo, true);
		
		if($bFlag)
			$sql .= " date > '$time'";
		else
			$sql .= " and date > '$time'";
		//echo($sql);
		
		$result = Mysql::GetInstance()->Query($sql);
		if($result){
			$num_rows = mysql_num_rows($result);
			
			if($num_rows > 0)
			{
				//echo($num_rows);
				$rlist = array(array());
				
				$i = 0;
				while ($row=mysql_fetch_array($result))
				{
					$rlist[$i]["date"] 		= $row['date'];
					$rlist[$i]["user"]  	= $row['user'];	
					$rlist[$i]["ip"] 		= $row['ip'];	
					$rlist[$i]["company"] 	= $row['company'];	
					$rlist[$i]["on_time"] 	= $row['on_time'];	
					$rlist[$i]["user"] 		= $row['user'];	
					$i++;
				}
				echo json_encode($rlist);
			}
			
			
		}
		else{
			echo(mysql_errno());
		}
	}
	
	function ParseSql(&$bFlag, &$sql, $field, &$value, $bISString){
		if (true == $bFlag){
			if ($bISString){
				$sql .= $field;
				$sql .= "=\"'$value'\"";
			}
			else{
				$sql .= $field;
				$sql .= '=';
				$sql .= $value;
			}
			$bFlag = false;
		}
		else{
			if ($bISString){
				$sql .= ' and ';
				$sql .= $field;
				$sql .= "=\"'$value'\"";
			}
			else{
				$sql .= ' and ';
				$sql .= $field;
				$sql .= '=';
				$sql .= $value;
			}
		}
	}
	
	DoSearch();
?>