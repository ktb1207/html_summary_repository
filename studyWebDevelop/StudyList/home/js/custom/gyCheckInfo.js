$(function () {
	mydo.init();
})

var mydo =(function () {
	var v_url_id ='';  //url传递的身份标识
	var v_url_param; //url参数-->next	
	
    var userId; 				//用户id
    var ProId;					//项目id
    var TypeId;				//提现类别id
    
	var arrPic_payee_IDCardImg = [];				//提现着图片
	arrPic_payee_IDCardImg[0]="";
	var arrPic_donor_Img = [];							//受捐人图片
	arrPic_donor_Img[0]="";
	var arrPic_marry_img = [];							//结婚证图片
	
	var arrPic_proxy_img = [];							//受捐人委托书图片
	var arrPic_account_img = [];						//户口本图片
	var arrPic_medical = [];								//医疗诊断图片	
	arrPic_medical[0]="";
	
	var payee_bankCard = "";							//收款人银行卡	
	var payee_bankName="";							//收款人银行卡账户
	//显示用户下面的银行卡列表
	var BindBankCardList = function() {
		var v_branch_id ='22';     //分支id
		//var userid = '1';
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
							arr_str=arr_str+"<p>"+item.card_holder+"&nbsp"+"&nbsp"+"尾号:" + item.card_tail_no + "</p>";
							arr_str=arr_str+"<span style='display:none'>"+item.card_id+"</span>";			//隐藏银行卡id
							arr_str=arr_str+"<span style='display:none'>"+item.bank_id+"</span>";		//隐藏银行类别id
							arr_str=arr_str+"<span style='display:none'>"+item.card_holder+"</span>";		//隐藏银行账户名
							arr_str=arr_str+"</dd>";
							arr_str=arr_str+"<dd class='rig'><i class='sel'></i></dd>";
							arr_str=arr_str+"</dl>";
							
							$("#bankcardlist").prepend(arr_str);			//分条添加显示
						})(data.info[i])
					}
					
					//默认选中第一个银行卡
					$("#bankcardlist>dl:first").find('dd').eq(1).find('i').addClass('on');
					//获取默认第一个银行卡id
					payee_bankCard=$("#bankcardlist>dl:first").find('span').eq(0).text();
					payee_bankName=$("#bankcardlist>dl:first").find('span').eq(2).text();
					//选择已有银行卡
					$("#bankcardlist>dl").click(function(){
							//alert($(this).index());
							$("#bankcardlist").find('i').removeClass('on');
							$(this).find('dd').eq(1).find('i').addClass('on');
							payee_bankCard=$(this).find('span').eq(0).text();
							payee_bankName=$(this).find('span').eq(2).text();
							//alert(payee_bankCard);
					});	
					//alert(payee_bankCard);
				}
				else {
					//alert(data);
				}
			},
			error: function() {
				f_show_tip("系统忙");
			}
		});
	}
	//点击添加银行卡，跳转至添加银行卡页面
	var BankAddCard = function(){
		$("#addbankcard").delegate("dd","click",function(){
			var cardId = "0";
			var formId = "2";
			var add_to =f_tool_scale_list(new Array(
								 		userId
								 		,cardId
								 		,formId
									    ,ProId	
									    ,TypeId
										));
			window.location.href="bankAdd.html?id="+add_to;
			//window.location.href="bankAdd.html?userId="+userId+"&cardId=0"+"&formid=2";
		});
	};
	var BindControl = function (){	
		

				
		$("#file_payee_IDCardImg").change(function (e) {									//收款人图片		
			uploadFile.showImg(e, $(this),arrPic_payee_IDCardImg,2);			
		})

		$("#file_donor_IDCardImg").change(function (e) {								   //受捐人图片	
			uploadFile.showImg(e, $(this),arrPic_donor_Img,2);
		})
		$("#file_Marry_Img").change(function (e) {												//结婚证图片
			uploadFile.showImg(e, $(this),arrPic_marry_img,1); 
		})

		$("#file_proxy_Img").change(function (e) {												//受捐人委托书图片
			uploadFile.showImg(e, $(this),arrPic_proxy_img,2); 			
		})

		$("#file_payee_account").change(function (e) {										//户口本图片
			uploadFile.showImg(e, $(this),arrPic_account_img,2); 
		})

		$("#file_medical").change(function (e) {													//医疗诊断图片
			uploadFile.showImg(e, $(this),arrPic_medical,10);			
		})
		
		$("#a_sub").click(function (){																		//提交验证事件绑定
			SendInfo();			
		})
		
		//医疗诊断结果
		$("#nswitch").change(function (){					
			if($("#nswitch").prop("checked")){		
				$("#nswitch_pic").show();
			}
			else{		
				$("#nswitch_pic").hide();
			}
		})
		
		//返回上一页
		$("#do_back").click(function(){
			v_url_param =f_tool_scale_list(new Array(
								 		userId
									    ,ProId							   
										));
			window.location.href ="gyCheck.html?id=" +v_url_param;							
		})
	};

	var DomInit = function () {																			//根据提现类别进行页面对应区域显示
		switch (Number(TypeId)) {
			case 1:				
				$("#div_donor").css("display", "none");
				$("#div_marry").css("display", "none");
				$("#div_account").css("display", "none");
				$("#div_proxy").css("display", "none");
				break;
			case 2:
				$("#div_marry").css("display", "none");
				$("#div_proxy").css("display", "none");
				break;
			case 3:
				$("#div_proxy").css("display", "none");
				$("#div_account").css("display", "none");
				break;
			case 4:
				$("#div_marry").css("display", "none");
				$("#div_account").css("display", "none");
				break;
			case 5:
				$("#div_payee").css("display", "none");
				//$("#div_donor").css("display", "none");
				$("#div_marry").css("display", "none");
				$("#div_account").css("display", "none");
				break;
		}
	};

	var SendInfo = function () {
		//7.提现申请图片
		//收款人信息
		//alert(payee_bankName);
		//alert(payee_bankCard);
		if(TypeId ==1 || TypeId ==2 || TypeId ==3 || TypeId ==4){
			
			var payee_trueName = $("#txt_payee_trueName").val();
			var payee_IDCard = $("#txt_payee_IDCard").val();
			var payee_tele= $("#txt_payee_tele").val();
			if(payee_trueName.length ==0){
				f_show_tip("请输入收款人真实姓名");
				return;
			}
			else if(payee_trueName!=payee_bankName){
				f_show_tip("请输入与选择银行卡相同的收款人员名称");
				return;
			}
			else if(payee_IDCard.length !=18){
				f_show_tip("请输入收款人合法的身份证号");
				return;
			}
			else if(payee_tele.length <7){
				f_show_tip("收款人联系电话输入有误，请重新输入！");
				return;
			}		
			else{			
			}		
			if(arrPic_payee_IDCardImg.length ==1){
				f_show_tip("请选择收款人手持身份证照片");
				return;
			}
			//arrPic_payee_IDCardImg.splice(0,1);
			//var payee_IdCardImg = uploadFile.upload(userId,'7',arrPic_payee_IDCardImg,"http://test.huluteng.com/dopost/pic_upload_js");		
		}
		//受捐人信息
     	//if(TypeId ==2 || TypeId ==3 || TypeId ==4 || TypeId ==5){
      	 if(TypeId ==2 || TypeId ==3 || TypeId ==4){
			var donor_trueName = $("#txt_donor_trueName").val();
			var donor_IDCard = $("#txt_donor_IDCard").val();
			if(donor_trueName.length ==0){
				f_show_tip("请输入受捐人真实姓名");
				return;
			}	
			else if(donor_IDCard.length!=18){
				f_show_tip("请输入受捐人合法的身份证号");
				return;
			}		
			else{			
			}		
			if(arrPic_donor_Img.length ==1){
				f_show_tip("请选择受捐人手持身份证照片");
				return;
			}		
			//arrPic_donor_Img.splice(0,1);
			//var donor_IDCardImg = uploadFile.upload(userId,'7',arrPic_donor_Img,"http://test.huluteng.com/dopost/pic_upload_js");	        	
        }
      	//TypeId==5特殊判断 
		if(TypeId ==5){
			var donor_trueName = $("#txt_donor_trueName").val();
			var donor_IDCard = $("#txt_donor_IDCard").val();
			if(donor_trueName.length ==0){
				donor_trueName = "";
			}	
			else if(donor_IDCard.length==0){
				donor_IDCard = "";
			}		
			else{			
			}		
			if(arrPic_donor_Img.length ==1){
				arrPic_donor_Img = [];
			}		
		}
		//结婚证
		if(TypeId ==3){
			if(arrPic_marry_img.length ==0){
				f_show_tip("请选择结婚证照片");
				return;
			}		
			//var marry_img = uploadFile.upload(userId,'7',arrPic_marry_img,"http://test.huluteng.com/dopost/pic_upload_js");
		}
		
		//受捐人委托书
		//if(TypeId ==4 || TypeId ==5){
		if(TypeId ==4){
			if(arrPic_proxy_img.length ==0){
				f_show_tip("请选择受捐人委托书照片");
				return;
			}				
			//var porxy_img = uploadFile.upload(userId,'7',arrPic_proxy_img,"http://test.huluteng.com/dopost/pic_upload_js");			
		}

		
		//户口本照片
		if(TypeId ==2){
			if(arrPic_account_img.length ==0){
				f_show_tip("请选择户口本照片");
				return;
			}	
			//var account_img = uploadFile.upload(userId,'7',arrPic_account_img,"http://test.huluteng.com/dopost/pic_upload_js");			
		}
		
		
		//项目医疗
		var IsMedical;
		if($("#nswitch").prop("checked")==true){
			IsMedical="1";	
			if(arrPic_medical.length ==1){
				f_show_tip("请选择医疗诊断结果照片");
				return;
			}	
			
			arrPic_medical.splice(0,1);
			var medical_img = uploadFile.upload(userId,'7',arrPic_medical,"http://test.huluteng.com/dopost/pic_upload_js");
		}
		else{
			
			IsMedical="0";	
			medical_img ="";
		}		
		//图片上传

		arrPic_payee_IDCardImg.splice(0,1);
		var payee_IdCardImg = uploadFile.upload(userId,'7',arrPic_payee_IDCardImg,"http://test.huluteng.com/dopost/pic_upload_js");	
		
		arrPic_donor_Img.splice(0,1);
		var donor_IDCardImg = uploadFile.upload(userId,'7',arrPic_donor_Img,"http://test.huluteng.com/dopost/pic_upload_js");	 
		
		var marry_img = uploadFile.upload(userId,'7',arrPic_marry_img,"http://test.huluteng.com/dopost/pic_upload_js");
		
		var porxy_img = uploadFile.upload(userId,'7',arrPic_proxy_img,"http://test.huluteng.com/dopost/pic_upload_js");		
	
		var account_img = uploadFile.upload(userId,'7',arrPic_account_img,"http://test.huluteng.com/dopost/pic_upload_js");	
		
		if(typeof(payee_bankCard) !="undefined" && payee_bankCard !=""){
			
		}
		else{
			f_show_tip("请选择银行卡");
			return;			
		}
		var arr = "";
	
		switch (Number(TypeId)) {
			case 1:
				//分支Id，来源Id，提现类别Id，项目Id，收款人真实姓名，收款人身份证号，收款人联系电话
				//收款人手持身份证照片，收款人银行卡编号，项目是否为医疗救助项目类别，医疗诊断结果照片			
				arr = f_tool_request_info(
					new Array("31"
									,"1"
									,TypeId
									
									,ProId									
									,payee_trueName
									,payee_IDCard
									
									,payee_tele
									,payee_IdCardImg
									,payee_bankCard
	
									,IsMedical
									,medical_img
									));
				break;
			case 2:
				//分支Id，来源Id，提现类别Id，项目Id，收款人真实姓名，收款人身份证号，收款人联系电话
				//收款人手持身份证照片，收款人银行卡编号，项目是否为医疗救助项目类别，医疗诊断结果照片
				//受捐人真实姓名，受捐人身份证号，受捐人手持身份证号，户口本照片组
				arr = f_tool_request_info(
					new Array("31"
									, "1"
									, TypeId + ""
									
									, ProId + ""
									, payee_trueName + ""
									, payee_IDCard + ""
									
									, payee_tele + ""
									,payee_IdCardImg
									, payee_bankCard
									
									, IsMedical + ""
									, medical_img
									, donor_trueName
									
									, donor_IDCard
									, donor_IDCardImg
									, account_img
									));
				break;
			case 3:
				//分支Id，来源Id，提现类别Id，项目Id，收款人真实姓名，收款人身份证号，收款人联系电话
				//收款人手持身份证照片，收款人银行卡编号，项目是否为医疗救助项目类别，医疗诊断结果照片
				//受捐人真实姓名，受捐人身份证号，受捐人手持身份证号，结婚证照片
				arr = f_tool_request_info(
					new Array("31", "1", TypeId + "", ProId + "", payee_trueName + "", payee_IDCard + "", payee_tele + "", 
						payee_IdCardImg, payee_bankCard, IsMedical + "", medical_img, donor_trueName, donor_IDCard, donor_IDCardImg, marry_img));
				break;
			case 4:
				//分支Id，来源Id，提现类别Id，项目Id，收款人真实姓名，收款人身份证号，收款人联系电话
				//收款人手持身份证照片，收款人银行卡编号，项目是否为医疗救助项目类别，医疗诊断结果照片
				//受捐人真实姓名，受捐人身份证号，受捐人手持身份证号，受捐人委托书照片
				arr = f_tool_request_info(
					new Array("31", "1", TypeId + "", ProId + "", payee_trueName + "", payee_IDCard + "", payee_tele + "", 
						payee_IdCardImg, payee_bankCard, IsMedical + "", medical_img, donor_trueName, donor_IDCard, donor_IDCardImg, porxy_img));
				break;
			case 5:
				//分支Id，提现类别Id，项目Id，收款人银行卡编号，项目是否为医疗救助项目类别，医疗诊断结果照片
				//受捐人真实姓名，受捐人身份证号，受捐人手持身份证号，受捐人委托书
				arr = f_tool_request_info(
					new Array("31", "1", TypeId + "", ProId + "", payee_bankCard, IsMedical + "", medical_img, 
						donor_trueName, donor_IDCard, donor_IDCardImg, porxy_img));
				break;
		}
		
		$.ajax({
			url: 'http://test.huluteng.com/dopost/h5',
			data: '{"myinfo":"","cmd":"A01.h5","info":"' + arr + '"}',
			type: 'post',
			dataType: 'json',
			success: function(data) {
				if(data.oret == "1") {  
					$("#txt_payee_trueName").val("");
					$("#txt_payee_IDCard").val("");
					$("#txt_payee_tele").val("");
					$("#txt_donor_trueName").val("");
					$("#txt_donor_IDCard").val("");
					//f_show_tip("完成后的跳转未修改");
					window.location.href="projectDetail.html?item_id="+ProId;
				}else {
					f_show_tip("系统忙");
				}
			},
			error: function() {
				f_show_tip("系统忙");
			}
		});
		
	}
	
	//解析url参数
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
				setTimeout('$("#tip_item").hide()',1500);
  	}
  		  		
	return {
		init: function () {

			//解析url参数
			url_id_get();
			//alert(v_url_id);
			userId =f_tool_scale_get(v_url_id,1);
			ProId  =f_tool_scale_get(v_url_id,2);
			TypeId=f_tool_scale_get(v_url_id,3);
			//alert(ProId);
			//页面初始化
			DomInit();
			$("#nswitch_pic").hide();
			
			BindControl();
			BindBankCardList();
			BankAddCard();
		}
	}
	
	
})()