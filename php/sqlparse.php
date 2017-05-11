<?php
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
?>