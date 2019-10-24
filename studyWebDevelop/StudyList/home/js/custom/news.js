
$(function(){
	mydo.init();
})

var mydo=(function(){
	var BindControl=function(){
		//链接
		$("#bom").click(function(){
			window.location.href="newsDeta.html";
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
		init : function() {
			BindControl();
		}
	}
		
})()
