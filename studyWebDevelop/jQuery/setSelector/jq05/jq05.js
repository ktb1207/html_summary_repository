//jQuery访问和设置元素的坐标和尺寸
//任务
//1得到外框的长度
//2得到外框的坐标
//3得到内框的内容尺寸（不包含补丁与边框）
//4得到内框的坐标
//5得到内框的内部尺寸（包含边框）
//6得到内框的外部尺寸（不包含补丁）
//7得到内框的外部尺寸（包含外补丁）

$(function(){
	//1得到外框的长度
	var w = $(".big").width();	//width()方法用于获取内容的宽度
	var h = $(".big").height();	//height()方法用于获取内容的高度
	//在Console控制台中打印出来宽和高
	console.info("外宽内容宽度为："+w+"高度为："+h);

	//2得到外框的坐标
	var p = $(".big").position();	//position()方法代表获取左上角顶点的坐标
	console.info("外框的尺寸坐标为："+p.left+","+p.top);

	//3得到内框的内容尺寸（不包含补丁与边框）
	//width和height得到的就是内容尺寸不包含内补丁、边框和外补丁
	var wa = $(".small").width();	
	var ha = $(".small").height();
	console.info("内框的内容尺寸为：宽"+wa+"高"+ha);

	//4得到内框的坐标
	//position是当前子节点相对于父节点的位移，所以此处不能直接用position()方法
	//offset()用于获取当前元素相对窗口的距离
	var pa = $(".small").offset();	
	console.info("内框的尺寸坐标为："+pa.left+","+pa.top);
	
	//5得到内框的内部尺寸（不包含边框）指的是内容加内边距
	//innerWidth()和innerHeight()函数得到的是内容和内边距的尺寸（不包含边框）
	var iw = $(".small").innerWidth();	
	var ih = $(".small").innerHeight();
	console.info("内框的尺寸为(不包含边框)：宽"+iw+"高"+ih);

	//6得到内框的外部尺寸（不包含外补丁）
	//outerWidth()和outerHight()得到的是包含内容尺寸、内补丁、边框的尺寸但是不包含外补丁
	var ow = $(".small").outerWidth();	
	var oh = $(".small").outerHeight();
	console.info("内框的外部尺寸为(不包含外补丁)：宽"+ow+"高"+oh);

	//7得到内框的外部尺寸（包含外补丁）
	//outerWidth()和outerHight()里面的参数为true，则代表包含外补丁
	var ww = $(".small").outerWidth(true);	
	var wh = $(".small").outerHeight(true);
	console.info("内框的外部尺寸为(包含外补丁)：宽"+ww+"高"+wh);









});