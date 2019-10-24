$(function() {	
	//$("#div_done").hide();	
	certPerson.init();
	
})

var certPerson = (function(){
	var v_url_param =""; //页面跳转参数
	
	var arrPic_Hand = [];
	var arrPic_Card_Front = [];
	var arrPic_Card_Back = [];
	var arrPic_Card = [];
	
	var v_user_id ="0";
	var v_pic_gid;
	var v_pic_belong_id;
	
	var v_pic_type_id ="8"; //,图片类别ID
	var BindControl = function() {

		//身份证手持照片：点击
		$("#img_IDCardHand").click(function() {			
			$("#file_IDCardHand").trigger("click"); 
		})
		
		//身份证手持照片：修改
		$("#file_IDCardHand").bind("change", function(e){
			var file = $(this)[0].files[0];
			//为了保证用户修改图片不上传多个图片，初始化数组
			arrPic_Hand = [];
			arrPic_Hand.push(file);

			uploadFile.changeImg(e, $(this));
		})

		//身份证正面：点击
		$("#img_IDCardFront").click(function() {
			$("#file_IDCardFront").trigger("click");
		})
		
		//身份证正面：修改
		$('#file_IDCardFront').bind("change", function(e) {
			var file = $(this)[0].files[0];

			arrPic_Card_Front = [];
			arrPic_Card_Front.push(file);

			uploadFile.changeImg(e, $(this));
		})

		//身份证反面：点击
		$("#img_IDCardBack").click(function() {
			$("#file_IDCardBack").trigger('click');
		})
		
		//身份证反面：修改
		$('#file_IDCardBack').bind("change", function(e) {
			var file = $(this)[0].files[0];

			arrPic_Card_Back = [];
			arrPic_Card_Back.push(file);

			uploadFile.changeImg(e, $(this));
		})

		//提交验证
		$("#btn_sbmVerify").bind("tap", function() {
			//ulr参数
			v_user_id =f_tool_scale_get(v_url_id,1);
			if(typeof(v_user_id) !="undefined" 
				&& v_user_id.length >0 
				&& v_user_id !="0"
				){
			}
			else{
				f_show_tip("请求参数异常");
				return;				
			}
			
			var v_check_passed01;

			//
			var trueName = $("#txt_trueName").val();
			var tele = $("#txt_tele").val();
			var IDCard = $("#txt_IDCard").val();

			//校验：输入
			v_check_passed01 =f_check_input(
								trueName
								,tele
								,IDCard
								);
			if(v_check_passed01 ==1){				
			}
			else{
				return;
			}
	
			//
			arrPic_Card = arrPic_Card_Front.concat(arrPic_Card_Back);  //身份证正反面	
			//校验：图片
			v_check_passed01 =0;
			v_check_passed01 =f_check_pic(
															arrPic_Hand
															,arrPic_Card
															);
			if(v_check_passed01 ==1){	
			}
			else{
				return;
			}

			//图片上传：手持照片
			v_pic_gid ="1";
			v_pic_belong_id =v_pic_gid +v_user_id;
			var pic_Hand_arr = uploadFile.upload(
																	v_pic_belong_id
																	,v_pic_type_id
																	,arrPic_Hand
																	,"http://test.huluteng.com/dopost/pic_upload_js"
																	);
			if(pic_Hand_arr ==0){
				f_show_tip("图片上传未完成");
				return;
			}

			//图片上传：身份证正反面照片
			v_pic_gid ="2";
			v_pic_belong_id =v_pic_gid +v_user_id;
			var pic_Card_arr = uploadFile.upload(
																	v_pic_belong_id
																	,v_pic_type_id
																	,arrPic_Card
																	,"http://test.huluteng.com/dopost/pic_upload_js"
																	);
			if(pic_Card_arr ==0){
				f_show_tip("图片上传未完成");
				return;
			}			
		  //f_show_tip("图片上传完成");
			//分支id, 用户id，真实姓名，电话，身份证号，手持身份证照片，身份证正反照片
			var v_branch_id ="18";
			var arr = f_tool_request_info(new Array(v_branch_id				
																 ,v_user_id
																 ,trueName
																 ,tele
																 
																 ,IDCard
																 ,pic_Hand_arr
																 ,pic_Card_arr
																));
		$.ajax({
			url: 'http://test.huluteng.com/dopost/h5',
			data: '{"myinfo":"","cmd":"A01.h5","info":"' + arr + '"}',
			type: 'post',
			dataType: 'json',
			success: function(data) {
				if (data.oret == "1") {
					v_tip_item_say ="认证已提交";
					f_show_tip(v_tip_item_say);	
					v_url_param =f_tool_scale_list(new Array(v_user_id));	
					setTimeout(function(){f_page_jump("4");},500);		
				} 
				else if(data.oret == "0") {
					v_tip_item_say ="认证异常, 请稍后再试";
					f_show_tip(v_tip_item_say);	
				}
				else{
					v_tip_item_say ="认证异常, 请稍后再试";
					f_show_tip(v_tip_item_say);	
				}
			},
			error: function() {
					v_tip_item_say ="系统错误, 请稍后再试";
					f_show_tip(v_tip_item_say);					
			}
		});
		})
	}
	
	//提示：设置
  	var f_show_tip =function(itip_say){  			
  			   
				var v_tip_item_say ='<i class="bd"></i>'+itip_say;
				$("#tip_item_say").html(v_tip_item_say);
				$("#tip_item").show();
				setTimeout('$("#tip_item").hide()',1500);								
  	}
  	//校验：图片
  	var f_check_pic =function(
  											 v_pic_hand
  											 ,v_pic_id  										
  											){
  		  											
			var v_step =1;
			var v_counter =0;
			
			while(true){			
				switch (v_step){
					case 0: 
						//,返回
						return 1;
												
					case 1:
						//,手持身份证图片：校验
						if(v_pic_hand.length ==0){
							v_tip_item_say ="需选定__手持身份证的图片";
							f_show_tip(v_tip_item_say);		
							return;				
						}
						else{				
							v_step =2;		
						}
						break;
												
					case 2:
						//,身份证正反面：校验
						if(v_pic_id.length ==2){
							v_step =0;						
						}
						else{							
							v_tip_item_say ="需选定__身份证正反面图片";
							f_show_tip(v_tip_item_say);		
							return;
						}										
						break;
										
				}
				//,校验计数器				
				if(v_counter >3){
					v_tip_item_say ="系统错误：counter_max";
					f_show_tip(v_tip_item_say);		
					break;
				}		
				//,同步计数器位置
				v_counter =v_counter +1;
  			}  												

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
  	//校验：输入
  	var f_check_input =function(
  											 v_real_name
  											 ,v_phone_no
  											 ,v_ID
  											){
  												
			var v_step =1;
			var v_counter =0;
			
			while(true){			
				switch (v_step){
					case 0: 
						//,返回
						return 1;
												
					case 1:
						//,真实姓名：校验
						if(v_real_name.length ==0){
							v_tip_item_say ="请输入真实姓名";
							f_show_tip(v_tip_item_say);		
							return;				
						}
						else{							
							v_step =2;		
						}
						break;
												
					case 2:
						//,手机号：校验
						if(v_phone_no.length ==11){
							v_step =3;						
						}
						else{							
							v_tip_item_say ="请输入联系电话";
							f_show_tip(v_tip_item_say);		
							return;
						}										
						break;
						
					case 3:
						//,身份证号：校验
						if(String(v_ID).length >0){
							v_step =0;						
						}
						else{							
							v_tip_item_say ="请输入身份证号";
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
  	}
  											
	var url_id_get =function(){		
		var v_kv_map =urlParam.get_kv_array();
		
		v_url_id =v_kv_map["id"];			
		v_url_id =decodeURI(v_url_id);
	}  											

	return {
		init: function() {
			url_id_get();
			BindControl();
		}
	}
})();