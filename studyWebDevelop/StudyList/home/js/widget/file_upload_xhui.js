var uploadFile =(function(){
	var v_upload_flag ="0";
	
	var base = function(pic_belong_id, pic_type_id, arrPic, url){
		var pic_name_arr = [];
						
		for (var i = 0; i < arrPic.length; i++) {
			var pic_name = CurentTime2(0) + "_" + i + "_" + pic_belong_id;
			var a = pic_name + "";
			var b = arrPic[i].size + "";
			var arr_data = f_tool_scale_list(new Array(pic_type_id, a, b));

			Upload(arrPic[i], arr_data, url);
			if(v_upload_flag ==1){
				pic_name_arr.push(pic_name)
			}
			else{
				return 0;	
			}			
		}

		return pic_name_arr;
	}

	var CurentTime2 = function(num) {
		var now = new Date();      
		var year = now.getFullYear();       //年
		var month = now.getMonth() + 1;     //月
		var day = now.getDate() + parseInt(num); //日       
		var hh = now.getHours();            //时
		var mm = now.getMinutes();          //分
		var ss = now.getSeconds();          //秒     
		var clock = year;     
		if(month < 10)
		    clock += "0";      
		clock += month;     
		if(day < 10)
		    clock += "0";           
		clock += day;       
		if(hh < 10)
		    clock += "0";           
		clock += hh;
		if (mm < 10) clock += '0'; 
		clock += mm; 
		if (ss<10)
		    clock+="0";
		clock+=ss;
		return(clock); 
	}

	var Upload = function(f, fn, url) {
		var fd = new FormData();
		
		fd.append("fileid", fn);
		fd.append("fileToUpload", f);
		
		var xhr = new XMLHttpRequest();       
		
        xhr.addEventListener("load", uploadComplete, false);
        xhr.open("POST", url);
        xhr.send(fd);        
	}

	var uploadComplete = function(evt) {		/* This event is raised when the server send back a response */    		
        if(evt.target.responseText ==1){
            v_upload_flag ="1";
        }        
	}

	var displayImg = function(e, control) {
		if (!(window.File && window.FileList && window.FileReader && window.Blob)) {
			//alert("你的浏览器不支持上传！");
			return;
		};

		var cWidth;
		if (document.compatMode == "BackCompat") {
			cWidth = document.body.clientWidth;
		}
		else {
			cWidth = document.documentElement.clientWidth;
		}
		var imgwidth=parseInt(cWidth/4);
		$(".upload-list .upload_action").css("height",imgwidth);

		e = e || window.event;
		var files = e.target.files,
		reg = /image\/.*/i;
		for (var i = 0,f; f = files[i]; i++) {
			if (!reg.test(f.type)) {
				//alert("请选择图片");
				continue;
			}
			var reader = new FileReader();
			reader.onload = (function(file) {
				return function(e) {
					var img = new Image();
					img.addEventListener("load", imgLoaded, false);
					img.src = e.target.result;
					function imgLoaded() {
						$(control).parents(".upload-list").append("<li class='upload_item' style='height:"+imgwidth+"px; background: url("+e.target.result+") 50% 50% / cover;'><a href='javascript:void(0);' class='upload_delete' title='删除'></a><img src='"+e.target.result+"' class='upload_image loading_img'></li>");
						$(".upload_delete").click(function(e) {
							$(this).parent().remove();
						});
					}
				}
			})(f);
			reader.readAsDataURL(f);
		}
	}

	var replaceImg = function(e, control) {
		if (!(window.File && window.FileList && window.FileReader && window.Blob)) {
			//alert("你的浏览器不支持上传！");
			return;
		};

		e = e || window.event;
		var files = e.target.files,
		reg = /image\/.*/i;
		for (var i = 0,f; f = files[i]; i++) {
			if (!reg.test(f.type)) {
				//alert("请选择图片");
				continue;
			}
			var reader = new FileReader();
			reader.onload = (function(file) {
				return function(e) {
					var img = new Image();
					img.addEventListener("load", imgLoaded, false);
					img.src = e.target.result;
					function imgLoaded() {
						var control_id = $(control).prop("id");
						var img_id = "img_" + control_id.split("_")[1];
						$("#" + img_id).prop("src", e.target.result);
					}
				}
			})(f);
			reader.readAsDataURL(f);
		}
	}

	return {
		upload : function(pic_belong_id, pic_type_id, arrPic, url){
			return base(pic_belong_id, pic_type_id, arrPic, url)
		},
		showImg : function(e, control) {
			displayImg(e, control)
		},
		changeImg : function(e, control) {
			replaceImg(e, control)
		}
	}
})()