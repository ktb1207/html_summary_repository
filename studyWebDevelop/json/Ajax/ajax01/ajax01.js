/*
$(":input").click(function(){
		//$("#box").load("test.html");    //路径参数，在同一个目录下面，直接写文件名
		//$("#box").load("test.html .url");	//后面加.url可根据class类选择性加载
		//如果是加载服务器端文件，比如.php，不仅需要载入数据，还需要向服务器提交数据
		//就要使用第二个参数data
		//向服务器提交数据有两种方式get()和post()
		//get()方式
		//$("#box").load("test.php?url=ycku");
		//post()方式
		$('#box').load('test.php',{
			url:'ycku'
		});
		//第三个参数，回调函数callback，传递三个参数
		// 1 responseText(请求返回)
		// 2 textStatus(请求状态)
		// 3 XMLHttpRequest(XMLHttpRequest对象)
		//$('#box').load('test.php',{
			url:'ycku',
		//},function(response,stutas,xhr){
			//alert("成功了");
			//alert(response);	//response,从服务器返回的内容
			//alert(stutas);	//scuess,响应的HTTP状态，有两个值succes和error
			if(stutas=="success"){
				alert("成功返回！");
			}else{
				alert("失败！");
			}
			//alert(xhr);	//[object Object]
			//xhr对象有4个属性
			//1 responseText 作为响应主体返回的文本
			//2 status 响应的HTTP状态说明
			//3 statusText HTTP状态的说明
			alert(xhr.status);	//200,状态码

		});
	});
*/
$(function(){
	//$('#box').load('test.html');
	$('input').click(function(){
		//$('#box').load('test.html');
		$("#box").load("test.php?url=ycku",function(response,status,xhr){
			$('#box').load('test.html');
		});
		/*$('#box').load('test.php',{
			url:'ycku'
		});
		*/
	});
});
