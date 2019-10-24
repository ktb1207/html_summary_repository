
$(function(){
	domit.pagestart();
	domit.init();
});

var domit = (function(){
	//数组保存轮播器图片
	var picArr=new Array();
		picArr[0]="../image/banner-1.jpg";
		picArr[1]="../image/banner-2.jpg";
		picArr[2]="../image/banner-3.jpg";
		picArr[3]="../image/banner-4.jpg";
		picArr[4]="../image/banner-5.jpg";
	
	//页面点击控制部分
	var BindControl = function(){
		$("#pro").hover(function(){
			$(this).parent().find(".pro").show();
		},function(){
			$(this).parent().find(".pro").hide();
		});
		
	}
	//页面加载初始化
	var StartPage = function(){
		
		var index = 0;			//轮播去计数器
		var bar_index = 4;
		//轮播器初始化从第一张开始
		$("#lunboqi>img").attr("src",picArr[index]);
		$("#banner>div").eq(bar_index).css("background-color","#CD0000");
		//自增函数
		var picauto = function(){
			index++;
			bar_index--;
			if(index==picArr.length){
				index = 0;
			}
			if(bar_index<0){
				bar_index = 4;
			}
			$("#lunboqi>img").attr("src",picArr[index]);
			$("#banner>div").css("background-color","#1C1C1C");
			$("#banner>div").eq(bar_index).css("background-color","#CD0000");
		};
		//循环定时
		var clear = setInterval(picauto,2000);
		//鼠标移入停止滚动，离开继续滚动
		$("#lunboqi").hover(function(){
			clearInterval(clear);
		},function(){
			clear = setInterval(picauto,2000);
		})
		//鼠标移入数字条轮播器显示对应图片
		$("#banner>div").mouseover(function(){
			var num;
			var tt = $(this).index();
			switch(tt){
				case 0:
					num = 4;
					break;
				case 1:
					num = 3;
					break;
				case 2:
					num = 2;
					break;
				case 3:
					num = 1;
					break;
				case 4:
					num = 0;
					break;	
			}
			$("#lunboqi>img").attr("src",picArr[num]);
			$("#banner>div").css("background-color","#1C1C1C");
			$("#banner>div").eq(tt).css("background-color","#CD0000");
		});
		
		
		
		
		
		
	}
	
	
	return {
		init:function(){
			BindControl();
		},
		pagestart:function(){
			StartPage();
		}
	}
	
	
})();






















