$(function() {
	walletDraw_sq.init();
})

var walletDraw_sq = (function() {
	var v_url_to;				//接口参数
	var arrPic = [];			//保存上传图片
	//解析URL获得用户id和项目id
	var thisURL = document.URL;
	var getval =thisURL.split('?')[1];  
    var userval=getval.split("&")[0]; 
    var itemval=getval.split("&")[1]; 
    var userId=userval.split("=")[1]; 
    var itemId=itemval.split("=")[1]; 
    //alert(userId);
    //alert(itemId);
	//var proId = "";
	//var balance = "";
	//解析获得项目名称、项目余额
	var GetProject = function(page_index,page_size) {
		//分支id，起始页码，页大小，来源id 1-h5，用户id
		var v_branch_id ='30';
		var v_from_site_id ="1"; //来源ID
		var arr = f_tool_request_info(new Array(v_branch_id
																				,String(page_index)
																				,String(page_size)
																				,v_from_site_id
																				,userId
																				));
		$.ajax({
			url: 'http://test.huluteng.com/dopost/h5',
			data: '{"myinfo":"","cmd":"A01.h5","info":"' + arr + '"}',
			type: 'post',
			dataType: 'json',
			success: function(data) {
				var ainfo= data.info;
				var a;
				if(data.oret == "1") {  
					//在用户项目中匹配当前项目id
					for(var i=0; i<ainfo.length;i++){
						if(ainfo[i].item_id==itemId){
							a=i;
							break;
						}
					}
					var a_pic = ainfo[a].user_pic;
					var v_pic = pic.url_get(a_pic,1);
					$(".mid:first").html(ainfo[a].item_alias);
					$("#b_balance").text(ainfo[a].item_coin_left);
					$("#v_user_pic").attr("src",v_pic);
				}else {
					//alert("else");
				}
			},
			error: function() {
				//alert("异常!");
			}
		});
	};
	
	var GetParas = function() {
		
	}
  
	var BindControl = function() {
		
		v_url_to =f_tool_scale_list(new Array(
							userId
						));

		$("#file_img").bind("change", function(e){
			//var file = $(this)[0].files[0];
			//arrPic.push(file);
			uploadFile.showImg(e, $(this)[0],arrPic,9);
		})

		$("#btn_apply").click(function() {
			Apply();
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

	var Apply = function() {
		var applyMoney = $("#txt_applyMoney").val();
		var reason = $("#txtr_reason").val();
		//7.提现申请图片
		var pic_arr = uploadFile.upload(userId,itemId,arrPic, "http://test.huluteng.com/dopost/pic_upload_js");
		//分支id，用户id，项目id，申请金额，提现原因，照片组
		//图片归属ID 为项目ID
		//alert(typeof userId);
		//alert(typeof itemId);
		//alert(String(pic_arr ));
		var arr = f_tool_request_info(new Array("23", userId, itemId, applyMoney, reason,String(pic_arr)));
		$.ajax({
			url: 'http://test.huluteng.com/dopost/h5',
			data: '{"myinfo":"","cmd":"A01.h5","info":"' + arr + '"}',
			type: 'post',
			dataType: 'json',
			success: function(data){
				if(data.oret == "1") {
					$("#txt_applyMoney").attr("value","10.00");
					$("#txtr_reason").val("");
					$(".upload_item").remove();
					$("#file_img").val("");
					window.location.href = "walletDraw_Success.html?applyMoney=" + applyMoney;
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

	return {
		init : function() {
			GetParas();
			BindControl();
			GetProject(1, 30);
		}
	}
})()