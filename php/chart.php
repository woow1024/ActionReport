<?php
	function DoSearch(){
		$time = $_POST['time'];
		
		include "mysql.php";
		if(null == $time)
			$sql = "select  count(user) as num , TIME_FORMAT(on_time,'%H:00:00') as time from t_online_time group by  TIME_FORMAT(on_time,'%H:00:00')";
		else
			$sql = "select  count(user) as num , TIME_FORMAT(on_time,'%H:00:00') as time from t_online_time where date > '$time' group by  TIME_FORMAT(on_time,'%H:00:00')";
		//echo($sql);
		$result = Mysql::GetInstance()->Query($sql);
		#$result = mysql_query($sql);
		if($result){
			$num_rows = mysql_num_rows($result);
			
			if($num_rows > 0)
			{
				#echo($num_rows);
				$rlist = array(array());
				$i = 0;
				while ($row=mysql_fetch_array($result))
				{
					$rlist[$i]["num"] 	= $row['num'];
					$rlist[$i]["time"]  = $row['time'];	
					#echo($row['time']);
					$i++;
				}
				echo json_encode($rlist);
			}
			
		}
		else{
			#echo(mysql_errno());
		}
	}
	#include "sessioncheck.php";
	DoSearch();
?>