$(function () {
	gyStat.url_id();
	gyStat.init_page();
	gyStat.init();
})

var gyStat = (function () {
	
	var v_url_id;
	var user_id;
	var user_pic;
	var item_name;
	var proId;
	var proTypeId;
	
	var BindInfo = function () {
		//分支Id，来源Id 1-h5，统计类别Id，目标Id
		var arr = f_tool_request_info(new Array("32","1",proTypeId +"",proId +""));
		
		$.ajax({
			url: 'http://test.huluteng.com/dopost/h5',
			data: '{"myinfo":"","cmd":"A01.h5","info":"' + arr + '"}',
			type: 'post',
			dataType: 'json',
			success: function(data){
				if(data.oret == "1") {
					$("#p_name_sptPerson").html(data.info[0].alias);
					$("#spn_num_sptPerson").html(data.info[0].count);

					$("#p_name_sptMoney").html(data.info[1].alias);
					$("#spn_num_sptMoney").html(data.info[1].count);

					$("#p_name_readPerson").html(data.info[2].alias);
					$("#spn_num_readPerson").html(data.info[2].count);

					$("#p_name_share").html(data.info[3].alias);
					$("#spn_num_share").html(data.info[3].count);

					//今日
					$("#p_name_tdy_sptPerson").html(data.info[4].alias);
					$("#em_num_tdy_sptPerson").html(data.info[4].count);

					$("#p_name_tdy_sptMoney").html(data.info[5].alias);
					$("#em_num_tdy_sptMoney").html(data.info[5].count);

					$("#p_name_tdy_readPerson").html(data.info[6].alias);
					$("#em_num_tdy_readPerson").html(data.info[6].count);

					$("#p_name_tdy_share").html(data.info[7].alias);
					$("#em_num_tdy_share").html(data.info[7].count);
				}
				else {
					//alert(data);
				}
			},
			error: function() {
				//alert("异常!");
			}
		});
		
		
	}
	
	//解析url中id参数
	var url_id_get =function(){		
		var v_kv_map =urlParam.get_kv_array();
		v_url_id =v_kv_map["id"];
		v_url_id =decodeURI(v_url_id);
		return v_url_id;
	} 

	return {
		init: function () {
			BindInfo();
		},
		// 取url参数
		url_id: function(){
			url_id_get();	
		},	
		//初始化页面
		init_page: function(){	
			user_id = f_tool_scale_get(v_url_id,1);
			proId = f_tool_scale_get(v_url_id,3);
			proTypeId = f_tool_scale_get(v_url_id,4);
			user_pic   =f_tool_scale_get(v_url_id,2);	//发布者头像		
			item_name =f_tool_scale_get(v_url_id,5);	//项目名称	
			$('#v_item_alias').html(item_name);			
			$('#v_user_pic').attr('src',user_pic);
		}
	}
})()