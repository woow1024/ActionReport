<?php
	/*******登陆检查******/
	session_start();
	include "LoginBase.php";
	$loginMgr = LoginMgr::GetInstance();
	$loginMgr->Dologin();
?>