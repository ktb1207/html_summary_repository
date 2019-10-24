
/*
//$.aiax()方法
$('input').click(function(){
		$.ajax({
			type:'POST',
			url:'test.php',
			data:{
				url:'ycku'
			},
			success:function(response,status,xhr){
				$('#box').html(response);
			}
		});
			
	});
//表单提交
//此方法当表单元素特别多的情况下，写起来非常麻烦，容易出错
//复制提交的内容时，data属性需要修改的非常多
$('form input[type=button]').click(function(){
		$.ajax({
			type:'POST',
			url:'user.php',
			data:{
				user:$('form input[name=user]').val(),
				email:$('form input[name=email]').val()
			},
			success:function(response,status,xhr){
				$('#box').html(response);
			}
		});	
	});
//serialize()表单序列化方法
$('form input[type=button]').click(function(){
		$.ajax({
			type:'POST',
			url:'user.php',
			data:$('form').serialize(),		//表单序列化
			success:function(response,status,xhr){
				$('#box').html(response);
			}
		});	
	});
//serialize()还可以获取单选框下拉框的内容
$('form input[name=sex]').click(function(){
		//alert($(this).serialize());	//sex=%E5%A5%B3 经过编码的
		$('#box').html(decodeURIComponent($(this).serialize()));
	});
//serialize()转换成JSON数据
//serializeArray()方法
$('form input[name=sex]').click(function(){
		//console.log($(this).serializeArray());	//[Object { name="sex",  value="男"}]
		var json = $(this).serializeArray();
		$('#box').html(json[0].name+"="+json[0].value);
	});
//$.aiaxSetup()-方法
$('form input[type=button]').click(function(){
		//初始化重复性属性
		$.ajaxSetup({
			type:'POST',
			url:'user.php',
			data:$('form').serialize(),		//表单序列化
		});
		$.ajax({
			success:function(response,status,xhr){
				$('#box').html(response);
			}
		});	
		
	});
//$.param()方法，
//在使用data属性进行传递的时候，如果是以对象形式传参，可以使用$.param()方法
//将对象转换成字符串键值对形式，以方便服务器端解析
//因为如果data对象传参，如果里面键值对内容过多会造成服务器解析出错，直接使用obj要谨慎
$('form input[type=button]').click(function(){
		$.ajax({
			type:'POST',
			url:'user.php',
			data:$.param({
				user:$('form input[name=user]').val(),
				email:$('form input[name=email]').val()
			}),
			success:function(response,status,xhr){
				$('#box').html(response);
			}
		});
		
	});
	//
	$('form input[name=sex]').click(function(){
		//console.log($(this).serializeArray());	//[Object { name="sex",  value="男"}]
		var json = $(this).serializeArray();
		$('#box').html(json[0].name+"="+json[0].value);
	});
*/
$(function(){
	$('input').click(function(){
		$.ajax({
			type:'POST',
			url:'test.php',
			data:{
				url:'ycku'
			},
			success:function(response,status,xhr){
				$('#box').html(response);
			}
		});
			
	});
});

