/*
	动态加载JS文件的方法
	var flag=true;		//如果flag为真，那么就加载BrowserDetect.js文本
	if (flag){
		var script=document.createElement('script');
		script.type="text/javascript";
		script.src="browserdetect.js";
		document.getElementsByTagName('head')[0].appendChild(script);
	}

	动态加载JS文件的方法（修改为函数形式）
	var flag=true;		//如果flag为真，那么就加载BrowserDetect.js文本
	if (flag){
	loadScript('browserdetect.js');		//函数调用
	}

	function loadScript(url){
	var script=document.createElement('script');
	script.type="text/javascript";
	script.src=url;
	document.getElementsByTagName('head')[0].appendChild(script);
	}

	动态加载JS文本
	var flag=false;		//如果flag为真，那么就加载JS脚本
	if (flag){
	var script=document.createElement('script');
	script.type="text/javascript";
		script.appendChild(document.createTextNode("alert('Lee')"));	//和下面一行功能一样
		script.text="alert('Lee')";										//和上面一行功能一样
	document.getElementsByTagName('head')[0].appendChild(script);
	}

	动态加载CSS文件
	var flag=true;		//如果flag为真，那么就加载JS脚本
	if (flag){
	var link=document.createElement('link');
	link.rel="stylesheet";
	link.type="text/css";
	link.href="basic.css";	
	document.getElementsByTagName('head')[0].appendChild(link);
	}

	动态加载style样式
	var flag=true;		//如果flag为真，那么就加载JS脚本
	if (flag){
	var style=document.createElement('style');
	style.type="text/css";
	style.appendChild(document.createTextNode('#box{width:200px;height:200px;'+
		'background:red}'));	//代码换行处理+
	document.getElementsByTagName('head')[0].appendChild(style);
	}




*/

window.onload=function(){
	
	
}



var flag=true;		//如果flag为真，那么就加载JS脚本

if (flag){
	var style=document.createElement('style');
	style.type="text/css";
	style.appendChild(document.createTextNode('#box{width:200px;height:200px;'+
		'background:red}'));	//代码换行处理+
	document.getElementsByTagName('head')[0].appendChild(style);


}





































