$(function () {
	mydo.init_page();
	mydo.init();
})


var mydo =(function () {
	//
	var v_item_end_ymd;
	//
	var v_user_id;
	var v_user_type_id;
	
	var v_coin_target;
	var v_coin_usage;
	
	var v_item_begin;
	var v_item_end;
	var v_item_type_id;
	
	var v_item_act_address;
	var v_item_alias;
	var v_item_desc;	
	//
	var arrPic_cover = [];
	var arrPic_detail = [];
	
	//
	var v_pic_gid;
	var v_pic_belong_id;
	var v_pic_type_id ="2"; //,图片类别ID
	
	var  v_url_id;  //url参数
	var v_item_id;
	
	//
	var v_slide_first_first =0;
	
	var BindControl = function () {
		$("#s_zy_btn").click(function () {
			$("#div_notice").addClass('hide');
		})

		$("#serviceBtn").click(function () {
			$("#div_clause").removeClass('hide');
		})

		$("#s_xm_btn").click(function () {
			$("#div_clause").addClass('hide');
		})

		$("#v_day_count").bind("change",function () {			
			var v_count=$("#v_day_count").prop('value');		
			$("#time_end").html(date.ymd_next(v_item_end_ymd,v_count));
		})
	
		$("#nswitch").bind("change",function () {			
			if($("#nswitch").prop("checked")){
				alert("checked");
			}			
		})
				
		$("#file_cover").bind("change", function(e){
			var file = $(this)[0].files[0];
			arrPic_cover.push(file);
			
			uploadFile.showImg(e, $(this));
		})

		$("#file_detail").bind("change", function(e){
			var file = $(this)[0].files[0];
			arrPic_detail.push(file);

			uploadFile.showImg(e, $(this));
		})

		$("#a_publish").click(function () {
			PublishItem();
		})
		/*点击项目类型*/
		$("#v_item_type").click(function () {
			$("#wrapper").css("top","-78%");
			$(".s_tyl").removeClass('hide');
			
			$(".list_m li").click(function(){
				$(".s_tyl").addClass('hide');
				$("#mid").text($(this).text());
			});
		})
		
	}

	var PublishItem = function () { window.location.href="launchSuccess.html";return;
		v_user_id =f_tool_scale_get(v_url_id,1);
		v_user_type_id =f_tool_scale_get(v_url_id,2);
		
		 v_user_id ="1";
		 v_user_type_id ="1";
		 v_coin_target =$("#v_coin_target").val();
		 v_coin_usage =$("#v_coin_usage").val();
		 
		 v_item_begin ="";
		 v_item_end =$("#v_day_count").prop('value');
		 
		 v_item_type_id ="1";
		 v_item_act_address =$("#v_item_act_address").val();
		 
		 v_item_alias =$("#v_item_alias").val();
		 v_item_desc =$("#v_item_desc").val();
         //校验
         var v_check_passed_01=f_check_input();        
         if(v_check_passed_01){         	
         }
         else{
         	return;
         }
		//图片：封面图片
		v_pic_gid ="1";
		v_pic_belong_id =v_pic_gid +v_user_id;
		var pic_cover_arr =uploadFile.upload(
																	v_pic_belong_id
																	,v_pic_type_id
																	,arrPic_cover
																	,"http://test.huluteng.com/dopost/pic_upload_js"
																	);
															
	   	if(pic_cover_arr ==0){
				f_show_tip("图片上传未完成");
				return;
		}
		//图片：非封面图片
		v_pic_gid ="1";
		v_pic_belong_id =v_pic_gid +v_user_id;
		var pic_detail_arr = uploadFile.upload(
																	v_pic_belong_id
																	,v_pic_type_id
																	,arrPic_detail
																	,"http://test.huluteng.com/dopost/pic_upload_js"
																	);
	    if(pic_detail_arr ==0){
				f_show_tip("图片上传未完成");
				return;
		}
       f_show_tip("图片上传完成");
		//
		var arr = f_tool_request_info(new Array("4"
																  	,v_user_id
																  	,v_user_type_id
																  	,v_item_alias
																  	
																  	,v_coin_target
																  	,v_coin_usage
																  	,v_item_begin
																  	
																  	,v_item_end
																  	,v_item_type_id
																  	,v_item_act_address
																  	
																  	,pic_cover_arr
																  	,pic_detail_arr
																  	,v_item_desc
																	));


		$.ajax({
			url: 'http://test.huluteng.com/dopost/h5',
			data: '{"myinfo":"","cmd":"A01.h5","info":"' +arr +'"}',
			type: 'post',
			dataType: 'json',
			success: function(data) {
				if (data.oret == "1") {				
					v_tip_item_say ="操作完成";
					f_show_tip(v_tip_item_say);	
					alert(data.info[0].item_id);
					window.location.href="launchSuccess.html";
				} 
				else{
					v_tip_item_say ="操作异常";
					f_show_tip(v_tip_item_say);	
				}
			},
			error: function() {
					v_tip_item_say ="系统错误, 请稍后再试";
					f_show_tip(v_tip_item_say);	
			}
		})
	}
	//校验：输入
	var f_check_input =function(){
		//
		var v_step =1;
		var v_counter =0;
		
		while(true){			
			switch (v_step){
				case 0: 								
					return 1;
											
				case 1:
					//,目标募集金额
					if(v_coin_target.length >0){
						v_step =2;						
					}
					else{							
						var v_tip_item_say ="请输入目标募集金额";
						f_show_tip(v_tip_item_say);		
						return;
					}
					break;
					
				case 2:
					//,目标募集金额：用途
					if(v_coin_usage.length >0){
						v_step =3;			
					}
					else{							
						var v_tip_item_say ="请输入募款用途";
						f_show_tip(v_tip_item_say);		
						return;
					}
					break;		
					
				case 3:
					//,项目执行地点
					if(v_item_act_address.length >0){
						v_step =5;			
					}
					else{							
						v_tip_item_say ="请输入项目执行地点";
						f_show_tip(v_tip_item_say);		
						return;
					}
					break;	
					
				case 5:
					//,项目执行地点
					if(v_item_alias.length >0){
						v_step =6;			
					}
					else{							
						v_tip_item_say ="请输入项目标题";
						f_show_tip(v_tip_item_say);		
						return;
					}
					break;		
					
				case 6:
					//,项目执行地点
					if(v_item_desc.length >0){
						v_step =7;			
					}
					else{							
						v_tip_item_say ="请输入项目介绍";
						f_show_tip(v_tip_item_say);		
						return;
					}
					break;		
					
				case 7:
					//,封面图片
					if(arrPic_cover.length ==1){
						v_step =8;			
					}
					else{							
						v_tip_item_say ="请选择封面图片";
						f_show_tip(v_tip_item_say);		
						return;
					}
					break;		
					
				case 8:
					//,封面图片
					if(arrPic_detail.length >0){
						v_step =0;			
					}
					else{							
						v_tip_item_say ="请选择项目详情图片";
						f_show_tip(v_tip_item_say);		
						return;
					}
					break;		
					
				case 9:
					//,用户ID
					if(v_user_id.length >0 && v_user_type_id.length >0){
						v_step =1;			
					}
					else{							
						var v_tip_item_say ="请求参数有误";
						f_show_tip(v_tip_item_say);		
						return;
					}
					break;	
					
			}
			//,校验计数器				
			if(v_counter >9){
				var v_tip_item_say ="系统错误：counter_max";
				f_show_tip(v_tip_item_say);		
				break;
			}		
			//,同步计数器位置
			v_counter =v_counter +1;
		}		
				
	}
	//项目结束日期
	var init_item_end =function(){
		var v_item_len_default =$("#v_day_count").prop('value');	
		var v_ymd_curr =date.ymd_curr();
		v_item_end_ymd =date.ymd_next(v_ymd_curr,v_item_len_default);
		$("#time_end").html(v_item_end_ymd);			
	}
	//url参数：解析id
	var url_id_get =function(){		
		var v_kv_map =urlParam.get_kv_array();
		
		v_url_id =v_kv_map["id"];		
		v_url_id =decodeURI(v_url_id);
	}	
  	//提示：设置
  	var f_show_tip =function(itip_say){
				var v_tip_item_say ='<i class="bd"></i>'+itip_say;
				$("#tip_item_say").html(v_tip_item_say);
				$("#tip_item").show();
				$("#tip_item").fadeOut(1500);  	
  	}
	return {
		//事件绑定
		init: function () {			
			BindControl();
		},
		//初始化页面
		init_page: function () {	
			url_id_get();
			init_item_end();
		},		
	}
})()