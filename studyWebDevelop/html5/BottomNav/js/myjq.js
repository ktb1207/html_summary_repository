$(function(){
	
	var move=false;	//移动标记
	var _x,_y;
	var wa = $(".bar_top").width();			//滑动长度
	var wb = $(".drap_bar").width();		//滑块长度
	var wc = wa-wb;							//margin-left最大值
	var wk;
	//初始化上方背景颜色
	$("#num>li").eq(0).css("background-color","#008000");
	$("#drap").css({"top":"0","left":"3%"});	
	$(document).on("mouseover",function(event){
		var x = event.pageX;
		var y = event.pageY;
	})
	
	$("#drap").mousedown(function(e){
		move=true;
		//_x=e.pageX-parseInt($("#drap").css("left"));
		_x=e.pageX-parseFloat($("#drap").css("left"));
		_y=e.pareY-parseInt($("#drap").css("top"));
	});
	$(document).mouseover(function(e){
		if(move){
			var x=e.pageX-_x;
			//控制滑动左右边界
			if(x<=0){
				x=0;
			}else if(x>=wc){
				x=wc;
			}
			$("#drap").css({"top":"0","left":x});
			//滑动更改上方背景颜色
			wk = parseInt((x/wc)*100);
			$(".locdes").text(wk);
			
			
			
			if (wk<10) {
				$("#num>li").css("background-color","gold");
				$("#num>li").eq(0).css("background-color","#008000");
			}else if (wk>=10&&wk<20) {
				$("#num>li").css("background-color","gold");
				$("#num>li").eq(1).css("background-color","#008000");
			}else if (wk>=20&&wk<30) {
				$("#num>li").css("background-color","gold");
				$("#num>li").eq(2).css("background-color","#008000");
			}else if (wk>=30&&wk<40) {
				$("#num>li").css("background-color","gold");
				$("#num>li").eq(3).css("background-color","#008000");
			}else if (wk>=40&&wk<50) {
				$("#num>li").css("background-color","gold");
				$("#num>li").eq(4).css("background-color","#008000");
			}else if (wk>=50&&wk<60) {
				$("#num>li").css("background-color","gold");
				$("#num>li").eq(5).css("background-color","#008000");
			}else if (wk>=60&&wk<70) {
				$("#num>li").css("background-color","gold");
				$("#num>li").eq(6).css("background-color","#008000");
			}else if (wk>=70&&wk<80) {
				$("#num>li").css("background-color","gold");
				$("#num>li").eq(7).css("background-color","#008000");
			}else if (wk>=80&&wk<90) {
				$("#num>li").css("background-color","gold");
				$("#num>li").eq(8).css("background-color","#008000");
			}else if (wk>=90&&wk<=100) {
				$("#num>li").css("background-color","gold");
				$("#num>li").eq(9).css("background-color","#008000");
			}else{
				
			}
			
		}
	}).mouseup(function(){
		/*
		if(wk<=6){
			$("#drap").css({"top":"0","left":"3%"});
		}else if (wk>6&&wk<=16) {
			$("#drap").css({"top":"0","left":"13%"});
		}else if (wk>16&&wk<=26){
			$("#drap").css({"top":"0","left":"23%"});
		}else if (wk>26&&wk<=36){
			$("#drap").css({"top":"0","left":"33%"});
		}else if (wk>36&&wk<=46){
			$("#drap").css({"top":"0","left":"43%"});
		}else if (wk>46&&wk<=56){
			$("#drap").css({"top":"0","left":"53%"});
		}else if (wk>56&&wk<=66){
			$("#drap").css({"top":"0","left":"63%"});
		}else if (wk>66&&wk<=76){
			$("#drap").css({"top":"0","left":"73%"});
		}else if (wk>76&&wk<=86){
			$("#drap").css({"top":"0","left":"83%"});
		}else if (wk>86&&wk<=100){
			$("#drap").css({"top":"0","left":"93%"});
		}else{
			
		}
		
		*/
		move=false;
	});
})
