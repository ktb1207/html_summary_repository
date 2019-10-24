// JavaScript Document
require.config({
	paths : {
		'jquery' : '../lib/jquery-1.8.3.min',
		'jqueryMb': '../lib/jquery.mobile-1.4.5.min',
		'iscroll' : '../util/iscroll'
	},
	shim : {
		'jqueryMb':{
			deps : ['jquery'],
			exports : '_'
		}
	}
});


require(['jquery','jqueryMb','iscroll'], function(jquery,jqueryMb,iscroll) {
	
	//缓存元素对象
	var _sTyl = $(".s_tyl");
	var _wrapper = $("#wrapper");
	var _sType = $(".s_type");
	var _listLi = $(".list li");
	
	var hDom = $(document).height(); //文档高度
	var hWid = $(window).height(); //屏幕可视高度
	
	//项目类型list
	_sType.click(function(){
		setTimeout(function(){
			
			_sTyl.height(hDom);
			_wrapper.height(0.8*hWid);
			_sTyl.show();
			setTimeout(function(){
				_wrapper.removeClass("translateInY").addClass("translateInY");
				myScroll = new iScroll('wrapper');
				document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
				//document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
			},100);
		},500);
	});
	
	_listLi.bind('tap',function(){
		_sTyl.hide();
	});
	
	//点击弹起项目条款
	$("#serviceBtn").bind("tap",function(){
		$(".s_xmtk").height(hDom);
		$(".s_xmtk").show();
	})
	
	$("#s_xm_btn").bind('tap',function(){
		$(".s_xmtk").hide();
	});
	
	$("#s_zy_btn").bind('tap',function(){
		$(".s_zysx").hide();
	});
	
	
	/**************上传图片*****************/
	var cWidth;
	if (document.compatMode == "BackCompat") {
		cWidth = document.body.clientWidth;
	}
	else {
		cWidth = document.documentElement.clientWidth;
	}
	var imgwidth=parseInt(cWidth/4);
	$(".upload-list .upload_action").css("height",imgwidth);
	  var filesInput = document.getElementById("fileImage");
	function getFiles(e) {
		e = e || window.event;
		var files = e.target.files,
		reg = /image\/.*/i;
		for (var i = 0,f; f = files[i]; i++) {
			if (!reg.test(f.type)) {
				alert("请选择图片");
				continue;
			}
			var reader = new FileReader();
			reader.onload = (function(file) {
				return function(e) {
					var img = new Image();
					img.addEventListener("load", imgLoaded, false);
					img.src = e.target.result;
					function imgLoaded() {
						$(".upload-list").append("<li class='upload_item' style='height:"+imgwidth+"px; background: url("+e.target.result+") 50% 50% / cover;'><a href='javascript:void(0);' class='upload_delete' title='删除'></a><img src='"+e.target.result+"' class='upload_image loading_img'></li>");
						$(".upload_delete").click(function(e) {
							$(this).parent().remove();
						});
					}
				}
			})(f);
			reader.readAsDataURL(f);
		}
	}
	if (window.File && window.FileList && window.FileReader && window.Blob) {
		filesInput.addEventListener("change", getFiles, false);
		
	} else {
	   alert("您的浏览器不支持上传");
	}
});