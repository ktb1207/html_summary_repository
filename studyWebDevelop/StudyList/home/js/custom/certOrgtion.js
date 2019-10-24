$(function() {
	mydo.init();
	
})
var mydo = (function(){
	var v_url_param =""; //页面跳转参数
	var arrPic_orgPhoto = [];
	//var arrPic_certificate = [];
	var v_user_id;
	var v_url_id;

	var userId;
	var v_pic_gid;
	var v_pic_belong_id;
	
	var v_pic_type_id ="8"; //,图片类别ID

	var BindControl = function() {	
		
		$(document).delegate("#file_orgPhoto","change", function(e){
			uploadFile.showImg(e,$(this)[0],arrPic_orgPhoto,9);	
		})
				
		$("#btn_sbmVerify").click( function() {	
			//ulr参数		
			v_user_id =f_tool_scale_get(v_url_id,1);
			
			if(typeof(v_user_id) !="undefined" && v_user_id.length >0 && v_user_id !="0"){
				userId =v_user_id;				
			}
			else{
				f_show_tip("请求参数异常");
				return;				
			}			
			
			var orgName = $("#txt_orgName").val();//机构名称
			var contactPerson = $("#txt_contactPerson").val();//联系人
			var contactTele = $("#txt_contactTele").val();//联系电话
			
			var contactAddr = $("#txt_contactAddr").val();//联系地址
			var serviceArea = $("#txt_serviceArea").val();	//服务区域
			var serviceDirection= $("#txt_serviceDirection").val();	//公益方向
					
			//验证
			var f_chek_input=f_yeng(
				orgName,
				contactPerson,
				contactTele,
				contactAddr,
				serviceArea,
				arrPic_orgPhoto,
				serviceDirection				
			);
			if(f_chek_input ==1){
				f_show_tip(" 验证通过");
			}
			else{
				return;
			}
			
			//校验图片
			v_pic_gid ="1";
			v_pic_belong_id =v_pic_gid +userId;
			var pic_orgPhoto_arr = uploadFile.upload(
																		v_pic_belong_id
																		,v_pic_type_id
																		,arrPic_orgPhoto
																		,"http://test.huluteng.com/dopost/pic_upload_js");
				if(pic_orgPhoto_arr ==0){
					f_show_tip("图片上传未完成");
					return;
				}
         
			//分支Id，用户Id，组织名称，联系人，联系电话，联系地址，服务区域，公益方向，组织照片
			var v_branch_id ="19";
			var arr = f_tool_request_info(new Array(v_branch_id
																	   ,userId
																		,orgName
																		,contactPerson
																		
																		,contactTele
																		,contactAddr
																		,serviceArea
																		
																		,serviceDirection
																		,pic_orgPhoto_arr
																		));

			$.ajax({
				url: 'http://test.huluteng.com/dopost/h5',
				data: '{"myinfo":"","cmd":"A01.h5","info":"' + arr + '"}',
				type: 'post',
				dataType: 'json',
				success: function(data){
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
	
	//弹出的提示框
	var f_show_tip =function(itip_say){
				var v_tip_item_say ='<i class="bd"></i>'+itip_say;
				$("#tip_item_say").html(v_tip_item_say);
				$("#tip_item").show();
				setTimeout('$("#tip_item").hide()',1500);	
	}
	
	//校验
	var f_yeng=function(u_name,v_name,u_phone,u_id,u_vice,u_img,u_serviceDirection){
			var v_step =1;
			var v_counter =0;
			
			while(true){			
				switch (v_step){
					case 0: 
						//,验证码：校验						
						return 1;
					case 1:
						//机构名称：校验
						if(u_name.length>0){
							v_step =2;						
						}
						else{							
							v_tip_item_say ="请输入机构名称";
							f_show_tip(v_tip_item_say);		
							return;
						}
						break;
					
					case 2:
						//联系人：校验
						if(v_name.length>0){
							v_step =3;						
						}
						else{							
							v_tip_item_say ="请输入联系人";
							f_show_tip(v_tip_item_say);		
							return;
						}
						break;
						
					case 3:
						//联系电话：校验
						if(u_phone.length==11){
							v_step =4;						
						}
						else{							
							v_tip_item_say ="请输入联系电话";
							f_show_tip(v_tip_item_say);		
							return;
						}
						break;
						
					case 4:
						//联系地址：校验
						if(u_id.length>0){
							v_step =5;						
						}
						else{							
							v_tip_item_say ="请输入联系地址";
							f_show_tip(v_tip_item_say);		
							return;
						}
						break;
					
					case 5:
						//服务区域：校验
						if(u_vice.length>0){
							v_step =7;						
						}
						else{							
							v_tip_item_say ="请输入服务区域";
							f_show_tip(v_tip_item_say);		
							return;
						}
						break;			
						
						case 6:
						//组织机构认证照片是否上传：校验
						if(u_img.length ==0){
							v_tip_item_say ="请上传机构认证照片";
							f_show_tip(v_tip_item_say);		
							return;					
						}
						else{							
							v_step =0;	
						}
						break;	
						
						case 7:
						//组织机构认证照片是否上传：校验
						if(u_serviceDirection.length ==0){
							v_tip_item_say ="请输入公益方向";
							f_show_tip(v_tip_item_say);		
							return;					
						}
						else{							
							v_step =6;	
						}
						break;							


				}

				//,校验计数器				
				if(v_counter >7){
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
	//解析url参数
	var url_id_get =function(){		
		var v_kv_map =urlParam.get_kv_array();
		
		v_url_id =v_kv_map["id"];	
		v_url_id =decodeURI(v_url_id);
	} 
	
	return {
		init: function(){	
			url_id_get();
			BindControl();
		}	
	}	
})()