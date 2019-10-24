//访问和设置元素内容

$(function(){
	
	//设置内容
	//设置指定元素的html片段，利用html()函数
	//html()函数会解析里面的html标签
	$("#divHTML").html("<b>Hello Word !</b>");
	//设置指定元素的文本内容，利用text()函数
	//text()函数不会解析里面的html标签，会将其全部作为文本内容显示
	$("#divText").text("Hello Word !");

	//获取html片段
	//html()函数获取，里面不需要参数即代表获取
	var qwe = $("#divHTML").html();
	//alert(qwe);

	//获取文本内容
	//text()函数获取，里面不需要参数即代表获取
	var aa = $("#divText").text();
	alert(aa);

	//设置和获取输入项的值
	//$("#txtUsername").attr("value","请输入");
	$("#txtUsername").val("请输入");


	//获取对应的值
	//val()函数里面不需要参数既获取指定项的值
	alert($("#abutton").val());

	//利用数组一次性设置多个值
	$("#mselect").val(["a","c"]);
});