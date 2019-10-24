$(function() {
	mydo.init();	
})

var mydo =(function() {	
	var v_url_param;	
	var BindControl = function() {
				
		//跳转：查看项目
		$("#do_view").click(function() {
			v_url_param =v_url_id;
			f_page_jump(1);
		})		
		
	}
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
				v_url_href ="projectDetail.html";
				break;
			default:
				v_url_href ="null.html";
				break;
		}
		
		window.location.href =v_url_href +"?id="+v_url_param;
	}       
	
	return {
		init: function() {
			url_id_get();
			BindControl();	
		}	
	}
})()