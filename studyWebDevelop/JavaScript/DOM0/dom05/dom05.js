


window.onload=function(){
	//在获取和设置css属性的时候，只能获取和设置行内样式的css，内联和链接外部的获取不到
	//判断浏览器是否支持CSS2.0
	//alert(document.implementation.hasFeature('css','2.0'));
	//获取属性
	//var box=document.getElementById('box');
	//alert(box.style);		//object CSS2Properties
	//alert(box.style.color);		//red
	//alert(box.style.font-size);		//把-号去掉，后面的字符大写才可以
	//alert(box.style.fontSize);		//20px
	//alert(box.style.background);
	//alert(box.style.float);			//right
	//alert(box.style.cssFloat);		//right
	//alert(box.style.styleFloat);		//IE支持，非IE不支持
	//alert(box.style.cssFloat||box.style.styleFloat);		//夸浏览器兼容

	//属性赋值
	var pox=document.getElementById('pox');
	//alert(pox.id);
	pox.style.color="blue";
	pox.style.fontSize="20px";
	pox.style.background="#ccc";



}


































