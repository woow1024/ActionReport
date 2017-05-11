<?php
	include "LoginBase.php";
	$loginMgr = LoginMgr::GetInstance();
	if(false == $loginMgr->IsLogin())
	{
		header('Location: ./main.html');

	}
	else
	{
		header('Location: ./Login.html');
	}
?>