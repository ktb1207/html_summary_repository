$(function(){
	$(window).scroll(function(){
		var sh = $(this).scrollTop();
		if(sh>=72){
			$(".con_top").addClass('con_top_fx');
			$(".con_left").addClass('con_left_fx');
			$(".scroll_demo1").addClass('scroll_demo1_fx');
			$(".clear_left").css("display","block");
		}else{
			$(".con_top").removeClass('con_top_fx');
			$(".con_left").removeClass('con_left_fx');
			$(".scroll_demo1").removeClass('scroll_demo1_fx');
			$(".clear_left").css("display","none");
		}
	})
	
})
