//jQuery事件处理机制-鼠标事件
//任务
//1单击按钮时改变文本框的背景颜色
//2移动到div层上的时候背景变色
//3在页面上显示鼠标坐标
//4双击放大div窗口

$(function(){

//1单击按钮时改变文本框的背景颜色
	$("button").on("click",function(){
		$("input").css("background","lightblue");
		//阻止事件传播（双击提交按钮不会发生放大div窗口）
		//在jQuery中为了简化操作，对于on里面的事件名它提供了等价的函数
		//click-click(),mouseover-mouseover()
		$("button").dblclick(function(event){
			event.stopPropagation();	//停止双击事件的传播
		});
	});

//2移动到div层上的时候背景变色
	//移动进入mouseover/移除mouseout
	//移入
	//$(".me").on("mouseover",function(){
		//$(this).css("background","orange");
		//});
	//移除
	//$(".me").on("mouseout",function(){
		//$(this).css("background","#ccc");
		//});
	//在jQuery中提供了一个简化的函数hover()
	//hover()函数有两个参数，第一个参数表示移入触发，第二个参数表示移除触发
	$(".me").hover(
		function(){
			$(this).css("background","orange");
		},function(){
			$(this).css("background","#ccc");
	});

//3在页面上显示鼠标坐标
//参数为document意为将当前页面作为选择对象
//在事件处理函数中，有一个默认函数被称为“事件对象event”,它包含了事件所产生的信息
	$(document).on("mousemove",function(event){
		var x = event.pageX;	//pageX代表鼠标在文档上的x坐标
		var y = event.pageY;	//pageY代表鼠标在文档上的y坐标
		$("#divPos").text("X:"+x+","+"Y:"+y);
	
	});

//4双击放大div窗口
//jQuery会产生一个事件传播效应，即父节点绑定的事件会传播影响到下面的子节点发生同样的触发事件


	$(".me").on("dblclick",function(){
		$(this).width(600);
		$(this).height(200);
	});








});