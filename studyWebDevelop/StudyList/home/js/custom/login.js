$(function() {
	$("#tip_head").hide();
	login.init();	
})

var login =(function() {
	var v_url_param =""; //页面跳转参数
	
	var cur_codeId = "";
	var userId = "";
	var v_tip_item_say="";	

	var BindControl = function() {
		
		//注册协议：点击查看
		$("#serviceBtn").click(function() {
			$(".s_xmtk").removeClass('hide');
		})

		//注册协议：点击, 知道了
		$("#s_xm_btn").click(function() {
			$(".s_xmtk").addClass('hide');
		})

		//验证码：点击获取
		$("#btn_VerifyCode").click(function() {
			var phoneNum = $("#txt_phoneNum").val();	
			if(String(phoneNum).length ==11){
				GetVerificationCode(phoneNum);
			}
			else{
				v_tip_item_say ="请输入手机号";
				f_show_tip(v_tip_item_say);
			}			
			
		})
		
		//
		$("#do_wechat").click(function() {
			f_page_jump("0");
		})		

		//登录：点击登录
		$("#btn_login").click(function() {
			var phoneNum = $("#txt_phoneNum").val();
			var code = $("#txt_VerifyCode").val();
			var v_step =1;
			var v_counter =0;
			
			while(true){			
				switch (v_step){
					case 0: 
						//,验证码：校验						
						f_login(
									 phoneNum
									 ,cur_codeId
									 ,code									  
									 );
						return;
												
					case 1:
						//,手机号：校验
						if(phoneNum.length ==11){
							v_step =3;						
						}
						else{							
							v_tip_item_say ="请输入手机号";
							f_show_tip(v_tip_item_say);		
							return;
						}
						break;
						
						
					case 2:
						//,验证码：校验
						if(code.length ==5){
							v_step =0;						
						}
						else{							
							v_tip_item_say ="请输入验证码";
							f_show_tip(v_tip_item_say);		
							return;
						}										
						break;
						
					case 3:
						//,验证码：校验已获取
						if(String(cur_codeId).length >0){
							v_step =2;						
						}
						else{							
							v_tip_item_say ="请点击获取验证码";
							f_show_tip(v_tip_item_say);		
							return;
						}									
						break;						
				}
				//,校验计数器				
				if(v_counter >4){
					v_tip_item_say ="系统错误：counter_max";
					f_show_tip(v_tip_item_say);		
					break;
				}		
				//,同步计数器位置
				v_counter =v_counter +1;
  			}
			//
		})
	}
  
  	//提示：设置
  	var f_show_tip =function(itip_say){
				var v_tip_item_say ='<i class="bd"></i>'+itip_say;
				$("#tip_item_say").html(v_tip_item_say);
				$("#tip_item").show();
				setTimeout('$("#tip_item").hide()',1500);
  	}
  	
  	//验证码：获取
	var GetVerificationCode =function(phone_num) {
		//分支id，来源id 1-h5，作用类别Id 1-登录，手机号
		var arr = f_tool_request_info(new Array("1", "1", "1", String(phone_num)));

		$.ajax({
			url: 'http://test.huluteng.com/dopost/h5',
			data: '{"myinfo":"","cmd":"A01.h5","info":"' +arr +'"}',
			type: 'post',
			dataType: 'json',
			success: function(data) {
				if (data.oret == "1") {
					cur_codeId = data.info[0].vcode_id;
					//alert(cur_codeId);
					v_tip_item_say ="验证码已发送, 请注意查收";
					f_show_tip(v_tip_item_say);	
				} 
				else{
					v_tip_item_say ="验证码获取异常, 请稍后再试";
					f_show_tip(v_tip_item_say);	
				}
			},
			error: function() {
					v_tip_item_say ="系统错误, 请稍后再试";
					f_show_tip(v_tip_item_say);	
			}
		})
	}

	//登录
	var f_login =function(
									iphone_no
									,icode_id
									,icode
									){
		//分支id，来源id 1-h5，手机号，验证码id，验证码
		var v_branch_id ="3";
		var v_from_site_id ="1";
		var arr = f_tool_request_info(new Array(v_branch_id
																 ,v_from_site_id
																 ,iphone_no
																 ,icode_id
																 ,icode
																 ));
		$.ajax({
			url: 'http://test.huluteng.com/dopost/h5',
			data: '{"myinfo":"","cmd":"A01.h5","info":"' + arr + '"}',
			type: 'post',
			dataType: 'json',
			success: function(data) {
					f_callback_success_login(data)
					},
			error: function() {
					f_callback_error();
					}
		})
	}
	//接口回调：sucees
	var f_callback_success_login =function(data){
		if (data.oret == "1") {
			v_tip_item_say ="登录成功";
			f_show_tip(v_tip_item_say);			
			
			var v_user_id;
			var v_alias;
			var v_pic;
			
			var v_phoneNO;
			var v_from_page_id;
		
			v_from_page_id ="4";
			v_user_id =data.info[0].user_id;
			v_alias =data.info[0].alias;
			v_pic =data.info[0].pic;
			v_phoneNO =data.info[0].phone_no;
			v_url_param =f_tool_scale_list(new Array(
								 		v_user_id
									    ,v_alias
									    ,v_pic	
									    
									    ,v_phoneNO									    
										));																
			//jump					
			f_page_jump(v_from_page_id);			
		} 
		else if(data.oret == "0") {
			v_tip_item_say ="登录异常, 请稍后再试";
			f_show_tip(v_tip_item_say);	
		}
		else{
			v_tip_item_say ="登录异常, 请稍后再试";
			f_show_tip(v_tip_item_say);	
		}				
	}
	
	//接口回调：error
	var f_callback_error =function(){
		v_tip_item_say ="操作异常";
		f_show_tip(v_tip_item_say);			
	}	
	//页面跳转
	var f_page_jump =function(jump_id){
		var v_url_href;

		switch(jump_id){
			case "0":
				v_url_href ="http://test.huluteng.com/dopost/h5_authorize/10?4";
				break;			
			case "1":
				v_url_href ="projectIndex.html"
							      +"?id="+v_url_param;				
				break;
			case "2":
				v_url_href ="launch.html"
							      +"?id="+v_url_param;				
				break;
			case "3":
				v_url_href ="null.html"
							      +"?id="+v_url_param;				
				break;
			case "4":
				v_url_href ="myHome.html"
								  +"?id="+v_url_param;
				break;				
			default:			
				v_url_href ="null.html"
							      +"?id="+v_url_param;
				break;
		}
		
		window.location.href =v_url_href;
	}  		

	return {
		init: function() {
			BindControl();
		}	
	}
})()