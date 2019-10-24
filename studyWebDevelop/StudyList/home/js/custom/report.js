$(function() {	
	mydo.url_id();	
	mydo.init_page();
	mydo.init();	
})


var mydo = (function(){
	var v_item_id;//项目id
	var v_user_id;//用户id
	var v_rep_desc;//举报理由
    var v_rep_con_way;//举报人联系方式
    
    var v_url_id; //url参数
    var v_url_param =""; //页面跳转参数
    //举报项目：url传递来的参数
    var v_user_pic;//发布者头像
    var v_item_alias;//项目名称
    
    
    
    
    

	var BindControl =function() {
		
		//注册协议：点击查看
		$("#do_report").click(function() {
			f_report();		
		})				
	}
	
  	//提示：设置
  	var f_show_tip =function(itip_say){
				var v_tip_item_say ='<i class="bd"></i>'+itip_say;
				$("#tip_item_say").html(v_tip_item_say);
				$("#tip_item").show();
				$("#tip_item").fadeOut(1500);  	
  	}

	//举报
	var f_report =function(){
		
		
		
		
		//url参数解析
		
		//输入
		v_item_id ='1';
		v_user_id ='1';
		v_rep_desc =$('#s_pt').val(); //举报理由值
		v_rep_con_way =$('#v_rep_con_way').val();//联系方式值
	
		var check=f_chk_report(v_rep_desc,v_item_id,v_user_id);//举报理由  
			if(check ==1){
				f_show_tip(" 验证通过");
			}
			else{
				return;
			}
										
										
		//分支id，来源id 1-h5，手机号，验证码id，验证码
		var v_branch_id ="8";
		var v_from_site_id ="1";
		var arr = f_tool_request_info(new Array(v_branch_id
																 ,v_from_site_id
																 ,v_item_id
																 
																 ,v_rep_desc
																 ,v_user_id
																 ,v_rep_con_way
																 ));
															 
		$.ajax({
			url: 'http://test.huluteng.com/dopost/h5',
			data: '{"myinfo":"","cmd":"A01.h5","info":"' + arr + '"}',
			type: 'post',
			dataType: 'json',
			success: function(data) {
				if (data.oret == "1") {
					v_tip_item_say ="举报成功";
					f_show_tip(v_tip_item_say);
					v_url_param =f_tool_scale_list(new Array(v_user_id));	
					setTimeout(function(){f_page_jump("1");},500);
				} 
				else if(data.oret == "0") {
					v_tip_item_say ="举报异常, 请稍后再试";
					f_show_tip(v_tip_item_say);	
				}
				else{
					v_tip_item_say ="举报异常, 请稍后再试";
					f_show_tip(v_tip_item_say);	
				}
			},
			error: function() {
					v_tip_item_say ="系统错误, 请稍后再试";
					f_show_tip(v_tip_item_say);					
			}
		})
	}
	
		//页面跳转
	var f_page_jump =function(jump_id){
		var v_url_href;

		switch(jump_id){
			case "0":
				v_url_href ="http://test.huluteng.com/dopost/h5_authorize/10?4";
				break;			
			case "1":
				v_url_href ="projectDetail.html"
							      +"?id="+v_url_param;				
				break;
			
		}
		
		window.location.href =v_url_href;
	}  	  	
	
	
  	
  	var f_chk_report=function(f_reason,v_item_id,v_user_id){
  		var v_step =2;
		var v_counter =0;
		
			while(true){			
				switch (v_step){
					case 0: 
						//,验证码：校验						
						
						return 1;
												
					case 1:
						//,手机号：校验
						if(f_reason.length==0){
							v_tip_item_say ="请输入举报理由";
							f_show_tip(v_tip_item_say);		
							return;		
						}
						else{							
							v_step =0;		
						}
						break;
						
					case 2:
						//,url参数：校验
						if(v_item_id.length ==0 || v_user_id.length ==0){
							v_tip_item_say ="请求参数有误";
							f_show_tip(v_tip_item_say);		
							return;		
						}
						else{							
							v_step =1;		
						}
						break;						
								
				}
				//,校验计数器				
				if(v_counter >2){
					v_tip_item_say ="系统错误：counter_max";
					f_show_tip(v_tip_item_say);		
					break;
				}		
				//,同步计数器位置
				v_counter =v_counter +1;
  			}
  	}
  	
 //解析url中id参数
	var url_id_get =function(){		
	var v_kv_map =urlParam.get_kv_array();
		v_url_id =v_kv_map["id"];
		v_url_id =decodeURI(v_url_id);
		return v_url_id;
	} 
	//初始化页面
	var f_user_info=function(){
		v_user_id =f_tool_scale_get(v_url_id,1);
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
						$('#v_item_alias').html(list.alias);//昵称
						$('#v_user_pic').attr('src',v_user_pic);//头像
						
						
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
	 		
	}
	

	
  	//返回
	return {
		//事件绑定
		init: function() {
			BindControl();
		},
		
		//取url参数
		url_id: function() {
			url_id_get();						
		},
		
		//,初始化页面
		init_page: function() {
			f_user_info();
			
		
		},
						
	}
	
	
})()