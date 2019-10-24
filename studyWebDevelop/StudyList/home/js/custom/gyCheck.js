$(function () {
	mydo.init();
})

var mydo = (function () {
	
	var v_url_id ='';  //url传递的身份标识
	var v_url_param;

	var userId;
	var itemId;
	
	var BindControl = function () {

		$(".g_item dl").click(function() {
			var checkTypeId = $(this).attr("data-checkTypeId");			//判断点击是哪一个选项
			
			$(".g_item dl").find("i").removeClass('on');
			$(this).find("i").addClass('on');
			
			v_url_param =f_tool_scale_list(new Array(
								 		userId
									    ,itemId
									    ,checkTypeId
										));	
			
			window.location.href = "gyCkeckInfo.html?id="+v_url_param;
		})
	}
	
	//解析url参数
	var url_id_get =function(){		
		var v_kv_map =urlParam.get_kv_array();
		
		v_url_id =v_kv_map["id"];		
		v_url_id =decodeURI(v_url_id);
	}
  	
	return {
		init: function () {
			url_id_get();
			userId =f_tool_scale_get(v_url_id,1);
			itemId =f_tool_scale_get(v_url_id,3);
			
			BindControl();
		},
	}
})()



