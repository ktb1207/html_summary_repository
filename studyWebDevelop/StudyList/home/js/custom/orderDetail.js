$(function() {
	mydo.url_id();
	mydo.init_page();
	//mydo.init();
})

var mydo = (function(){	
	//需要的参数：接口+页面
		
		var v_category_id;//订单类别
		var v_order_id;//订单id
		var v_time_id;//支付时间
		
		var v_type_id;//订单类别
		var v_order_no_id;//支付单号
		var v_order_coin;//订单金额
		
		var v_item_id;//项目id
		var v_item_alias//项目名称
		var v_user_id="4";
	
		var v_url_to;	//接口
		var v_url_id;//url
		var v_tip_item_say;//提示文字
	
	//解析url中id参数
		var url_id_get =function(){		
				var v_kv_map =urlParam.get_kv_array();
				v_url_id =v_kv_map["id"];	
				v_url_id =decodeURI(v_url_id);
				//alert(v_url_id);
				return v_url_id;			
		} 
	 //提示：设置
  		var f_show_tip =function(itip_say){
				var v_tip_item_say ='<i class="bd"></i>'+itip_say;
				$("#tip_item_say").html(v_tip_item_say);
				$("#tip_item").show();
				$("#tip_item").fadeOut(1500);  	
  	}
  
  	  	
  	//用户：获取用户数据
		  		var f_user_info =function(){  
		  			v_category_id = f_tool_scale_get(v_url_id,1);
		  			v_order_id = f_tool_scale_get(v_url_id,2);
		  			//alert(v_category_id);
		  			//alert(v_order_id );
		  			
		 		//分支id
				var v_branch_id ="28";
				
				var arr = f_tool_request_info(new Array(v_branch_id
																		 ,v_category_id//订单类别
																		 ,v_order_id//订单
																	));
													
				$.ajax({
					url: 'http://test.huluteng.com/dopost/h5',
					data: '{"myinfo":"","cmd":"A01.h5","info":"' + arr + '"}',
					type: 'post',
					dataType: 'json',
					success: function(data) {
					
						if (data.oret == "1") {
						
							v_tip_item_say ="请求成功";
							f_show_tip(v_tip_item_say);	
		
							v_category_id=data.info[0].order_type_id;//订单类别
							v_order_id=data.info[0].pay_id;//订单
							
							v_time_id=data.info[0].logdate;//支付时间
							v_type_id=data.info[0].pay_type_id;//支付方式
							v_order_no_id=data.info[0].order_no;//支付单号
							
							v_order_coin=data.info[0].order_coin;//订单金额
							v_item_id=data.info[0].item_id;//项目id
							v_item_alias=data.info[0].item_alias;//项目名称
							
							$("#b_orderCoin").text(v_order_coin);//支付金额
							$("#dd_payTime").html(v_time_id);//支付时间
							$("#dd_payTypeName").html(v_type_id);//支付方式
							$("#dd_payNum").html(v_order_no_id);//支付单号
							
							$("#b_payResult").text();//支付结果
							$("#b_projectStatus").html();//项目状态
							$("#dd_nickname").html(v_item_alias);//用户昵称
						
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

    	
  	
	return {
		init : function() {
			BindControl();
		},
		
		//url参数：解析
		url_id : function() {
			url_id_get();			
		},

		//页面：初始化
		init_page : function() {
			f_user_info();			
		},		
		
	}
})()