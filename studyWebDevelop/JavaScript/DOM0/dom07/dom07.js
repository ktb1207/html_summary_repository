/*
	style获取行内的css大小方法
	var box=document.getElementById('box');
		//alert(box.style.width);		//获取行内样式的宽
		//alert(box.style.height);	//获取行内样式的高
		alert(typeof (box.style.width));
*/
/*
	style获取计算后的css大小方法
	如果<div>内有大小，则是正常获取，如果没有设置大小则获取默认的大小
	var box=document.getElementById('box');
	var style=window.getComputedStyle?window.getComputedStyle(box,null):null||box.currentStyle;
	alert(style.width);		//获取计算的大小
	alert(style.height);	//获取计算的大小
	
*/
/*
	使用cssStyleSheet对象中的cssRules属性获取链接的样式大小
	不能获取到行内和计算后打大小
	var sheet=document.styleSheets[0];
	//alert(sheet);
	//var rule=sheet.cssRules;		//火狐支持 IE不支持
	//alert(rule);
	//var rule=sheet.rules;			//火狐不支持 IE支持
	//alert(rule);
	var rule=(sheet.cssRules||sheet.rules)[0];		//兼容
	alert(rule.style.width);
*/
/*
	以上三种方法都不能获取实际的大小，比如增加padding，大小已经发生改变，但是获取的还是
	设定值得大小
	获得实际大小：clientWidth和clientHeight,可视区大小，可以得到元素内容及内边距占据空间
					的大小
	var box=document.getElementById('box');
	//如果设定值单位是pt em等，获取之后还会返回为计算后的px值
	//border和margin不计算在实际大小
	//padding计算在实际大小里面
	//alert(box.clientWidth);		//获取返回值没有单位，但是默认还是px
	//alert(typeof box.clientHeight);	//返回的数据类型是number
*/


window.onload=function(){
	var box=document.getElementById('box');
	


	


		




}


































