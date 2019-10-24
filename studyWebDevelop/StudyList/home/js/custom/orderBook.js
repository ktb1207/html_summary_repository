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
	var v_url_to;
	var v_tip_item_say;//提示文字
	
	var cur_page_num =1;
	var cur_page_size = 30;


	var BindControl = function() {
		$(document).scroll(function(event) {
			var viewH = $(this).height(),
			contentH = $(this).find("body").height(),
			scrollTop = $(this).scrollTop();
			//滚动条滚动到屏幕95%的时候就加载数据
			if (scrollTop / (viewH - contentH) >= 0.95) {
				//alert("Loading info");
				cur_page_num =Number(cur_page_num) + 1;
				f_user_orderList();
			}
			
		})
			
			//点击：链接
		$(".s_order").delegate(".s_oList", "click", function() {
			var $this = $(this);
			var orderTypeId = $this.attr("data-TypeId");													//订单类别ID
			var orderId = $this.attr("data-PayId");																//订单ID
			
			v_url_to =f_tool_scale_list(new Array(
				orderTypeId
				,orderId
				));
	
			//window.location.href = "orderDetail.html?orderType=" + orderTypeId + "&orderId=" + orderId;
			window.location.href = "orderDetail.html?id=" +v_url_to;
		})
	}


	var ChangePage = function(page_num, page_size) {
		$("#dl_loading").css("display", "block");

	}
	
	//提示：设置
  	var f_show_tip =function(itip_say){
				var v_tip_item_say ='<i class="bd"></i>'+itip_say;
				$("#tip_item_say").html(v_tip_item_say);
				$("#tip_item").show();
				$("#tip_item").fadeOut(1500);  	
  	}
  	
	
	var f_user_orderList =function(){  	
		
		//v_user_id =v_url_id;   
		//分支Id，起始页码，页大小，用户Id
		var v_branch_id="27";		
		var v_user_id="1";																											//测试定义值，需删除
		var arr = f_tool_request_info(new Array(v_branch_id
																  ,String(cur_page_num)
																  ,String(cur_page_size)
																  ,String(v_user_id)
																  ));

		$.ajax({
			url: 'http://test.huluteng.com/dopost/h5',
			data: '{"myinfo":"","cmd":"A01.h5","info":"' + arr + '"}',
			type: 'post',
			dataType: 'json',
			success: function(data) {
				$("#dl_loading").css("display", "none");

				if(data.oret == "1") {
					v_tip_item_say ="请求成功";
					f_show_tip(v_tip_item_say);	
								
					var str_arr ="";
					
					for(var i = 0, length = data.info.length; i < length; i++) {
						
							str_arr =str_arr +'<dl class="s_oList on"'
												   +'  '+'data-TypeId="'+data.info[i].order_type_id+'"'
												   +'  '+'data-PayId="'+data.info[i].pay_id+'"'
												   +'>';
							
							str_arr =str_arr +'<dt>';
							str_arr =str_arr +'<img id="v_user_pic" src="'+pic.url_get(data.info[i].user_pic,1)+'" width="100%" />';
							str_arr =str_arr +'</dt>';
							
							str_arr =str_arr +'<dd class="mid">';
							str_arr =str_arr +'<p id="v_user_alias">'+data.info[i].item_alias+'</p>';
							str_arr =str_arr +'<b>已确认</b>';
							str_arr =str_arr +'</dd>';
							
							str_arr =str_arr +'<dd class="rig">';
							str_arr =str_arr +'<p>'+data.info[i].order_coin+'</p>';
							str_arr =str_arr +'<time>'+data.info[i].logdate+'</time>';
							str_arr =str_arr +'</dd>';
							
							str_arr =str_arr +'</dl>';									
					}
							
					$("#dl_loading").before(str_arr);
				}
				else {
					//alert(data);
					v_tip_item_say ="暂无账单数据";
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
			
			return v_url_id;			
	} 
	
	//初始化页面
	 var f_page_init=function(){
	 		//alert(v_url_id);
	 		v_user_id =f_tool_scale_get(v_url_id,1);
			v_user_pic  =f_tool_scale_get(v_url_id,2);// 用户头像
			v_item_alias =f_tool_scale_get(v_url_id,3);//用户名5
			
			$("#v_user_pic").attr('src',pic.url_get(v_user_pic,1));
			$("#v_user_alias").html(v_item_alias);
			
			f_user_orderList();
			
			
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