$(function(){
	//解决引入Zepto和jQuery的冲突
	var $q = jQuery.noConflict(); 	
	
	//点击浮标
	$(".fix_right").on("tap",function(){
		var stus = $(this).attr("value");
		console.log(stus);
		if(stus=="hide"){
			$q(".fix_left").animate({"width":"12.0rem","left":"0"},400,function(){
				$q(".left_txt").show();
			});
			$(this).addClass("rotate1");
			$(this).attr("value","show");
		}else{
			$q(".left_txt").hide();
			$q(".fix_left").animate({"width":"0","left":"12.0rem"},400,function(){
				$q(".fix_right").removeClass("rotate1");
			});
			$(this).attr("value","hide");
		}
	})
	
	
	
	
})
