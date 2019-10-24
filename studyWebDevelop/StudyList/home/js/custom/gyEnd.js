$(function() {
	mydo.init();
})

var mydo = (function() {
	var proId = "";
	var v_url_param =""; //页面跳转参数
	
	var delayshow;
	
	var GetParas = function() {
		var paras = utils.url_getParameter();
		proId = paras["proId"];
	}

	var BindControl = function() {
		$("#a_end").bind("click",Apply);
		
	}

	var Apply = function() {
		var reason = $("#txtr_reason").val();
		
		//验证
		var check=f_updata(
									reason
			);
		if(check ==1){	
		}
		else{
			return;
		}


		//console.log("1="+proId);
		//console.log("2="+reason);
		//分支Id，项目Id，原因
		var arr = f_tool_request_info(new Array("14", proId, reason));
		
		//请求接口
		$.ajax({
			url: 'http://test.huluteng.com/dopost/h5',
			data: '{"myinfo":"","cmd":"A01.h5","info":"' + arr + '"}',
			type: 'post',
			dataType: 'json',
			beforeSend:function(){
					$(".btn").css("background-color","#666666");
					$("#a_end").unbind("click");
			},
			success: function(data) {
				if (data.oret == "1") {
					
					v_tip_item_say ="提交完成";
					v_url_param =f_tool_scale_list(new Array(proId));
					delayshow = setTimeout(function(){
							f_show_tip(v_tip_item_say);
							f_page_jump("1");
						},1500);
					$("#txtr_reason").val("");													//清空描述内容
					$("#txtr_reason").attr("placeholder","申请已提交！");
				} 
				else if(data.oret == "0") {
					v_tip_item_say ="操作异常";
					f_show_tip(v_tip_item_say);	
				}
				else{
					v_tip_item_say ="操作异常";
					f_show_tip(v_tip_item_say);	
				}
			},
			complete:function(){
					$(".btn").css("background-color","#ee554d");
					$("#a_end").bind("click",Apply);
					
			},
			error: function() {
					v_tip_item_say ="系统错误 0";
					f_show_tip(v_tip_item_say);					
			}
		})
		
		clearTimeout(delayshow);
	}
	
	//弹出的提示框
	var f_show_tip =function(itip_say){
				var v_tip_item_say ='<i class="bd"></i>'+itip_say;
				$("#tip_item_say").html(v_tip_item_say);
				$("#tip_item").show();
				$("#tip_item").fadeOut(1500);  
	}
		//页面跳转
	var f_page_jump =function(jump_id){
		var v_url_href;

		switch(jump_id){
			case "0":
				v_url_href ="http://test.huluteng.com/dopost/h5_authorize/10?4";
				break;			
			case "1":
				v_url_href ="gyIndex.html"
							      +"?id="+v_url_param;				
				break;
			
		}
		
		window.location.href =v_url_href;
	}  	  	
	
	
	//校验
	var f_updata=function(v_content){
			var v_step =1;
			var v_counter =0;
			
			while(true){			
				switch (v_step){
					case 0: 
						//,验证码：校验						
						return 1;
					case 1:
						//更新内容：校验
						if(v_content.length>0){
							v_step =0;						
						}
						else{							
							v_tip_item_say ="请输入提前结束理由";
							f_show_tip(v_tip_item_say);		
							return;
						}
						break;									
				}

				//,校验计数器				
				if(v_counter >1){
					v_tip_item_say ="系统错误：counter_max";
					f_show_tip(v_tip_item_say);		
					break;
				}		
				//,同步计数器位置
				v_counter =v_counter +1;
  			}						
	}

	return {
		init : function() {
			GetParas();
			BindControl();
		}
	}
})()