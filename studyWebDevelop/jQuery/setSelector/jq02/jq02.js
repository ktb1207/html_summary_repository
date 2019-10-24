
//jQuery访问与设置元素属性
//完成任务
//1将百度超链接地址改为：http://www.baidu.com
//2将图片显示为aa.jpg，提示信息为熊猫盼盼，宽度为300像素
//3得到第二张图片的文件名
//4将页面中所有复选框选中
//5将A与D复选框选中
//6获取当前页面中所有的超链接地址，alert提示

$(function(){
	//1设置百度超链接地址
	//attr()函数的意思是设置或者获取指定属性的内容
	//attr()函数并不是javascript中自带的函数而是由jQuery进行扩展的函数
	//使用attr()函数设置属性值的时候需要两个参数：一参数名，二参数值
	$("#abaidu").attr("href","http://www.baidu.com");

	//2将图片显示为aa.jpg，提示信息为熊猫盼盼，宽度为300像素
	//$("img:first").attr("src","aa.jpg");
	//$("img:first").attr("alt","熊猫盼盼");
	//$("img:first").attr("width","300");
	//一次性设置多个属性值，参数不再是参数名/参数值，而是一个JSON对象
	$("img:first").attr({"src":"aa.jpg","alt":"熊猫盼盼","width":"300"});

	//3得到第二张图片的文件名
	//attr()的使用方式，如果参数传递了两个“属性名/属性值”或者是一个JSON对象则是用来设置属性值
	//而如果只传递一个属性名的话则代表获取属性值
	var s = $("img:eq(1)").attr("src");
	alert(s);

	//4将页面中所有复选框选中
	//如果选择器选择了多个对象，那么attr()函数会自动为每一个对象进行设置
	//$("input[type='checkbox']").attr("checked","checked");

	//5将A与D复选框选中
	//利用组合选择器
	$("input[type='checkbox']:eq(0),input[type='checkbox']:eq(3)").attr("checked","checked");

	//6获取当前页面中所有的超链接地址，alert提示
	//如果在前面选择器中获取了多个元素的话，获取的属性值只会是第一个元素的内容
		var h = $("a:eq(0)").attr("href");
		var i = $("a:eq(1)").attr("href");
		var j = $("a:eq(2)").attr("href");
		var k = $("a:eq(3)").attr("href");
		var l = $("a:eq(4)").attr("href");
		alert(h+"\n"+i+"\n"+j+"\n"+k+"\n"+l);






});