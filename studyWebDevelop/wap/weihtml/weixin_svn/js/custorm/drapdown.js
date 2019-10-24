$(function(){
	drapdown.init_page();
	drapdown.init_control();
})

var drapdown = (function(){
	
	var move = false;							//移动状态标记
	var xc;
	
	//页面控制部分
	var bind_control = function(){
		
		//按下
		$("#drap").on("touchstart",function(e){
			var touch = e.touches[0];
			var offset=$(this).offset();
			var firstY=offset.top;				//记下按下时候内容区域相对于浏览器窗口顶部的位移
			move = true;
			xc = touch.pageY;					//鼠标指针相对于浏览器顶部的位移
			
		})
		
		//移动
		$(document).on("touchmove",function(e){
			
		})
		
	}
	
	//页面初始化部分
	var page_info = function(){
		var win = $(window).height();		//浏览器窗口高度
		var top = $(".dd_top").height();	//页面头部高度
		var con = win-top;					//内容区域高度
		$(".dd_conter").css("height",win);
		
	}
	
	return {
		init_page:function(){
			page_info();
		},
		init_control:function(){
			bind_control();
		}
	}
})()