//jQuery访问和设置css样式
//任务
//1将所有单元格宽度设置为100像素
//2将单元格字号设置为20像素，字体颜色为红色，且拥有红色边框
//3在浏览器控制台显示DIV元素的背景色属性值
//4设置斑马线，隔行背景色变成蓝亮色，字色变成黑色
//5移除DIV所有css类

$(function(){
	//1将所有单元格宽度设置为100像素
	//css函数用于设置或者获取指定选择元素的样式
	$("td").css("width","100px");

	//2将单元格字号设置为20像素，字体颜色为红色，且拥有黑色边框
	//$("td").css("font-size","20px");
	//$("td").css("color","red");
	//$("td").css("border","1px solid black");
	//设置多个css样式,更简单
	$("td").css({"font-size":"20px","color":"red","border":"1px solid black"});

	//3在浏览器控制台显示DIV元素的背景色属性值
	//利用css函数进行获取css属性值
	//函数css()如果只有属性名的话，则代表获取相对应的属性值，如果选择器选择了多个对象
	//那么只返回第一个对象的属性值
	var bc = $("div").css("background-color");
	console.info(bc);	//控制台显示一般信息

	//4设置斑马线，隔行背景色变成蓝亮色，字色变成黑色
	//addClass()函数，为选择的对象增加class类
	//如果需要增加多个class类，只需要在多个class类名中间增加类名即可
	$("tr:odd").addClass("trstyle ttstyle");

	//5移除DIV所有css类
	//利用removeClass移除对应或者所有class类
	//removeClass()函数如果不传递任何函数名则表示移除所有class类(不推荐使用)
	//$("div").removeClass();
	$("div").removeClass("dtable");

});