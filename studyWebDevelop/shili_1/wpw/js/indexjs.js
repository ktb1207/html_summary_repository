//js部分
$(function(){
	$("img.lazy").lazyload();
	//header区域菜单效果,设置延迟下拉显示时间400ms，
	function slide(aclass){
		aclass.hover(function(){
			//aclass.find("div").slideDown(400);
			aclass.find("img").attr("src","image/shang.png");
			delay=setTimeout(function(){
				aclass.find("div").slideDown(400);
			},400);
		},function(){
			clearTimeout(delay);
			aclass.find("div").slideUp(400);
			aclass.find("img").attr("src","image/xia.png");
		});
	}
	slide($(".awp"));
	slide($(".asc"));
	slide($(".agh"));
	//input框获得焦点自动清空文本框内容
	$("#text1").focus(function(){
		if($("#text1").val()=="请输入关键词"){
			$("#text1").val("");
		}
		
	});
	$("#text1").blur(function(){
		if($("#text1").val()==""){
			$("#text1").val("请输入关键词");
		}
		
	});
	//修改左侧导航栏背景斑马线
	$("#daohang_left>div:odd").css("background","#1f1f1f");
	//作则导航区域滑动显示效果,如果鼠标悬停时间小于400ms则不会显示
	function hudong(Adiv){
		var bg="";
		Adiv.hover(function(){
			var color = Adiv.css("background-color");
			bg=color;
			Adiv.css("background-color","#d10e03");
			delaytime=setTimeout(function(){
				Adiv.find("div").fadeIn(300);
			},400);
			//Adiv.find("div").fadeIn(300);
		},function(){
			Adiv.css("background-color",bg);
			clearTimeout(delaytime);
			Adiv.find("div").eq(0).fadeOut(300);
		})
	}
	//调用方法
	hudong($("#aa"));
	hudong($("#bb"));
	hudong($("#cc"));
	hudong($("#dd"));
	hudong($("#ee"));
	hudong($("#ff"));
	hudong($("#gg"));
	hudong($("#hh"));
	hudong($("#kk"));
	hudong($("#mm"));

/******************轮播器********************/
	//定义一个数组保存背景图片的src地址
	var picArr=new Array();
		picArr[0]="image/lunbo1.jpg";
		picArr[1]="image/lunbo2.jpg";
		picArr[2]="image/lunbo3.jpg";
		picArr[3]="image/lunbo4.jpg";
		picArr[4]="image/lunbo5.jpg";
	//定义轮播器记数器
		var index=0;
	//轮播器初始化，从第一张开始
	$("#lunbo img").attr("src",picArr[index]);
	$("#nav div").eq(index).css("background-color","#2d2d2d");
	//自增函数方法
	function navAuto(){
			index++;
			if(index==picArr.length){
				index=0;
			}
			$("#lunbo img").attr("src",picArr[index]);
			$("#nav div").css("background","#a1a1a1");
			$("#nav div").eq(index).css("background-color","#2d2d2d");
	};
	//调用函数
	var clear=setInterval(navAuto,2000);
	//导航按钮鼠标移入则暂停滚动背景图片滚动
	$("#lunbo").hover(function(){
		clearInterval(clear);
	},function(){
		clear=setInterval(navAuto,2000);
	});
	$("#nav div").mouseover(function(){
		
		//$("#nav div").index(this)使用索引index()获取鼠标在哪个按钮上
		$("#lunbo img").attr("src",picArr[$("#nav div").index(this)]);
		$("#nav div").css("background","#a1a1a1");
		$("#nav div").eq($("#nav div").index(this)).css("background-color","#2d2d2d");
		
	});

	
});


	