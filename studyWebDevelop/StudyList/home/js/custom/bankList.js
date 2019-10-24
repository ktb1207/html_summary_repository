$(function() {
	bankList.url_id();
	bankList.init_page();
	bankList.init();
})

var bankList = (function() {
	var v_url_id;										//接口参数
	var userId;											//用户id
	var v_url_to										//接口参数
	
	var BindControl = function () {
		$("#dl_BankCard").click(function() {
			var cardId = "0";
			var formId = "1";
			var add_to =f_tool_scale_list(new Array(
							userId
							,cardId
							,formId
						));
			window.location.href = "bankAdd.html?id="+add_to;
			//window.location.href = "bankAdd.html?userId="+Number(userId)+"&cardId=0"+"&formid=1";
		})
		
		$(".s_con").delegate('.s_gz2', 'click', function() {
			var cardId= $(this).find('span').eq(0).text();		//获取银行卡id
			var bankId= $(this).find('span').eq(1).text();		//获取银行类别id
			var add_to =f_tool_scale_list(new Array(
							userId
							,cardId
							,bankId
						));
			//window.location.href = "bankAdd.html?userId="+Number(userId)+"&cardId="+Number(cardId)+"&bankId="+Number(bankId);
			window.location.href = "bankAdd.html?id="+add_to;
		});
		
		//首页：链接
		$("#do_bottom_01").click(function(){
			window.location.href ="projectIndex.html?id="+v_url_to;
			})
		//发起：链接
		$("#do_bottom_02").click(function(){
			window.location.href ="launchProject.html?id="+v_url_to;
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
	//页面初始化
		var f_user_info =function(){  
  		//解析用户id
  			userId =f_tool_scale_get(v_url_id,1);
  			v_url_to =f_tool_scale_list(new Array(
							userId
						));
			var v_branch_id ='22';     //分支id
			var arr = f_tool_request_info(new Array(v_branch_id,userId));
																				 
			$.ajax({
				url: 'http://test.huluteng.com/dopost/h5',
				data: '{"myinfo":"","cmd":"A01.h5","info":"' + arr + '"}',
				type: 'post',
				dataType: 'json',
				success: function(data){
					var arr_str;
					if(data.oret == "1") {
						for(var i = 0;i<data.info.length;  i++) {
							(function(item) {
								arr_str="<dl class='s_gz s_gz2'>";
								arr_str=arr_str+"<dt class='one'><i></i></dt>";          //银行logo?
								arr_str=arr_str+"<dd class='mid'>";
								//银行类别
								var bankArray=['农业银行','工商银行','中国银行','交通银行','建设银行','光大银行','招商银行','中信银行'];
								arr_str=arr_str+"<h3>" + bankArray[item.bank_id-1]+ "</h3>";
								arr_str=arr_str+"<p>尾号:" + item.card_tail_no + "</p>";
								arr_str=arr_str+"<span style='display:none'>"+item.card_id+"</span>";			//隐藏银行卡id
								arr_str=arr_str+"<span style='display:none'>"+item.bank_id+"</span>";		//隐藏银行类别id
								arr_str=arr_str+"</dd>";
								arr_str=arr_str+"<dd class='rig'><i class='arrow'></i></dd>";
								arr_str=arr_str+"</dl>";
			
								$("#dl_BankCard").before(arr_str);				//分条添加显示
							})(data.info[i])
						}	
					}
					else {
					//alert(data);
					}
				},
				error: function() {
					alert("异常!");
				}
			});
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
		}
	}
})()