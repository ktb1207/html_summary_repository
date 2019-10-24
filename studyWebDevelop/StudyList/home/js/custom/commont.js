$(function() {
		mydo.url_id();	
		mydo.init_page();
		mydo.init();	
})

var mydo = (function() {
	
	//需要的参数：接口+页面

	var v_user_id;
	var v_user_pic;
	var v_user_alias;
	
	
	var v_url_id;//url
	var v_tip_item_say;//提示文字
	
	

	var BindControl = function() {
		//点击：链接
		$("#s_info").click(function(){
			window.location.href ="commontDetail.html";
		})
	}


	
	//提示：设置
  	var f_show_tip =function(itip_say){
				var v_tip_item_say ='<i class="bd"></i>'+itip_say;
				$("#tip_item_say").html(v_tip_item_say);
				$("#tip_item").show();
				$("#tip_item").fadeOut(1500);  	
  	}
  	
	
	
	
	//解析url中id参数
		var url_id_get =function(){		
		var v_kv_map =urlParam.get_kv_array();
		
			v_url_id =v_kv_map["id"];	
			v_url_id =decodeURI(v_url_id);
			return v_url_id;			
	} 
	
	//初始化页面
	 var f_page_init=function(){
	 		v_user_id =f_tool_scale_get(v_url_id,1);
			v_user_pic  =f_tool_scale_get(v_url_id,2);// 用户头像
			v_item_alias =f_tool_scale_get(v_url_id,3);//用户名
		
		
			$("#v_user_pic").attr('src',pic.url_get(v_user_pic,1));
			$("#v_user_alias").html(v_item_alias);
			
			
			$("#v_user_pic_z").attr('src',pic.url_get(v_user_pic,1));
			$("#v_user_alias_z").html(v_item_alias+"支持了20元");
			$("#v_user_id").html(v_user_id);
		
	 }
		
	


	return {
		init : function(){
			BindControl();	
		},
		
	   //url参数：解析
		url_id : function() {
			url_id_get();
		},
		
			//,初始化页面
		init_page: function() {
			//f_user_orderList();
			f_page_init();
		}
	}
})()