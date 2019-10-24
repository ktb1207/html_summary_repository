//jQuery控制菜单的显示和隐藏效果

$(function(){
	//班级管理绑定单击事件
	$(".cc").on("click",function(){
		//判断班级信息的状态
		if($("#ccs").css("display")=="none"){
			$("#ccs").slideDown(500);
		}else if($("#ccs").css("display")=="block"){
			$("#ccs").slideUp(500);
		};
		//将其他显示的列表隐藏
		$("#vvs").slideUp(500);
		$("#qqs").slideUp(500);
		$("#xxs").slideUp(500);
		$("#zzs").slideUp(500);
		$("#sss").slideUp(500);
		$("#tts").slideUp(500);
	});
	//视频管理绑定单击事件
	$(".vv").on("click",function(){
		//判断班级信息的状态
		if($("#vvs").css("display")=="none"){
			$("#vvs").slideDown(500);
		}else if($("#vvs").css("display")=="block"){
			$("#vvs").slideUp(500);
		};
		//将其他显示的列表隐藏
		$("#ccs").slideUp(500);
		$("#qqs").slideUp(500);
		$("#xxs").slideUp(500);
		$("#zzs").slideUp(500);
		$("#sss").slideUp(500);
		$("#tts").slideUp(500);
	});
	//权限管理绑定单击事件
	$(".qq").on("click",function(){
		//判断班级信息的状态
		if($("#qqs").css("display")=="none"){
			$("#qqs").slideDown(500);
		}else if($("#qqs").css("display")=="block"){
			$("#qqs").slideUp(500);
		};
		//将其他显示的列表隐藏
		$("#ccs").slideUp(500);
		$("#vvs").slideUp(500);
		$("#xxs").slideUp(500);
		$("#zzs").slideUp(500);
		$("#sss").slideUp(500);
		$("#tts").slideUp(500);
	});
	//校务管理绑定单击事件
	$(".xx").on("click",function(){
		//判断班级信息的状态
		if($("#xxs").css("display")=="none"){
			$("#xxs").slideDown(500);
		}else if($("#xxs").css("display")=="block"){
			$("#xxs").slideUp(500);
		};
		//将其他显示的列表隐藏
		$("#ccs").slideUp(500);
		$("#vvs").slideUp(500);
		$("#qqs").slideUp(500);
		$("#zzs").slideUp(500);
		$("#sss").slideUp(500);
		$("#tts").slideUp(500);
	});
	//账单管理绑定单击事件
	$(".zz").on("click",function(){
		//判断班级信息的状态
		if($("#zzs").css("display")=="none"){
			$("#zzs").slideDown(500);
		}else if($("#zzs").css("display")=="block"){
			$("#zzs").slideUp(500);
		};
		//将其他显示的列表隐藏
		$("#ccs").slideUp(500);
		$("#vvs").slideUp(500);
		$("#qqs").slideUp(500);
		$("#xxs").slideUp(500);
		$("#sss").slideUp(500);
		$("#tts").slideUp(500);
	});
	//收益统计绑定单击事件
	$(".ss").on("click",function(){
		//判断班级信息的状态
		if($("#sss").css("display")=="none"){
			$("#sss").slideDown(500);
		}else if($("#sss").css("display")=="block"){
			$("#sss").slideUp(500);
		};
		//将其他显示的列表隐藏
		$("#ccs").slideUp(500);
		$("#vvs").slideUp(500);
		$("#qqs").slideUp(500);
		$("#xxs").slideUp(500);
		$("#zzs").slideUp(500);
		$("#tts").slideUp(500);
	});
	//退出登录绑定单击事件
	$(".tt").on("click",function(){
		//判断班级信息的状态
		if($("#tts").css("display")=="none"){
			$("#tts").slideDown(500);
		}else if($("#tts").css("display")=="block"){
			$("#tts").slideUp(500);
		};
		//将其他显示的列表隐藏
		$("#ccs").slideUp(500);
		$("#vvs").slideUp(500);
		$("#qqs").slideUp(500);
		$("#xxs").slideUp(500);
		$("#zzs").slideUp(500);
		$("#sss").slideUp(500);
		
	});





});