
/*
	//检测是否支持sheet样式表，链接式/内联式
	//IE为false,但并不精确，支持，其他浏览器为true
	//alert(document.implementation.hasFeature('stylesheets','2.0'));

*/
/*
	var link=document.getElementsByTagName('link')[0];	//获取第一个链接样式标签
	//alert(link);		//object HTMLLinkElement
	var sheet=link.sheet;
	//alert(sheet);		//object CSSStyleSheet]
	
*/
/*
	//更加简便的获取sheet的方法
		//document.styleSheets得到的是StyleSheetList集合
		//var sheet=document.styleSheets;		//	得到object StyleSheetList集合
		//alert(sheet);		//object StyleSheetList
		var sheet=document.styleSheets[0];		//得到第一个sheet样式表,浏览器都兼容
		//alert(sheet);		//object CSSStyleSheet
		//判断浏览器sheet样式表是否被禁用，返回false打开，返回true则被禁用
		//alert(sheet.disabled);	//true
		//sheet.disabled=true;		//设置浏览器禁用sheet样式表
		//alert(sheet.href);		//获取css路径
	
*/



window.onload=function(){
	var sheet=document.styleSheets[0];	
	//sheet.cssRules,样式规则集合
	//样式的规则就是：一群样式的集合表示一个规则
	//alert(sheet.cssRules);		//[object CSSRuleList样式规则集合
	//alert(sheet.cssRules[0]);		//object CSSStyleRule],得到的是第一个样式规则
	//alert(sheet.cssRules[0].cssText);	//得到第一个css规则的样式文本
	//alert(sheet.cssRules[0].selectorText);		//得到第一个规则的选择符#box
	//sheet.deleteRule(0);		//删除第一条规则
	//sheet.insertRule("body{background-color:red}",0);	//添加一条规则在第一个位置上
	



















}


































