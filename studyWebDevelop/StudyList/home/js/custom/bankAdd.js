$(function() {
	bankAdd.url_id();
	bankAdd.init_page();
	bankAdd.init();
});

var bankAdd = (function() {
	var v_url_to;										//接口参数
	var back_to;
	var userId;
	var cardId;
	var formId;
	var ProId;
	var TypeId;
	var bankId;
	
    //判断修改or新增
	var BindControl = function() {
		$("#a_save").click(function() {
			var cardName = $(":input[type='text']").val();
			var cardNum = $(":input[type='tel']").val();
			if (cardName==""){
				f_show_tip("账户名不能为空");
				return;
			}
			else if (cardNum.length<16){
				f_show_tip("请输入正确的银行卡号");
				return;
			}
			if (Number(cardId) == 0) {
				AddBankCard();
			}
			else if(Number(cardId) > 0) {
				EditBankCard();
			}
			else {
				return;
			}
		})
	}
	//省市区三级下拉框
	var BindCity = function() {
		//alert( typeof bankId);
		$("#city_4").citySelect({
			prov : "北京",
			city : "北京",
			dist: "东城区",
			nodata : ""//none
		});
	}
	//新增银行卡
	var AddBankCard = function() {
		var bankArray=['农业银行','工商银行','中国银行','交通银行','建设银行','光大银行','招商银行','中信银行'];
		var Bankname = $("#bankClass").find("option:selected").text();		//选中的银行
		var xa =$.inArray(Bankname,bankArray);
		var BankId =xa+1;
		var BankCardNum = $(":input[type='tel']").val();			//	银行卡号
		var Account = $(":input[type='text']").val();					//持卡人
		var Address = $(".prov").find("option:selected").text()+"省"+$(".city").find("option:selected").text()+"市"+$(".dist").find("option:selected").text();
		var subbranch =$("#bankName").val();						//	支行名称
		//分支Id，用户Id，银行Id，银行卡号，持卡人，开户地址，支行名称
		//alert(typeof BankCardNum);
		var arr = f_tool_request_info(new Array("20", userId, String(BankId), BankCardNum, Account, Address, subbranch));
		SubmitData(arr);
	}
	//修改银行卡
	var EditBankCard = function() {
		var BankId = "";
		var BankCardNum = "";
		var Account = "";
		var Address = "";
		var subbranch = "";
		var BankCardId = "";

		//分支Id，用户Id，银行Id，银行卡号，持卡人，开户地址，支行名称，银行卡Id
		var arr = f_tool_request_info(new Array("21", userId, BankId, BankCardNum, Account, Address, subbranch, BankCardId));
		SubmitData(arr);
	}
	
	//ajax提交数据
	var SubmitData = function(arr) {
		$.ajax({
			url: 'http://test.huluteng.com/dopost/h5',
			data: '{"myinfo":"","cmd":"A01.h5","info":"'+ arr +'"}',
			type: 'post',
			dataType: 'json',
			success: function(data){
				if(data.oret == "1") {
					switch(formId){
						case '1':
							window.location.href = "bankList.html?id="+v_url_to;
							break;
						case '2':
							window.location.href = "gyCkeckInfo.html?id="+back_to;
							break;
					}
					
				}
				else {
					alert(data);
				}
			},
			error: function() {
				alert("异常!");
			}
		});
	}
	
	//提示
	var f_show_tip =function(itip_say){
				var v_tip_item_say ='<i class="bd"></i>'+itip_say;
				$("#tip_item_say").html(v_tip_item_say);
				$("#tip_item").show();
				setTimeout('$("#tip_item").hide()',1500);
  	}
	
	//解析url中id参数
	var url_id_get =function(){		
			var v_kv_map =urlParam.get_kv_array();
			v_url_id =v_kv_map["id"];	
			v_url_id =decodeURI(v_url_id);
			//alert(v_url_id);
			return v_url_id;			
	} 
	
	var f_user_info =function(){  
  			userId =f_tool_scale_get(v_url_id,1);
  			cardId =f_tool_scale_get(v_url_id,2);
  			formId =f_tool_scale_get(v_url_id,3);
  			ProId =f_tool_scale_get(v_url_id,4);
  			TypeId =f_tool_scale_get(v_url_id,5);
  			
  			//list追加传递参数
			v_url_to = f_tool_scale_list(new Array(
							userId
						));
			back_to = f_tool_scale_list(new Array(
							userId
							,ProId
							,TypeId
						));
	}
	return {
		init : function() {
			BindControl();
			BindCity();
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





