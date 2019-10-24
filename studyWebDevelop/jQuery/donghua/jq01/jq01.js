//jQuery动画函数-显示与隐藏
//任务
//1动画完成DIV层的显示与隐藏
/*
	1无动画效果显示和隐藏
	$(function(){
		$("#toggle").click(function(){			//.on("click",function(){})的简写形式
			if($(".me").css("display")=="block"){	//判断当前的DIV的显示隐藏状态
				$(".me").css("display","none");		
			}else if($(".me").css("display")=="none"){
				$(".me").css("display","block");	
			}
		});

	});

*/

$(function(){
	$("#toggle").click(function(){			//.on("click",function(){})的简写形式
		if($(".me").css("display")=="block"){	//判断当前的DIV的显示隐藏状态
			//隐藏
			//hide()里面可以有两个参数，第二个参数表示隐藏起来以后接下来的动作
			//hide(1000,function(){alert("我隐藏起来了");});
			$(".me").hide(1000);		//1000毫秒内隐藏
			//$(".me").slideUp(1000);		//上下拉窗帘效果隐藏
			//$(".me").fadeOut(1000);		//渐隐效果
		}else if($(".me").css("display")=="none"){
			//显示
			$(".me").show(1000);		//1000毫秒内显示
			//$(".me").slideDown(1000);	//上下拉窗帘效果显示
			//$(".me").fadeIn(1000);		//渐出效果
		}

	});

});