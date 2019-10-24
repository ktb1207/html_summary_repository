
<?php
 header("Content-type: text/html; charset=utf-8"); 
mysql_connect("127.0.0.1","root","root");
mysql_select_db("test");
mysql_query("set names utf8");

if($_GET['type']==='get'){
	$sql = "select name,tel,sex from user";
	$tmp = mysql_query($sql);
	while($res = mysql_fetch_assoc($tmp)){
	      $arr[] = $res;
	}
	echo json_encode($arr);

}elseif($_GET['type']==='set'){
	if(empty($_POST)){
		exit('post=null');
	}
	$sql = "insert into user(name,tel,sex) values('".$_POST['name']."', ".intval($_POST['tel']).",'".$_POST['sex']."')";
	if(mysql_query($sql)){
	
		echo json_encode('ok');
	}else{
		echo json_encode('error');
	}
}




?>
