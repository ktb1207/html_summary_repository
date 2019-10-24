$(function() {
	mydo.url_id();
	mydo.init_page();
	mydo.init();
	
	
})
var mydo = (function(){
	var v_item_id;//项目id
	var v_user_id;//用户id
	var v_describe;//进度描述
	var v_arrPic =[];//进度图片
    
	//alert(v_arrPic.length);
	var v_pic_gid;
	var v_pic_belong_id;
	var v_pic_type_id ="2"; //,图片类别ID
	
	var v_user_pic;//发布者头像
	var v_item_alias;//项目名称
	var v_url_param =""; //页面跳转参数
	
	var delayshow;
	var delaygo
	
	var BindControl = function() {

		$("#file_detail").change(function(e){
			//var file = $(this)[0].files[0];
			//v_arrPic.push(file);
			uploadFile.showImg(e,$(this)[0],v_arrPic,9);															
		})

			
		var confirm = function(){
			
			if(typeof(v_user_id) !="undefined" && v_user_id.length >0 && v_user_id !="0"){
				userId =v_user_id;
			}
			else{
				f_show_tip("请求参数异常");
				return;				
			}			
			
			 v_describe = $("#v_update").val();//更新内容
			 
			//验证
			var check=f_updata(
							v_describe,v_arrPic
			);
			if(check ==1){
				//f_show_tip(" 更新通过");
			}
			else{
				return;
			}
			
			//校验图片
			v_pic_gid ="1";
			v_pic_belong_id =v_pic_gid +v_user_id;		//userId												//arrPic_orgPhoto
			//alert(v_pic_belong_id);
			var pic_orgPhoto_arr = uploadFile.upload(
																						v_pic_belong_id
																						,v_pic_type_id
																						,v_arrPic
																						,"http://test.huluteng.com/dopost/pic_upload_js"
																						);
			
			
			//alert(pic_orgPhoto_arr);
          //分支id 进度描述    进度图片组  项目id     用户id
        
			var v_branch_id ="13";	
			var arr = f_tool_request_info(new Array(v_branch_id
																	  ,v_describe
																	  ,pic_orgPhoto_arr
																	  ,v_item_id
																	  ,v_user_id
																		));
			
			$.ajax({
				url: 'http://test.huluteng.com/dopost/h5',
				data: '{"myinfo":"","cmd":"A01.h5","info":"' + arr + '"}',
				type: 'post',
				dataType: 'json',
				beforeSend:function(){
					$(".btn").css("background-color","#666666");
					$("#v_confirm").unbind("click");
				},
				success: function(data){
					if (data.oret == "1") {
						v_tip_item_say ="更新已提交";
						v_url_param =f_tool_scale_list(new Array(v_user_id));	

						delayshow = setTimeout(function(){
							f_show_tip(v_tip_item_say);
							f_page_jump("1");
						},1500);
						$("#v_update").val("");										//清空描述内容
						$(".upload_item").remove();								//移除上传图片
						$("#file_detail").val("");										//清空上传图片
						
					} 
					else if(data.oret == "0") {
						v_tip_item_say ="更新异常, 请稍后再试";
						f_show_tip(v_tip_item_say);	
					}
					else{
						v_tip_item_say ="更新异常, 请稍后再试";
						f_show_tip(v_tip_item_say);	
					}
				},
				complete:function(){
					$(".btn").css("background-color","#ee554d");
					$("#v_confirm").bind("click",confirm);
					
				},
				error: function() {
					v_tip_item_say ="系统错误, 请稍后再试";
					f_show_tip(v_tip_item_say);		
				}
			});
		};
		
		clearTimeout(delayshow);
		
		
		$("#v_confirm").bind("click",confirm);
		
	}
	
	//弹出的提示框
	var f_show_tip =function(itip_say){
				var v_tip_item_say ='<i class="bd"></i>'+itip_say;
				$("#tip_item_say").html(v_tip_item_say);
				$("#tip_item").show();
				setTimeout('$("#tip_item").hide()',1500);	
	}
	
		//页面跳转
	var f_page_jump =function(jump_id){
		var v_url_href;

		switch(jump_id){
			case "0":
				v_url_href ="http://test.huluteng.com/dopost/h5_authorize/10?4";
				break;			
			case "1":
				v_url_href ="gyIndex.html"
							      +"?id="+v_url_param;				
				break;
			
		}
		
		window.location.href =v_url_href;
		
	}  	  	
	
	//校验
	var f_updata=function(v_update_content,v_picture){
			var v_step =1;
			var v_counter =0;
			
			while(true){			
				switch (v_step){
					case 0: 
						//,验证码：校验						
						return 1;
					case 1:
						//更新内容：校验
						if(v_update_content.length>0){
							v_step =0;						
						}
						else{							
							v_tip_item_say ="请输入要更新的内容";
							f_show_tip(v_tip_item_say);		
							return;
						}
						break;
					
					
				}

				//,校验计数器				
				if(v_counter >2){
					v_tip_item_say ="系统错误：counter_max";
					f_show_tip(v_tip_item_say);		
					break;
				}		
				//,同步计数器位置
				v_counter =v_counter +1;
  			}						
	}
	
	//解析url中id参数
	var url_id_get =function(){		
	var v_kv_map =urlParam.get_kv_array();
		v_url_id =v_kv_map["id"];
		v_url_id =decodeURI(v_url_id);
		return v_url_id;
	} 
	
	return {
		//事件绑定
		init: function(){
			//f_show_tip("11111111");
			BindControl();
		},
		
		// 取url参数
		url_id: function(){
			url_id_get();	
		},	
		
		//初始化页面
		init_page: function(){	
			v_user_id = f_tool_scale_get(v_url_id,1);//用户
			v_item_id = f_tool_scale_get(v_url_id,3);// 项目
			v_user_pic   =f_tool_scale_get(v_url_id,2);	//发布者头像		
			v_item_alias =f_tool_scale_get(v_url_id,5);	//项目名称	
			$('#v_item_alias').html(v_item_alias);			
			$('#v_user_pic').attr('src',v_user_pic);
		},		
	}	
	
	
	
})();