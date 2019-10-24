$(function() {
	mydo.init();
})

var mydo =(function() {
	var v_url_id;			   //页面输入参数
	var v_url_param =""; //页面跳转参数
	
	var v_user_id;		
	var v_item_id;
	var v_item_alias;
	
	var v_item_user_pic;
	var v_pay_coin;	

    var v_page_url;
	var v_config_info;	
	
	//事件绑定
	var BindControl =function(){
		//确认支付
		$("#do_pay").click(function() {				
			f_pay_wechat();
		});
	}
	
	//微信支付：下单+支付
	var f_pay_wechat=function(){		
		//捐助金额
		v_pay_coin =$("#v_pay_coin").val();
		if(v_pay_coin.length ==0){
			f_show_tip("请输入捐助金额");
			return;
		}
		
		//下单
		var arr= f_tool_request_info(new Array('24','1','1'
																,v_user_id
																,v_item_id
																,v_pay_coin
																));		
		$.ajax({
			url: "http://test.huluteng.com/dopost/h5",
			data: '{"myinfo":"","cmd":"A01.h5","info":"'+arr+'"}',
			type: "post",
			dataType: "json",
			success: function(data) {
				f_callback_suceess_pay(data);
			},
			error: function(e) {
				f_callback_error();
			}
		});
	}
	//接口回调：suceess
	var f_callback_suceess_pay =function(data){
		
		if(data.oret =='1'){
			var info = data.info;
			
			var appId 		  	=info[0].appId;
			var timeStamp	=info[0].timeStamp;			
			var nonceStr 		=info[0].nonceStr;
			
			var _package 		=info[0].package;
			var signType 		=info[0].signType;
			var paySign 		=info[0].paySign;
			//去支付
			f_pay_wechat_do(appId,timeStamp,nonceStr,_package,signType,paySign);
		}		
	}	
	
	//微信支付：调起
	var f_pay_wechat_do =function(appId,timeStamp,nonceStr,_package,signType,paySign){ 		
		WeixinJSBridge.invoke('getBrandWCPayRequest',{
			"appId": appId,
			"timeStamp": timeStamp,
			"nonceStr": nonceStr,
			"package": _package,
			"signType":signType,
			"paySign":paySign
		},function(res){				
	           if(res.err_msg == "get_brand_wcpay_request:ok") {	  
	           	    v_url_param =f_tool_scale_list(new Array(
											 		v_user_id	
											 		,v_item_id
													));		
	           		window.location.href ='projectDetail.html?id='+v_url_param;	           		
	           }//使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。

	           if(res.err_msg == "get_brand_wcpay_request:cancel") {
	           	    v_url_param =f_tool_scale_list(new Array(
											 		v_user_id	
											 		,v_item_id
													));      	
					window.location.href ='projectDetail.html?id='+v_url_param;	           	
	           }
		});
	}
	
	//接口回调：error
	var f_callback_error =function(){
			
	}	      
  	//提示：设置
  	var f_show_tip =function(itip_say){
		var v_tip_item_say ='<i class="bd"></i>'+itip_say;
		$("#tip_item_say").html(v_tip_item_say);
		$("#tip_item").show();
		setTimeout('$("#tip_item").hide()',1500);
  	}
	//解析url参数
	var url_id_get =function(){		
		var v_kv_map =urlParam.get_kv_array();
		
		v_url_id =v_kv_map["id"];		
		v_url_id =decodeURI(v_url_id);
	}  		
	//接口回调：error
	var f_callback_error =function(){
		v_tip_item_say ="操作异常";
		f_show_tip(v_tip_item_say);			
	}	
	
	return {
		init: function() {
			//url输入参数
			url_id_get();
			v_user_id =f_tool_scale_get(v_url_id,1);
			v_item_id =f_tool_scale_get(v_url_id,2);
			v_item_alias =f_tool_scale_get(v_url_id,3);
		   	v_item_user_pic =f_tool_scale_get(v_url_id,4);
		   		   
		    //页面初始化
		   	v_item_user_pic =pic.url_get(v_item_user_pic,1);
		   	$("#v_item_user_pic").attr("src",v_item_user_pic);
		   	$("#v_item_alias").html(v_item_alias);

		    //事件绑定
			BindControl();			
		}	
	}
})()