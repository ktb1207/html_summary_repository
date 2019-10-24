//jQuery选择器实验室

	$(function(){
		$("#btnQuery").on("click",function(){
			//alert("执行了单击事件");
			var v = $("#txtSelector").val();	//val函数的意思是获取文本框输入的内容
			//移除Class类 removeClass()
			//移除已经拥有selectorstyle类的selectorstyle类
			$(".selectorstyle").removeClass("selectorstyle");
			// addClass为选中的组件增加css Class类
			$(v).addClass("selectorstyle");
			//获取选中元素的数量
			var num=$(v).size();	
			alert("您输入的是："+v+"查询到的数量为："+num+"个");
		})
	
	});