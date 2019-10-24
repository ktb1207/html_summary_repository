$(function(){

	mydo.url_id();
	mydo.init_page();
	mydo.init();
});

var mydo =(function(){
	var v_user_id;//用户id
	var v_user_pic;//发布者头像
	var v_phone;//手机号

	var v_user_alias;
	var v_user_alias_new;
	var v_url_id;
	var arrPic_orgPhoto = [];		//用户修改图片
	var v_pic_gid;							//校验图片
	var v_pic_belong_id;
	var v_pic_type_id ="8"; //,图片类别ID
	
	var v_counter =0;
	var a_status =0;
	
	var BindControl = function() {
		
		//图片上传
		$(document).delegate("#file_orgPhoto","change",function(e){
			$(".upload_item").remove();
			arrPic_orgPhoto=[];
			uploadFile.showImg(e, $(this),arrPic_orgPhoto,9);		
		});
		
		//头像：弹出
		$("#dl_picture").click(function(){
			$(".s_pic").css("display","block");					
		});		
	
	 	//确认上传图片
	 	var ChangeImg = function(){
			$(".upload_item").remove();
			//校验图片
			v_pic_gid ="1";
			v_pic_belong_id =v_pic_gid +v_user_id;
			var pic_orgPhoto_arr = uploadFile.upload(
																	v_pic_belong_id
																	,v_pic_type_id
																	,arrPic_orgPhoto
																	,"http://test.huluteng.com/dopost/pic_upload_js");
			//alert(pic_orgPhoto_arr);
			pic_orgPhoto_arr =pic_orgPhoto_arr.split(",")[0];
			//alert(pic_orgPhoto_arr);
			if(pic_orgPhoto_arr ==0){
				f_show_tip("图片上传未完成");
				//return;
			}else{
				f_show_tip("图片上传成功");
			}
			
			var v_branch_id ="34";			//分支ID
			var v_come_id ="1";				//来源ID
			
			var arr = f_tool_request_info(new Array(v_branch_id
																					,v_come_id
																					,v_user_id
																					,pic_orgPhoto_arr
																));
			//$(".upload_item").remove();								//清空input选中的图片文件
			$.ajax({
			url: 'http://test.huluteng.com/dopost/h5',
			data: '{"myinfo":"","cmd":"A01.h5","info":"' + arr + '"}',
			type: 'post',
			dataType: 'json',
			success: function(data){
				if (data.oret == "1") {
					$(".s_pic").css("display","none");					
					var r_user_pic = pic_orgPhoto_arr;
					v_user_pic =pic.url_get(r_user_pic,1);
					//更换图片显示
					$('#v_user_pic').attr('src',v_user_pic);
				}
				else if(data.oret == "0") {
					v_tip_item_say ="认证异常, 请稍后再试";
					f_show_tip(v_tip_item_say);	
				}
				else{
					 
					v_tip_item_say ="认证异常, 请稍后再试";
					f_show_tip(v_tip_item_say);	
				}
			},
			error: function() {
				v_tip_item_say ="系统错误, 请稍后再试";
				f_show_tip(v_tip_item_say);		
			}
		});
		a_status=0;
	};
		//确认修改头像
		$("#btn_sbmVerify").bind("click",function(){
				if(a_status==0){
					a_status=a_status+1;
					ChangeImg();
				}else{
					return;
				}
		});
		//用户名: 弹出
		//alert($("#dl_userName"));
		$("#dl_userName").click(function(){			
			$(".pop").css("display", "block");
		});
		//用户名：确定
		$("#a_ok").click(function(){							
			$(".pop").css("display", "none");
			v_user_alias_new = $("#txtr_newUserName").val();	
			$("#txtr_newUserName").val('');
			f_alias_reset();
		});		
		//用户名：取消
		$("#a_cancel").click(function() {
			$(".pop").css("display", "none");
			$("#txtr_newUserName").val('');
		});

		//链接：app下载
		$("#dl_downloadApp").click(function() {
			window.location.href = "myApp.html";
		});
		//链接：关于葫芦藤
		$("#dl_about").click(function() {			
			window.location.href = "myAbout.html";
		});
	}
	
	//提示：设置
  	var f_show_tip =function(itip_say){
				var v_tip_item_say ='<i class="bd"></i>'+itip_say;
				$("#tip_item_say").html(v_tip_item_say);
				$("#tip_item").show();
				setTimeout('$("#tip_item").hide()',1500);
  	}

	//修改用户名
	var f_alias_reset =function(){
		
		v_user_id =f_tool_scale_get(v_url_id,1);//用户id
		
		//url参数：校验
		if(v_user_id.length==0 || v_user_pic.length==0){
			v_tip_item_say ="请求失败";
			f_show_tip(v_tip_item_say);
			return;
		}else{
			
		}
		//输入：校验
		if(v_user_alias_new.length ==0){
			v_tip_item_say ="请输入用户名";
			f_show_tip(v_tip_item_say);	
			return;
		}
		else{
			$("#v_user_alias").html(v_user_alias_new);
		}
					
		//分支id   
		var v_branch_id ="12";
		var v_from_site_id ="1";
		var arr = f_tool_request_info(new Array(v_branch_id
																  ,v_user_id
																 ,v_user_alias_new	
																 ,v_from_site_id
																 ));
		$.ajax({
			url: 'http://test.huluteng.com/dopost/h5',
			data: '{"myinfo":"","cmd":"A01.h5","info":"' + arr + '"}',
			type: 'post',
			dataType: 'json',
			success: function(data) {
				if (data.oret == "1") {
					v_tip_item_say ="用户名修改成功";
					f_show_tip(v_tip_item_say);	
				} 
				else if(data.oret == "0") {
					v_tip_item_say ="操作异常, 请稍后再试";
					f_show_tip(v_tip_item_say);	
				}
				else{
					v_tip_item_say ="操作异常, 请稍后再试";
					f_show_tip(v_tip_item_say);	
				}
			},
			error: function() {
					v_tip_item_say ="系统错误, 请稍后再试";
					f_show_tip(v_tip_item_say);					
			}
		})
	}
   
	//解析url中id参数																																													
		var url_id_get =function(){		
			var v_kv_map =urlParam.get_kv_array();
			v_url_id =v_kv_map["id"];	
			v_url_id =decodeURI(v_url_id);
			//v_url_id ="2101,8,19,11,2Question120160304020840_1_115011145972";							//测试用，需删除
			return v_url_id;			
	} 
	   
	 //初始化页面
	 var f_page_init=function(){
	 		var v_branch_id ="26";			//分支ID
			var v_come_id ="1";				//来源ID
	 		v_user_id=f_tool_scale_get(v_url_id,1);
	 		var arr = f_tool_request_info(new Array(v_branch_id
																						,v_come_id
																						,v_user_id
																	));
	 		
	 		$.ajax({
				url: 'http://test.huluteng.com/dopost/h5',
				data: '{"myinfo":"","cmd":"A01.h5","info":"' + arr + '"}',
				type: 'post',
				dataType: 'json',
				success: function(data){
					if (data.oret == "1") {
						var list = data.info[0];
						
						var r_user_pic = list.pic;
						//alert(list.pic);
						v_user_pic =pic.url_get(r_user_pic,1);
						
						$('#v_user_alias').html(list.alias);//昵称
						$('#v_user_pic').attr('src',v_user_pic);//头像
						$('#v_phone').html(list.phone_no);			//手机号
					} 
					else if(data.oret == "0") {
						v_tip_item_say ="认证异常, 请稍后再试";
						f_show_tip(v_tip_item_say);	
					}
					else{
						v_tip_item_say ="认证异常, 请稍后再试";
						f_show_tip(v_tip_item_say);	
					}
				},
				error: function() {
					v_tip_item_say ="系统错误, 请稍后再试";
					f_show_tip(v_tip_item_say);		
				}
			});
			
	 }
   
	return {
		//事件：绑定
		init : function() {
			BindControl();			
		},
		//url参数：解析
		url_id : function() {
			url_id_get();
		},
		//页面：初始化
		init_page: function() {
			f_page_init();
		},
}
		

})()