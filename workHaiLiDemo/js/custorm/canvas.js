$(function(){
	//解决引入Zepto和jQuery的冲突
	var $q = jQuery.noConflict(); 	
	var scroll = false;							//滑动标记
	var anima = false;
	var clickout;								//点击倒计时
	var winHight = $(window).height();			//屏幕高
	var perHight = changNum(winHight/32);		//每一个li高
	var topHight = $(".center_show").css("height");	//滑动顶部高度
	topHight = Number(topHight.substring(0,topHight.length-2));
	$(".li_wrp>li").css({"height":perHight+"px","line-height":perHight+"px"});
	//点击显示
	$("#tap_wrp>li").on("tap",function(){
		if(clickout){
			clearTimeout(clickout);
		}
		var inx = $(this).index();
		var txt = $(this).text();
		showmessage(txt);
	});
	$("#tap_wrp").on("touchstart",function(){
		scroll = true;
	});
	$("#tap_wrp").on("touchend",function(){
		scroll = false;
	});
	//滑动显示
	$("#tap_wrp>li").on("touchmove",function(evevt){
		if(clickout){
			clearTimeout(clickout);
		}
		var touch = evevt.touches[0];
		var sy = touch.clientY;
		scrollShow(sy);
		event.preventDefault ? event.preventDefault() : (event.returnValue = false);		//阻止浏览器默认滑动
	});
	
	$(window).scroll(function(e){
		var sh = document.body.scrollTop || document.documentElement.scrollTop;				//滚动条距离顶端的距离
		if(sh>topHight&&anima==false){
			$q(".ul_wrp").animate({"margin-right":"0"},600,function(){
				anima = true;
			});
			
		}else if(sh<topHight&&anima==true){
			$q(".ul_wrp").animate({"margin-right":"-32px"},600,function(){
				anima = false;
			});
			
		}
	});
	
	
	
	var showmessage = function(big){
		if(big==''){
			
		}else{
			$(".center_show").text(big);
			$(".center_show").show();
		}
		
		clickout = setTimeout(function(){
			$(".center_show").hide();
		},800);
	}
	//格式化数字
	function changNum(num){
		var val = Number(num)   
       	val = val.toFixed(2);   
       	val = Number(val);
    	return  val;   
	}
	
	//滑动显示方法
	var scrollShow = function(sy){
		var ntxt='';
		if(sy>perHight*2&&sy<perHight*3){
			ntxt = $(".li_wrp>li").eq(2).text();
		}else if(sy>perHight*3&&sy<perHight*4){
			ntxt = $(".li_wrp>li").eq(3).text();
		}else if(sy>perHight*4&&sy<perHight*5){
			ntxt = $(".li_wrp>li").eq(4).text();
		}else if(sy>perHight*5&&sy<perHight*6){
			ntxt = $(".li_wrp>li").eq(5).text();
		}else if(sy>perHight*6&&sy<perHight*7){
			ntxt = $(".li_wrp>li").eq(6).text();
		}else if(sy>perHight*7&&sy<perHight*8){
			ntxt = $(".li_wrp>li").eq(7).text();
		}else if(sy>perHight*8&&sy<perHight*9){
			ntxt = $(".li_wrp>li").eq(8).text();
		}else if(sy>perHight*9&&sy<perHight*10){
			ntxt = $(".li_wrp>li").eq(9).text();
		}else if(sy>perHight*10&&sy<perHight*11){
			ntxt = $(".li_wrp>li").eq(10).text();
		}else if(sy>perHight*11&&sy<perHight*12){
			ntxt = $(".li_wrp>li").eq(11).text();
		}else if(sy>perHight*12&&sy<perHight*13){
			ntxt = $(".li_wrp>li").eq(12).text();
		}else if(sy>perHight*13&&sy<perHight*14){
			ntxt = $(".li_wrp>li").eq(13).text();
		}else if(sy>perHight*14&&sy<perHight*15){
			ntxt = $(".li_wrp>li").eq(14).text();
		}else if(sy>perHight*15&&sy<perHight*16){
			ntxt = $(".li_wrp>li").eq(15).text();
		}else if(sy>perHight*16&&sy<perHight*17){
			ntxt = $(".li_wrp>li").eq(16).text();
		}else if(sy>perHight*17&&sy<perHight*18){
			ntxt = $(".li_wrp>li").eq(17).text();
		}else if(sy>perHight*18&&sy<perHight*19){
			ntxt = $(".li_wrp>li").eq(18).text();
		}
		else if(sy>perHight*19&&sy<perHight*20){
			ntxt = $(".li_wrp>li").eq(19).text();
		}else if(sy>perHight*20&&sy<perHight*21){
			ntxt = $(".li_wrp>li").eq(20).text();
		}else if(sy>perHight*21&&sy<perHight*22){
			ntxt = $(".li_wrp>li").eq(21).text();
		}else if(sy>perHight*22&&sy<perHight*23){
			ntxt = $(".li_wrp>li").eq(22).text();
		}else if(sy>perHight*23&&sy<perHight*24){
			ntxt = $(".li_wrp>li").eq(23).text();
		}else if(sy>perHight*24&&sy<perHight*25){
			ntxt = $(".li_wrp>li").eq(24).text();
		}else if(sy>perHight*25&&sy<perHight*26){
			ntxt = $(".li_wrp>li").eq(25).text();
		}else if(sy>perHight*26&&sy<perHight*27){
			ntxt = $(".li_wrp>li").eq(26).text();
		}else if(sy>perHight*27&&sy<perHight*28){
			ntxt = $(".li_wrp>li").eq(27).text();
		}else if(sy>perHight*28&&sy<perHight*29){
			ntxt = $(".li_wrp>li").eq(28).text();
		}else if(sy>perHight*29&&sy<perHight*30){
			ntxt = $(".li_wrp>li").eq(29).text();
		}else{
			
		}
		showmessage(ntxt);
	}
	
})
