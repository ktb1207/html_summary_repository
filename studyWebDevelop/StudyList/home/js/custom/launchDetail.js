$(function(){
	mydo.init();
})

var mydo=(function(){
	
	
	var BindControl=function(){
		$("#s_d_btn").click(function(){
			window.location.href="launchProject.html";
		})
		$("#s_d_btn_subbtn").click(function(){
			window.location.href="";
		})
	}
	
	return{
		//事件绑定
		init: function () {			
			BindControl();
		}
	}
})()
