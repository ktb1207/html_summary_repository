$(function(){
	//解决引入Zepto和jQuery的冲突
	var $q = jQuery.noConflict(); 	
	var nowPage=0;											//当前显示的是总图片第几个?
	var tolPage=0;											//总图片有几个?
	var tap = false;										//滑动状态标记
	var downX,moveX;
	//点击图片放大
	$("#img_wrap>div").on("tap",function(){
		var picArr=[];										//保存图片src数组
		var inx = $(this).index();							//当前点击哪一个?
		nowPage = inx;
		var lng = $("#img_wrap>div").length;				//图片总长度
		tolPage = lng;
		var src = $(this).css("background-image");
		//遍历所有图片src
		for(var i=0;i<lng;i++){
			var lrc = $("#img_wrap>div").eq(i).css("background-image");
			picArr.push(lrc);
		}
		console.log(picArr);
		//插入图片标签
		var ahtml = '';
		for(var j=0;j<lng;j++){
			ahtml = ahtml+'<div class="cel-img"></div>';
		}
		$(".fix-img").append(ahtml);
		//插入图片路径
		for(var k=0;k<lng;k++){
			$(".fix-img>.cel-img").eq(k).css("background-image",picArr[k]);
		}
		//点击第几个显示对应图片
		$(".fix-img>.cel-img").eq(inx).css("display","block");
		$q(".fix-img").show(600);
	})
	
	//点击隐藏放大图片
	$(".fix-img").on("tap",function(){
		$(this).html("");
		$q(".fix-img").hide(600);
	})
	
	//鼠标按下
	$(".cel-img").live("touchstart",function(e){
		var touch = e.touches[0];										//touch事件发生时相关属性
		downX = touch.clientX;
		tap = true;
	})
	//鼠标滑动
	$(".cel-img").live("touchmove",function(e){
		var touch = e.touches[0];										//touch事件发生时相关属性
		moveX = touch.clientX;
		if(tap=true){
			if(moveX-downX>=120&&moveX-downX<140){
				tap = false;
				console.log("right");
				nowPage = nowPage-1;
				if(nowPage<0){
					nowPage = tolPage-1;
				}
				console.log(nowPage);
				$(".fix-img>.cel-img").css("display","none");
				setTimeout(function(){
					$q(".fix-img>.cel-img").eq(nowPage).show();
				},400);
				return false;
			};
			if(downX-moveX>=120&&downX-moveX<140){
				tap = false;
				console.log("left");
				nowPage = nowPage+1;
				if(nowPage>=tolPage){
					nowPage = 0;
				}
				console.log(nowPage);
				$(".fix-img>.cel-img").css("display","none");
				setTimeout(function(){
					$q(".fix-img>.cel-img").eq(nowPage).show();
				},400);
				return false;
			}
				
		}
		
		
	})
	//鼠标抬起
	$(".cel-img").live("touchend",function(e){
		tap = false;
	})
	
})
