$(function() {
	mydo.url_id();
	mydo.init_page();
	mydo.init();
})

var mydo = (function(){	
	//需要的参数：接口+页面
	var v_user_id;//用户id
	var v_user_pic;//头像
	var v_user_alias;//项目名称
	
	var v_user_phone;	//联系人电话
	var v_url_to;	//接口
	
	//url参数：跳转来的 
	//例如 http://test.huluteng.com/wjun/A01/page/myHome.html?id=4
	var v_url_id;//url
	var v_tip_item_say;//提示文字
	
	////链接：个人设置
	var BindControl = function() {
		$("#dl_setting").click(function() {		
			window.location.href = "mySetting.html?id="+v_url_to;
		})
		//评论：链接
		$("#commont").click(function(){
			window.location.href ="commont.html?id="+v_url_to;
			})
		
		//官方动态：链接
		$("#news").click(function(){
			
			window.location.href ="news.html?id="+v_url_to;
			})
		
		//我的钱包：链接
		$("#mywallet").click(function(){
		
			window.location.href ="wallet.html?id="+v_url_to;
			})
		
		//我的账本：链接
		$("#mybook").click(function(){
	
			window.location.href ="orderbook.html?id="+v_url_to;
			})
			
		//我的认证：链接
		$("#certindex").click(function(){
	
			window.location.href ="certIndex.html?id="+v_url_to;
			})
		
		//帮助中心：链接
		$("#mhelpcenter").click(function(){
	
			window.location.href ="mhelpCenter.html?id="+v_url_to;
			})
		
		//首页：链接
		$("#do_bottom_01").click(function(){
			
			
			window.location.href ="projectIndex.html?id="+v_url_to;
			})
		//发起：链接
		$("#do_bottom_02").click(function(){
		
			window.location.href ="launch.html?id="+v_url_to;
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
	   
	//提示：设置
  	var f_show_tip =function(itip_say){
				var v_tip_item_say ='<i class="bd"></i>'+itip_say;
				$("#tip_item_say").html(v_tip_item_say);
				$("#tip_item").show();
				$("#tip_item").fadeOut(1500);  	
  	}
  	  	
  	//页面初始化
  	var f_user_info =function(){  
  		//解析用户id
  		v_user_id =f_tool_scale_get(v_url_id,1);
  		var v_branch_id ="26";			//分支ID
		var v_come_id ="1";				//来源ID
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
						v_user_pic =pic.url_get(r_user_pic,1);
						$('#v_user_alias').html(list.alias);//昵称
						$('#v_user_pic').attr('src',v_user_pic);//头像
						$("#v_user_phone").html("手机号："+list.phone_no);		//手机号
						
					} 
					else if(data.oret == "0") {
						v_tip_item_say ="认证异常, 请稍后再试";
						f_show_tip(v_tip_item_say);	
					}
					else{
						v_tip_item_say ="异常, 请稍后再试";
						f_show_tip(v_tip_item_say);	
					}
				},
				error: function() {
					v_tip_item_say ="系统错误, 请稍后再试";
					f_show_tip(v_tip_item_say);		
				}
		});
  		//list追加id值		
		 //v_user_id="1";
		v_url_to =f_tool_scale_list(new Array(
				v_user_id
				));
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