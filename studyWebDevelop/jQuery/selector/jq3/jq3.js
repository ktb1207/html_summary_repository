
$(function(){
	//利用属性选择器获取当前页面的所有文本框
	//属性过滤器
	$("input"[type='text']).css("border","1px solid red");

	//利用尾匹配完成对于以.com结尾的超链接筛选
	//$代表以xxx结尾的情况
	$("a[href$='.com']").css("border","1px solid red");

	//^-代表头匹配，筛选http://开头的超链接
	$("a[href^='http://']").css("border","1px solid red");

	//*=模糊匹配/任意匹配
	$("*[value*='input']").css("border","1px solid red");

	//在不考虑属性值的情况下，可以直接在中括号内写属性名即可
	$("*[rows]").css("border","1px solid red");

	//复合过滤器，多个属性条件同时生效
	&("input[type='radio'][checked='checked']").css("border","1px solid red");
	&("input[type='checkbox'][checked='checked']").css("border","1px solid red");
	//利用组合选择器
	&("input[type='radio'][checked='checked'],input[type='checkbox'][checked='checked']")
		.css("border","1px solid red");
	
	//多条件属性筛选
	$("input[type='text'][disabled='disabled']").css("border","1px solid red");

})