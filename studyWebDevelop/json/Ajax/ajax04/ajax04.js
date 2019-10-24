
/*
//Ajax全局事件.aiaxStart()和.ajaxStop()
$(document).ajaxStart(function(){
		$('.loading').show();
	}).ajaxStop(function(){
		$('.loading').hide();
	});
//异步请求错误处理
//$.ajax()错误处理方法
	$('form input[type=button]').click(function(){
		$.ajax({
			type:'POST',
			url:'http://www.adbdifs.com/user.php',
			data:$('form').serialize(),
			success:function(response,status,xhr){
				$('#box').html(response);
			},
			//timeout:1000,		//设置加载超时时间
			//global:false,		//可以设置某个$.ajax()不触发全局事件
			error:function(xhr,errorText,errorType){
				//alert("出错了...");
				//alert(errorText+":"+errorStatus);  //error:notfind
				//alert(xhr.status+":"+xhr.statusText);
			}
		});
	});
//$.get()和$.post()的错误处理方法
	$.post('user1.php').error(function(xhr,errorText,errorType){
			alert(errorText+":"+errorType);  //error:Not Found
			alert(xhr.status+":"+xhr.statusText);	//404:Not Found
	});
//全局错误事件
	$(document).ajaxError(function(event,xhr,setting,errorType){
		alert("cuowu");
	});
//全局事件
	$(document).ajaxSend(function(event,xhr,setting){
		alert('发送之前');			//1
	}).ajaxComplete(function(){
		alert('请求完成后，不管成功或者失败');		//3
	}).ajaxSuccess(function(){
		alert('请求成功后');		//2
	}).ajaxError(function(){
		alert('请求失败');			//2
	});
//$.post()和$.get()对应局部处理方法
$('form input[type=button]').click(function(){
		$.post('user.php',$('form').serialize(),function(response,status,xhr){
			$('#box').html(response);
		}).success(function(){
			alert('请求成功后');
		}).error(function(){
			alert('请求失败');	
		}).complete(function(){
			alert('请求完成后，不管成功或者失败');
		});
	});
//$.ajax()对应局部事件
$('form input[type=button]').click(function(){
		$.ajax({
			type:'POST',
			url:'user.php',
			data:$('form').serialize(),
			success:function(response,status,xhr){
				$('#box').html(response);
			},
			error:function(xhr,errorText,errorType){
				alert("出错了...");
			},
			beforeSend:function(){
				alert('发送之前');
			},
			success:function(){
				alert('请求成功后');
			},
			error:function(){
				alert('请求失败');
			},
			complete:function(){
				alert('请求完成后，不管成功或者失败');
			}

		});
	});
*/
$(function(){
	$('form input[type=button]').click(function(){
		$.ajax({
			type:'POST',
			url:'user1.php',
			data:$('form').serialize(),
			success:function(response,status,xhr){
				$('#box').html(response);
			},
			//timeout:500,		//设置加载超时时间
			//global:false,		//可以设置某个$.ajax()不触发全局事件
			error:function(xhr,errorText,errorType){
				//alert(errorText);	//error
				//alert(errorStatus);//error
				//alert(errorType);//返回空信息
				//alert(errorStatus+":"+errorType);  //error:
				//alert(errorStatus+":"+errorText);	//error:
				//alert(xhr.status+":"+xhr.statusText);
				//alert(errorText+":"+errorType);
				//alert(xhr.status+":"+xhr.statusText);//0:error
				/*for(var i in xhr){
					document.write(i+"<br>");
				}
				*/
				//alert(xhr.status);	//404
				//alert(xhr.statusText);	//Not Found	
				alert(xhr.status+":"+xhr.statusText);404:Not Found
			}
		});
	});
});


