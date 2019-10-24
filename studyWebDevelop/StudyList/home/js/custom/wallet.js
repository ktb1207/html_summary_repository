$(function() {
	wallet.url_id();
	wallet.init_page();
	wallet.init();
})

var wallet = (function() {
	var v_url_id;												//接口参数
	var v_url_to;												//接口参数
	var userId;													//用户id
	var BindControl = function() {
		$("#dl_withdraw").click(function() {
			window.location.href = "walletDraw.html?id="+v_url_to;
		});

		$("#dl_myBankCard").click(function() {
			window.location.href = "bankList.html?id="+v_url_to;
		});
		
		//首页：链接
		$("#do_bottom_01").click(function(){
			window.location.href ="projectIndex.html?id="+v_url_to;
			})
		//发起：链接
		$("#do_bottom_02").click(function(){
			window.location.href ="launchProject.html?id="+v_url_to;
			})
		//公益主页：链接
		$("#do_bottom_03").click(function(){
			window.location.href ="gyIndex.html?id="+v_url_to;
			})
	}
	
	//解析url中id参数
		var url_id_get =function(){		
			var v_kv_map =urlParam.get_kv_array();
			v_url_id =v_kv_map["id"];	
			v_url_id =decodeURI(v_url_id);
			return v_url_id;			
	} 
	//页面初始化
		var f_user_info =function(){  
  		//解析用户id
  			userId =f_tool_scale_get(v_url_id,1);

		//分支id，来源id 1-h5，用户id
			var arr = f_tool_request_info(new Array("29", "1", userId));
			
			$.ajax({
				url: 'http://test.huluteng.com/dopost/h5',
				data: '{"myinfo":"","cmd":"A01.h5","info":"' + arr + '"}',
				type: 'post',
				dataType: 'json',
				success: function(data){
					if(data.oret == "1") {
						$("#dd_balance").html(data.info[0].coin_left + "元");
						//alert(data.info[0].coin_left);
					}
					else {
						alert(data);
					}
				},
				error: function() {
					alert("异常!");
				}
			});
		//}
  		//list追加id值		
	
		v_url_to =f_tool_scale_list(new Array(
							userId
						));
  	}
	
	

	return {
		init: function() {
			BindControl();
		},
		//url参数：解析
		url_id : function() {
			url_id_get();			
		},

		//页面：初始化
		init_page : function() {
			f_user_info();			
		}
	}
})()