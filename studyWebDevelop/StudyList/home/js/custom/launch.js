$(function() {
	mydo.init();	
})

var mydo =(function() {	
	var v_url_id;
	var v_url_param;
	
	var v_user_id;
	var v_user_type_id;
	var v_user_type_checked_01 =0;
	
	var v_item_type_id;
	
	var BindControl = function() {
				
		//资金去向
		$("#do_help_01").click(function() {
			$("#view_01").removeClass();
		})
		$("#do_see_01").click(function() {
			$("#view_01").addClass('hide');
		})		
		
		//使用帮助
		$("#do_help_02").click(function() {
			$("#view_02").removeClass();
		})		
		$("#do_see_02").click(function() {
			$("#view_02").addClass('hide');
		})		
		
		//跳转：发布
		$("#do_jump_01").click(function() {			
			v_item_type_id ="1";
			f_api_user_type();			
		})			
		$("#do_jump_02").click(function() {
			var v_user_id =f_tool_scale_get(v_url_id,1);
			if(v_user_id.length >0){			
			}
			else{
				return;
			}
			v_item_type_id ="2";
			v_url_param =f_tool_scale_list(new Array(
											v_user_id
											,v_item_type_id
											));
			f_page_jump(1);
		})				
		
	}
	//接口：获取用户类型
	var f_api_user_type=function(){
		var v_from_site_id ="1";
		v_user_id =f_tool_scale_get(v_url_id,1);
		var v_data_id ="1";
		if(v_user_id.length >0){			
		}
		else{
			return;
		}
		if(v_user_type_checked_01 ==1){
			f_show_tip("需认证为组织");
			return;
		}		
			
		var arr = f_tool_request_info(new Array("36"
																	,v_from_site_id
																	,v_user_id
																	,v_data_id
																	));

		$.ajax({
			url: 'http://test.huluteng.com/dopost/h5',
			data: '{"myinfo":"","cmd":"A01.h5","info":"' +arr +'"}',
			type: 'post',
			dataType: 'json',
			success: function(data) {
					f_callback_successs_utype(data);
					},
			error: function() {
					f_callback_error_utype();
					}
		})		
	}
	var f_callback_successs_utype =function(data){
		v_user_type_checked_01 =1;
		if (data.oret =="1") {
			v_user_type_id =data.info[0].user_type_id;		
			if(v_user_type_id =="1"){
				v_url_param =f_tool_scale_list(new Array(
									v_user_id
									,v_item_type_id
									));										
				f_page_jump(1);
			}
			else{	
				f_show_tip("需认证为组织");		
				return;
			}
		}	
		else{
			f_show_tip("需认证为组织");
		}
	}
	var f_callback_error_utype =function(){
		
	}
	
	//
	
	//url参数：解析id
	var url_id_get =function(){		
		var v_kv_map =urlParam.get_kv_array();
		
		v_url_id =v_kv_map["id"];		
		v_url_id =decodeURI(v_url_id);		
	}	
	
	//页面跳转
	var f_page_jump =function(jump_id){
		var v_url_href;
		
		switch(jump_id){
			case 1:
				v_url_href ="launchProject.html";
				break;
			default:
				v_url_href ="null.html";
				break;
		}
		
		window.location.href =v_url_href +"?id="+v_url_param;
	}       
  	//提示：设置
  	var f_show_tip =function(itip_say){
				var v_tip_item_say ='<i class="bd"></i>'+itip_say;
				$("#tip_item_say").html(v_tip_item_say);
				$("#tip_item").show();
				setTimeout('$("#tip_item").hide()',1500);	
  	}  	
	
	return {
		init: function() {
			url_id_get();
			BindControl();	
		}	
	}
})()