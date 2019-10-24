
$(function(){
	$(".m_item dd").css("display","none");

	mydo.init();
})

var mydo=(function(){
	var BindControl =function(){
			//获取url中的参数
			var paras = utils.url_getParameter();
			var flag = paras["flag"];
			
			//动态添加样式
			if (typeof(flag) != "undefined") {
				var $elem = $("#dt_ques" + flag);
				$elem.addClass('current');
				$elem.next().css("display", "block");
			};

			
			$(".m_item dt").click(function(){
				$(".m_item dd").not($(this).next()).hide();
				$(".m_item dt").not($(this).next()).removeClass("current");
				$(this).next().slideToggle(500);
				$(this).toggleClass("current");
			})
			
			$("#p1").click(function(){
				window.location.href = "problem/page/mhelpDtea_1_1.html";
			})
			$("#p2").click(function(){
				window.location.href = "problem/page/mhelpDtea_1_2.html";
			})
			$("#p3").click(function(){
				window.location.href = "problem/page/mhelpDtea_1_3.html";
			})
			$("#p4").click(function(){
				window.location.href = "problem/page/mhelpDtea_1_4.html";
			})
			$("#p5").click(function(){
				window.location.href = "problem/page/mhelpDtea_1_5.html";
			})
			$("#p6").click(function(){
				window.location.href = "problem/page/mhelpDtea_1_6.html";
			})
			$("#p7").click(function(){
				window.location.href = "problem/page/mhelpDtea_1_7.html";
			})
			$("#p8").click(function(){
				window.location.href = "problem/page/mhelpDtea_1_8.html";
			})
			$("#p9").click(function(){
				window.location.href = "problem/page/mhelpDtea_1_9.html";
			})
			$("#p10").click(function(){
				window.location.href = "problem/page/mhelpDtea_1_10.html";
			})
			$("#p11").click(function(){
				window.location.href = "problem/page/mhelpDtea_1_11.html";
			})
			$("#p12").click(function(){
				window.location.href = "problem/page/mhelpDtea_1_12.html";
			})
			$("#p13").click(function(){
				window.location.href = "problem/page/mhelpDtea_1_13.html";
			})
			$("#p14").click(function(){
				window.location.href = "problem/page/mhelpDtea_1_14.html";
			})
			$("#t1").click(function(){
				window.location.href = "problem/page/mhelpDtea_2_1.html";
			})
			$("#t2").click(function(){
				window.location.href = "problem/page/mhelpDtea_2_2.html";
			})
			$("#t3").click(function(){
				window.location.href = "problem/page/mhelpDtea_2_3.html";
			})
			$("#t4").click(function(){
				window.location.href = "problem/page/mhelpDtea_2_4.html";
			})
			$("#t5").click(function(){
				window.location.href = "problem/page/mhelpDtea_2_5.html";
			})
			$("#r1").click(function(){
				window.location.href = "problem/page/mhelpDtea_3_1.html";
			})
			$("#r2").click(function(){
				window.location.href = "problem/page/mhelpDtea_3_2.html";
			})
			$("#r3").click(function(){
				window.location.href = "problem/page/mhelpDtea_3_3.html";
			})
			$("#r4").click(function(){
				window.location.href = "problem/page/mhelpDtea_3_4.html";
			})
			$("#r5").click(function(){
				window.location.href = "problem/page/mhelpDtea_3_5.html";
			})
			$("#r6").click(function(){
				window.location.href = "problem/page/mhelpDtea_3_6.html";
			})
			$("#r7").click(function(){
				window.location.href = "problem/page/mhelpDtea_3_7.html";
			})
			$("#f1").click(function(){
				window.location.href = "problem/page/mhelpDtea_4_1.html";
			})
			$("#f2").click(function(){
				window.location.href = "problem/page/mhelpDtea_4_2.html";
			})
			$("#f3").click(function(){
				window.location.href = "problem/page/mhelpDtea_4_3.html";
			})
			$("#f4").click(function(){
				window.location.href = "problem/page/mhelpDtea_4_4.html";
			})
			//底部导航链接
			//首页：链接
		$("#do_bottom_01").click(function(){
			window.location.href ="projectIndex.html";
			})
		//发起：链接
		$("#do_bottom_02").click(function(){
			window.location.href ="launch.html";
			})
		//公益主页：链接
		$("#do_bottom_03").click(function(){
			window.location.href ="gyIndex.html";
			})
			
		//我：链接
		$("#do_bottom_04").click(function(){
			window.location.href ="myHome.html";
			})
	}
	
		
	return {
		init: function(){
			//链接
			BindControl();
		}
	
	
	}	
	
})()


