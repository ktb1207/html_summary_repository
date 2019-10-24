$(function(){
	//解决引入Zepto和jQuery的冲突
	var $q = jQuery.noConflict(); 	
	/***********鼠标事件对象方法总结：
	 *event事件对象和其他对象比如window、document对象比较特殊，它在不同浏览器表现会有不同
	 ************/
	
	/*Demo1-screenX和screenY属性，来获取鼠标事件发生时，鼠标指针相对屏幕所在位置，以像素为单位*/
	$(".demo1").on("click",function(event){											//tap-无event属性，click有event属性
		var sx = event.screenX;
		var sy = event.screenY;
		console.log("相对屏幕"+sx+':'+sy);
	});
	
	/*Demo2-clientX和clientY属性，来获取鼠标事件发生时，鼠标指针相对浏览器窗口所在位置，以像素为单位*/
	$(".demo1").on("click",function(event){											//tap-无event属性，click有event属性
		var cx = event.clientX;
		var cy = event.clientY;
		console.log("相对浏览器窗口"+cx+':'+cy);
	});
	
	/*Demo3-offsetX和offsetY属性，当鼠标事件发生时，鼠标指针相对于事件源所在位置，以像素为单位*/
	$(".demo1").on("click",function(event){											//tap-无event属性，click有event属性
		var ox = event.offsetX;
		var oy = event.offsetY;
		console.log("相对事件源"+ox+':'+oy);
	});
	
	/*********screen - 屏幕对象方法总结**********
	 * 屏幕对象主要用来获取用户屏幕信息，主要包括：
	 * 1.height和width-屏幕的高度和宽度
	 * 2.AvailHeight和AvailWidth-屏幕可用像素高度和宽度
	 * 3.colorDepth-屏幕颜色深度
	 */
	console.log("屏幕高度:"+screen.height+"屏幕宽度:"+screen.width+"屏幕可用高度:"+screen.availHeight+"屏幕可用宽度:"+screen.availWidth+"屏幕颜色深度:"+screen.colorDepth);
	
	/********document - 文档对象方法总结*********
	 * 网页可见区域宽：document.body.clientWidth 
	 * 网页可见区域高：document.body.clientHeight 
	 * 网页可见区域宽：document.body.offsetWidth (包括边线的宽) 
	 * 网页可见区域高：document.body.offsetHeight (包括边线的高) 
	 * 网页正文全文宽：document.body.scrollWidth 
	 * 网页正文全文高：document.body.scrollHeight 
	 * 网页被卷去的高：document.body.scrollTop 
	 * 网页被卷去的左：document.body.scrollLeft 
	 * 网页正文部分上：window.screenTop 
	 * 网页正文部分左：window.screenLeft
	*/
	console.log("网页可见区域宽："+document.body.clientWidth);
	console.log("网页可见区域高："+document.body.clientHeight);
	console.log("网页可见区域宽(包括边线的宽)："+document.body.offsetWidth);
	console.log("网页可见区域高(包括边线的高)："+document.body.offsetHeight);
	console.log("网页正文全文宽："+document.body.scrollWidth);
	console.log("网页正文全文高："+document.body.scrollHeight);
	console.log("网页被卷去的高："+document.body.scrollTop);
	console.log("网页被卷去的左："+document.body.scrollLeft);
	console.log("网页正文部分上："+window.screenTop);
	console.log("网页正文部分左："+window.screenLeft);
	
	$q(window).scroll(function(){
		var sp = document.body.scrollTop || document.documentElement.scrollTop;			//滚动条距离顶端的距离
		var lp = document.body.scrollLeft || document.documentElement.scrollLeft;		//滚动条距离左边的距离
		//当滚动条垂直滚动距离超过百分之80div改变背景色
		var dh = document.body.scrollHeight;											//文档全文高
		var sh = screen.height;															//屏幕高
		var ch = dh-sh;																	//被隐藏文档高
		if((sp/ch)*100>=80){
			$(".demo1").css("background-color","#008000");
		}else{
			$(".demo1").css("background-color","#32BEFF");
		}
		//当滚动条左右滚动距离超过百分之80div改变背景色
		var dw = document.body.scrollWidth;												//文档全文宽
		var sw = screen.width;															//屏幕宽
		var cw = dw-sw;																	//被隐藏文档宽
		if((lp/cw)*100>=80){
			$(".demo2").css("background-color","#FF7F50");
		}else{
			$(".demo2").css("background-color","#000000");
		}
		
	});
	
	/**************滑动事件Demo用于pc端**************/
	var move=false;									//移动标记
	var _x,_y;
	var title_w = $(".middle").width();				//滑动长度
	var bar_w = $(".sbar").width();					//滑块长度
	var margin_left = title_w-bar_w;				//margin-left最大值
	var wk;											//
	//滑块位置初始化
	$q("#bar").css({"top":"0","left":"0"});
	$q(".mid_ul>li").eq(0).css("background-color","#32BEFF");
	
//	$q(document).on("mouseover",function(event){
//		var x = event.pageX;						//鼠标相对于文档左边缘的位置
//		var y = event.pageY;						//鼠标相对于文档顶部的位置
//	})
	
	$q("#bar").mousedown(function(e){
		move=true;
		_x=e.pageX-parseFloat($q("#bar").css("left"));		//滑块相对文档左边缘的距离
		_y=e.pareY-parseInt($q("#bar").css("top"));			//滑块相对文档上边缘的距离
	});
	
	$q(document).on("mousemove",function(e){
		if(move){
			var x=e.pageX-_x;								//滑块滑动距离
			//控制滑动左右边界
			if(x<=0){
				x=0;
			}else if(x>=margin_left){
				x=margin_left;
			}
			$("#bar").css({"margin-top":"0","margin-left":x});
			//滑动更改上方背景颜色
			wk = parseInt((x/margin_left)*100);
			$q(".top").text(wk);
			
			if (wk<4) {
				$q(".mid_ul>li").css("background-color","#008000");
				$q(".mid_ul>li").eq(0).css("background-color","#32BEFF");
			}else if (wk>=4&&wk<12) {
				$q(".mid_ul>li").css("background-color","#008000");
				$q(".mid_ul>li").eq(1).css("background-color","#32BEFF");
			}else if (wk>=13&&wk<23) {
				$q(".mid_ul>li").css("background-color","#008000");
				$q(".mid_ul>li").eq(2).css("background-color","#32BEFF");
			}else if (wk>=23&&wk<33) {
				$q(".mid_ul>li").css("background-color","#008000");
				$q(".mid_ul>li").eq(3).css("background-color","#32BEFF");
			}else if (wk>=35&&wk<45) {
				$q(".mid_ul>li").css("background-color","#008000");
				$q(".mid_ul>li").eq(4).css("background-color","#32BEFF");
			}else if (wk>=45&&wk<55) {
				$q(".mid_ul>li").css("background-color","#008000");
				$q(".mid_ul>li").eq(5).css("background-color","#32BEFF");
			}else if (wk>=55&&wk<65) {
				$q(".mid_ul>li").css("background-color","#008000");
				$q(".mid_ul>li").eq(6).css("background-color","#32BEFF");
			}else if (wk>=65&&wk<75) {
				$q(".mid_ul>li").css("background-color","#008000");
				$q(".mid_ul>li").eq(7).css("background-color","#32BEFF");
			}else if (wk>=75&&wk<85) {
				$q(".mid_ul>li").css("background-color","#008000");
				$q(".mid_ul>li").eq(8).css("background-color","#32BEFF");
			}else if (wk>=85&&wk<95) {
				$q(".mid_ul>li").css("background-color","#008000");
				$q(".mid_ul>li").eq(9).css("background-color","#32BEFF");
			}else if(wk>=95){
				$q(".mid_ul>li").css("background-color","#008000");
				$q(".mid_ul>li").eq(11).css("background-color","#32BEFF");
			}else{
				
			}
			
		}
	}).mouseup(function(){
		move=false;
	});
	
	/****************滑动事件demo用于移动端*******************/
	var tap = false;													//移动状态标记
	var mbx,mby;
	var mb_wrp = $(".mb_btm").width();									//滑动区域宽度
	var mb_sro = $(".mb_bar").width();									//滑块宽度
	var mb_left = mb_wrp - mb_sro;										//最大滑动区域宽度
	var mb_mk;															//已经滑动距离占总滑动距离百分比
	//位置初始化
	$(".mb_ul>li").eq(0).css("background-color","#32BEFF");
	
	$("#bar2").on("touchstart",function(e){
		console.log(e);
		var touch = e.touches[0];										//touch事件发生时相关属性
		var offset=$(this).offset();									//滑块左边距
		console.log(offset.left);
		tap=true;
		mbx=touch.pageX-parseFloat(offset.left);
		mby=touch.pareY-parseInt($("#bar2").css("top"));	
	});
	
	$(document).on("touchmove",function(e){
		var touch = e.touches[0];
		if(tap){
			var x=touch.pageX-mbx;
			//控制滑动左右边界
			if(x<=0){
				x=0;
			}else if(x>=mb_left){
				x=mb_left;
			}
			$("#bar2").css({"margin-top":"0","margin-left":x});
			mb_mk = parseFloat((x/mb_left)*100).toFixed(2);
			$(".mb_top").text(mb_mk);
			
			if(mb_mk<=5){
				$(".mb_ul>li").css("background-color","#008000");
				$(".mb_ul>li").eq(0).css("background-color","#32BEFF");
			}else if(mb_mk>5&&mb_mk<=15){
				$(".mb_ul>li").css("background-color","#008000");
				$(".mb_ul>li").eq(1).css("background-color","#32BEFF");
			}else if(mb_mk>15&&mb_mk<=25){
				$(".mb_ul>li").css("background-color","#008000");
				$(".mb_ul>li").eq(2).css("background-color","#32BEFF");
			}else if(mb_mk>25&&mb_mk<=35){
				$(".mb_ul>li").css("background-color","#008000");
				$(".mb_ul>li").eq(3).css("background-color","#32BEFF");
			}else if(mb_mk>35&&mb_mk<=45){
				$(".mb_ul>li").css("background-color","#008000");
				$(".mb_ul>li").eq(4).css("background-color","#32BEFF");
			}else if(mb_mk>45&&mb_mk<=55){
				$(".mb_ul>li").css("background-color","#008000");
				$(".mb_ul>li").eq(5).css("background-color","#32BEFF");
			}else if(mb_mk>55&&mb_mk<=65){
				$(".mb_ul>li").css("background-color","#008000");
				$(".mb_ul>li").eq(6).css("background-color","#32BEFF");
			}else if(mb_mk>65&&mb_mk<=75){
				$(".mb_ul>li").css("background-color","#008000");
				$(".mb_ul>li").eq(7).css("background-color","#32BEFF");
			}else if(mb_mk>75&&mb_mk<=85){
				$(".mb_ul>li").css("background-color","#008000");
				$(".mb_ul>li").eq(8).css("background-color","#32BEFF");
			}else if(mb_mk>85&&mb_mk<=95){
				$(".mb_ul>li").css("background-color","#008000");
				$(".mb_ul>li").eq(9).css("background-color","#32BEFF");
			}else if(mb_mk>95){
				$(".mb_ul>li").css("background-color","#008000");
				$(".mb_ul>li").eq(10).css("background-color","#32BEFF");
			}else{
				
			}
		}
	});
	
	$(document).on("touchend",function(e){
		tap=false;
	});
	
})
