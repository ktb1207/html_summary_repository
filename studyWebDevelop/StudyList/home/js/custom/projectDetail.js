// JavaScript Document
require.config({
	paths : {
		'jquery' : '../lib/jquery-1.8.3.min',
		'jqueryMb': '../lib/jquery.mobile-1.4.5.min',
		'jqueryTmpl' : '../lib/jquery.tmpl.min',
		'scale':'../util/scale',
		'commom':'../util/common',
		'EncryptAjax': '../widget/encryptAjax',
		'proItem':'../tmpl/proItem',
		'url':'../util/url'
	},
	shim : {
		'jqueryMb':{
			deps : ['jquery'],
			exports : '_'
		},
		'jqueryTmpl':{
			deps : ['jquery'],
			exports : '_'
		},
		'common':{
			deps : ['jquery'],
			exports : '_'
		}
	}
});


require(['jquery','jqueryMb','jqueryTmpl','scale','commom','EncryptAjax','proItem','url'], function(jquery,jqueryMb,jqueryTmpl,scale,commom,EncryptAjax,proItem,url) {	
	
	
	//url参数
	var v_url_id; 		  //页面输入参数
	var v_url_param; //页面跳转参数
	var v_pact;
	var v_pact_out
	
	var v_user_id;
	var v_item_id;
	
	var v_item_alias;
	var v_item_user_pic;
	var v_item_follow_do ="3"; //1--添加 2--取消 3--判断
		

	url_id_get();	
	v_user_id =f_tool_scale_get(v_url_id,1); 
	v_item_id =f_tool_scale_get(v_url_id,2);
	v_pact =f_tool_scale_list(new Array(
														v_user_id
														));
	//解析url参数
	function url_id_get(){		
		var v_kv_map =urlParam.get_kv_array();
		
		v_url_id =v_kv_map["id"];		
		v_url_id =decodeURI(v_url_id);
	}
	
	//-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
	//顶部导航
	//首页
	$("#jump_01").click(function(){
		v_url_param =f_tool_scale_list(new Array(v_user_id));
		window.location.href ="projectIndex.html?id=" +v_url_param;
	});
	//举报
	$("#jump_02").click(function(){
		v_url_param =f_tool_scale_list(new Array(v_item_id,v_user_id));
		window.location.href ="report.html?id=" +v_url_param;
	});
	//我的
	$("#jump_03").click(function(){
		v_url_param =f_tool_scale_list(new Array(v_user_id));
		window.location.href ="myHome.html?id=" +v_url_param;
	});	
	
	//-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 	 		
	//分享
	var v_share_title ='标题';
	var v_share_desc ='描述';	
	var v_share_imgUrl ='https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=765725613,4010617855&fm=58';
	var v_share_link;		
	
	
	//分享配置
    v_page_url =window.location.href.split("#")[0];
    v_share_link =window.location.href.split("?")[0]
    					 +"?id=" 
    					 +f_tool_scale_list(new Array('0',v_item_id));  //第1个为用户ID		  
	alert("v_share_link="+v_share_link);
    //获取配置数据
    function f_config_info(){
		var arr = f_tool_request_info(new Array('37'
																 ,v_page_url
																 ));
		$.ajax({
			url: 'http://test.huluteng.com/dopost/h5',
			data: '{"myinfo":"","cmd":"A01.h5","info":"' + arr + '"}',
			type: 'post',
			dataType: 'json',
			success: function(data) {
					f_callback_success_config_info(data);
					},
			error: function() {
					f_callback_error();
					}
		})    	
    }	
	//接口回调：success
	function f_callback_success_config_info(data){
		if(data.oret =="1"){
			this.debug ="true";
	    	this.appId =data.info[0].appId;
	    	this.timestamp =data.info[0].timestamp;
	    	this.nonceStr =data.info[0].nonceStr;
	    	this.signature =data.info[0].signature;
	    	this.jsApiList = ['onMenuShareTimeline','onMenuShareAppMessage'];	        
	    	
	    	v_config_info =this;
	    	//
	    	wx.config(v_config_info);
	    	wx.ready(function(){
	    		
				wx.onMenuShareAppMessage({
				    title: v_share_title, // 分享标题
				    desc: v_share_desc, // 分享描述
				    link: v_share_link, // 分享链接
				    imgUrl: v_share_imgUrl, // 分享图标
				    type: '', // 分享类型,music、video或link，不填默认为link
				    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				    success: function () { 
				        // 用户确认分享后执行的回调函数
				    },
				    cancel: function () { 
				        // 用户取消分享后执行的回调函数
				    }	    	
				});
				
				wx.onMenuShareTimeline({
				    title: v_share_title, // 分享标题
				    desc: v_share_desc, // 分享描述
				    link: v_share_link, // 分享链接
				    imgUrl: v_share_imgUrl, // 分享图标
				    success: function () { 
				        // 用户确认分享后执行的回调函数
				    },
				    cancel: function () { 
				        // 用户取消分享后执行的回调函数
				    }	    	
				});				
				
	    	});
	    	wx.error(function(){
	    		//
	    	});	    	
		}
	}	 
	
	//接口回调：error
	function f_callback_error(){			
	}				

	//-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 	 
	var	item_id = v_item_id //项目id
	
	
	var _proDeta = $('#proDeta');
	
	//构建对象
	var	eAjax = new EncryptAjax(); //构造ajax对象
	var proItem = new proItem();//构造项目item对象

	/**************首次加载*************/
	getProList(item_id,_proDeta);


	/**
	 * 请求项目列表
	 * nItem 1：推荐募歀  2：精选募歀
	 * nCurPage 当前页数
	 * nPageSize 每页条数
	 */
	function getProList(item_id,theList){
		
		var nextParams = {
			theList: theList
		};
		
		var arr= f_tool_request_info(new Array('6',item_id));
		
		var params = '{"myinfo":"","cmd":"A01.h5","info":"'+arr+'"}';
		
		var sUrl = "http://test.huluteng.com/dopost/h5";
		var obj = {
			apiParams: params,
			url: sUrl,
			params:nextParams
		}
		
		eAjax.fnAjax(obj,getProListCallBack,errorCallBank);
	}
	
	/**
	 * 请求项目列表回调
	 * @param {Object} data
	 */
	function getProListCallBack(data,params) { 
		//try {
			var obj = eval('(' + data + ')');
			var oret = obj.oret;
			var infoList  = obj.info;
			var item_info_oret = infoList[0].item_info_oret;
			
			var itemInfoList = infoList[0].item_info;
			var theList = params.theList;
			
			if (oret == '1') {
				if(item_info_oret == '1'){
					
					var pic_cover = getPicPath(itemInfoList[0].pic_cover);
					var user_pic = getPicPath(itemInfoList[0].user_pic);
					var user_alias = itemInfoList[0].user_alias;
					var logdate = itemInfoList[0].logdate;
					var item_type = getItemType(itemInfoList[0].item_type_id);
					var coin_target = itemInfoList[0].coin_target;
					var coin_done = itemInfoList[0].coin_done;
					var coin_support_count = itemInfoList[0].coin_support_count;
					var begin_at = itemInfoList[0].begin_at.split(" ")[0];
					var end_at = itemInfoList[0].end_at.split(" ")[0];
					var item_act_address = itemInfoList[0].item_act_address;
					var count_follow = itemInfoList[0].count_follow;
					var count_share = itemInfoList[0].count_share;
					
					v_item_alias =itemInfoList[0].alias;	
					v_item_user_pic =itemInfoList[0].user_pic;
					
					v_share_title =itemInfoList[0].alias;
					v_share_desc =itemInfoList[0].item_desc;
					v_share_imgUrl =pic_cover;  alert(v_share_title);
					//初始化分享
					f_config_info();
					
					//page赋值
					$("#sCoverPic").attr('src',pic_cover);
					$("#userPic").attr('src',user_pic);
					$("#userName").text(user_alias);
					$("#creatTime").text(logdate);
					$("#proType").text(item_type);
					$("#coin_target").text('￥'+coin_target);
					$("#coin_done").text('￥'+coin_done);
					$("#coin_support_count").text('￥'+coin_support_count);
					$("#nDay").text(begin_at + ' 至' + end_at);
					$("#item_act_address").text(item_act_address);
					$("#count_follow").text(count_follow +'次');
					$("#count_share").text(count_share +'次');
					
					
					for(var i=0;i<itemInfoList.length;i++){
						proItem.fnShowInfo(itemInfoList[i],theList,1,function(btn){},null);						
					}					
				}		
			}else {
				alert('失败');
			}
//		} catch (e) {
//			//load.fnHide();
//			//msg.fnShowInfo('系统繁忙，请稍后再试', '', '我知道了', function(btn) {});
//			alert('异常');
//		}
	}
	/**
	 * 失败回调
	 */
	function errorCallBank(){
		//load.fnHide();
		//msg.fnShowInfo('系统繁忙，请稍后再试', '', '我知道了', function(btn) {});
	}


	//Lu Add

	var url_get = function(ipic_name, ipic_size_id){		
		var  v_pic_size_id = ipic_size_id;	
		var v_pic_type_id =ipic_name.substring(0,1); 
		var v_pic_name =ipic_name.substring(1);			
		
		var v_pic_path_head ="http://test.huluteng.com/pic/";
		var v_pic_path_tail =String(v_pic_type_id) 
								   +"/" + String(v_pic_size_id) 
								   +"/" + String(v_pic_name.substring(0,8)) 
								   +"/" + String(v_pic_name)
								   ;
		
		return (v_pic_path_head +v_pic_path_tail);
	}

	var userId = v_user_id;
	var proId =v_item_id;
	var userNickName = "";

	var pageIndex = '1';
	var pageSize = '5';

	var sUrl = "http://test.huluteng.com/dopost/h5";
	//动态加载
	$("#h_update").hide();
	(function () {
		//进度动态
		//分支Id，起始页码，页大小，项目Id
		var arr = f_tool_request_info(new Array('16', pageIndex, pageSize, proId));
		var obj = {
			apiParams: '{"myinfo":"","cmd":"A01.h5","info":"'+arr+'"}',
			url: sUrl
		}
		eAjax.fnAjax(obj, 
			function (data_process) {
				data_process = $.parseJSON(data_process); 
				if (data_process.oret == "1") {
					$("#h_update").show();
					var html_arr = new Array();
					for (var i = 0, lenght = data_process.info.length; i < lenght; i++) {
						(function (item) {
							//项目进度动态绑定
							html_arr.push("<div class='s_box s_deta' style='padding-bottom:0.5rem;'>");
							
							html_arr.push("<dl class='s_info'>");
							html_arr.push("<dt><img src='" + url_get(item.pic, 1) + "' width='100%' /></dt>");//发布者头像

							html_arr.push("<dd>");
							html_arr.push("<b>" + item.alias + "</b>");//发布者昵称
							html_arr.push("<p class='s_opr'>");
							html_arr.push("<time>" + item.logdate + "</time>");
							html_arr.push("<i class='plun i_process_master' data-userId='" + item.user_id + "' data-dynamicId='" + item.process_id + "'></i>");//发布者id（被评论者id），进度ID（动态id）
							html_arr.push("</p>");
							html_arr.push("</dd>");
							html_arr.push("</dl>");

							html_arr.push("<div class='s_zx'><p class='s_js'>" + item.say + "</p></div>");//动态内容

							if(item.pic_array != "" && item.pic_array != undefined) {
								html_arr.push("<ul class='s_pic'>");
								item.pic_array = item.pic_array.split(',');
								for (var j = 0; j < item.pic_array.length - 1; j++) {
									html_arr.push("<li class='first'>");
									html_arr.push("<a><img src='" + url_get(item.pic_array[j], 1) + "' /></a>");//图片组 ？
									html_arr.push("</li>");
								}
								html_arr.push("</ul>");
							}

							//评论
							if (item.process_comment_info != undefined) {
								html_arr.push("<div class='s_cot'>");
								for (var k = 0; k < item.process_comment_info.length; k++) {
									(function (item_comment) {
										//html_arr.push("<div class='s_fx'>");
										if (item_comment.primary_01) {//如果是主线
											html_arr.push("<p class='s_fx'><span>" + item_comment.from_alias + "</span>：" + item_comment.say + "</p>");
										}
										/*else {//非主线
											html_arr.push("<p class='s_wz'><span>" + from_alias + "</span>" + item_comment.say + "</p>"); // ？？
										}*/
										//html_arr.push("</div>");

									})(item.process_comment_info[k]);
								}
								html_arr.push("</div>");
							}

							html_arr.push("</div>");
						})(data_process.info[i]);
					}
					var html_str = html_arr.join("");
					$('#div_process').html(html_str);			
				}
				else {
					console.log("接口异常@near 259");
				}
			})

		//捐款动态
		$("#div_pay_comment").hide();
		var arr = f_tool_request_info(new Array('17', pageIndex, pageSize, proId));
		var obj = {
			apiParams: '{"myinfo":"","cmd":"A01.h5","info":"'+arr+'"}',
			url: sUrl
		}
		eAjax.fnAjax(obj, function (data_pay) {
			data_pay = $.parseJSON(data_pay);
			if (data_pay.oret == "1") {
				$("#div_pay_comment").show();
				var html_arr = [];
				html_arr.push("<div class='s_ping'>");
				for (var i = 0; i < data_pay.info.length; i++) {
					(function (item) {
						html_arr.push("<dl>");
						html_arr.push("<dt><img src='" + url_get(item.pic, 1) + "' width='100%' /></dt>");// 头像？
						html_arr.push("<dd>");
						html_arr.push("<div class='pt'>");
						html_arr.push("<h3 class='s_ptit'><a>" + item.alias + "</a><span>支持了<b>" + item.coin + "元</b></span></h3>");
						html_arr.push("<p class='s_zw'>" + item.say + "</p>");
						html_arr.push("<div class='s_opr'>");
						html_arr.push("<time>" + item.logdate + "</item>");
						html_arr.push("<i class='plun i_master' data-userId='" + item.user_id + "' data-dynamicId='" + item.process_id + "'></i>"); //动态id？
						html_arr.push("</div>")
						html_arr.push("</div>");

						if (item.process_comment_info != undefined) {
							for(var j = 0; j < item.process_comment_info.length; j++) {
								(function (item_comment) {
									html_arr.push("<div class='s_hf'><a class='a_branch' data-userId='" + item_comment.from_id + "' data-dynamicId='"+item.process_id+"'>" + item_comment.from_alias + "</a>：" + item_comment.say + "</div>");//??动态id
								})(item.process_comment_info[j]);
							}
						}
						
						html_arr.push("</dd>");
						html_arr.push("</dl>");
					})(data_pay.info[i]);
				}
				html_arr.push("</div>");
				var html_str = html_arr.join("");
				$('#div_pay_comment').html(html_str);
			}
			else if(data_pay.oret == '500') {
				console.log("接口异常@near 305");
			}
		})


		//获取用户信息
		var arr = f_tool_request_info(new Array('26', '1', userId));
		var obj = {
			apiParams: '{"myinfo":"","cmd":"A01.h5","info":"'+arr+'"}',
			url: sUrl
		}
		eAjax.fnAjax(obj, function (data_userInfo) {
			data_userInfo = $.parseJSON(data_userInfo);
			if (data_userInfo.oret == "1") {
				userNickName = data_userInfo.info[0].alias;				
			}
		});
		
	})();

	//关注部分	
	$("#div_follow").click(function () {
		//分支Id，项目Id，用户id，操作类别
		var arr = f_tool_request_info(new Array('10', proId, userId, v_item_follow_do));
		var obj = {
			apiParams: '{"myinfo":"","cmd":"A01.h5","info":"'+arr+'"}',
			url: sUrl,
		}
		eAjax.fnAjax(obj, 
			function (data) {
				data = $.parseJSON(data);
				if (data.oret == "1") {
					//已关注					
					if (data.info[0].followed_01 == '1') {
						v_item_follow_do ="2";
						$("#div_follow p").html("取消关注");						
					}
					else {
						v_item_follow_do ="1";
						$("#div_follow p").html("关注");		
					}
				}
			}, 
			function () {
				alert("网络异常");
			})
	});
   	$("#div_follow").trigger("click");
   	
	//评论编辑
	var cur_comment_control;
	var cur_comment_tag;
	$("#a_comment_ok").click(function () {
		var comment = $('#txtr_comment').val();
		var $dialog = $('#Dialog1');
		var dynamicId = $dialog.attr("data-dynamicId");
		var dynamicTypeId = $dialog.attr("data-dynamicTypeId");
		var isMaster = $dialog.attr("data-isMaster");
		var byReviewers = $dialog.attr("data-byReviewers");
		
		MakeComment(isMaster, dynamicTypeId, dynamicId, byReviewers, comment, function (status) {
			if (status) {
				switch (cur_comment_tag) {
					case "process_master":
						cur_comment_control.parent().parent()
						.parent().parent().find('.s_cot').append("<p class='s_fx'><span>"+userNickName+"</span>：" + comment + "</p>");
						
						//cur_comment_control.find('.s_cot').append("<div class='s_dc'><p class='s_wz'><span>"+userNickName+"</span>" + comment + "</p></div>");
						break;
					case "pay_master":
						cur_comment_control.parent().parent()
						.parent().parent().append("<div class='s_hf'><a class='a_branch' data-userId='"+userId+"' data-dynamicId='"+dynamicId+"'>"+userNickName+"</a>："+comment+"</div>");
						break;
					case "pay_master_replay":
						cur_comment_control.parent()
						.parent().append("<div class='s_hf'><a class='a_branch' data-userId='"+userId+"' data-dynamicId='"+dynamicId+"'>"+userNickName+"</a>："+comment+"</div>");
						break;
				}
			}
			else {
				alert("更新失败");
			}
		})

		$('#txtr_comment').val("");
		$('.pop').addClass('hide');
	})

	$("#a_comment_cancel").click(function () {
		$('#txtr_comment').val("");
		$('.pop').addClass('hide');
	})


	//进度动态评论
	$("#div_process").delegate(".i_process_master", "click", function () {
		$('.pop').removeClass('hide');

		var dynamicId = $(this).attr("data-dynamicId");
		var byReviewers = $(this).attr("data-userId");

		var $dialog = $('#Dialog1');
		$dialog.attr("data-dynamicId", dynamicId);
		$dialog.attr("data-dynamicTypeId", "1");
		$dialog.attr("data-byReviewers", byReviewers);
		$dialog.attr("data-isMaster", 1);

		cur_comment_tag = 'process_master';

		cur_comment_control = $(this);
	});
	
	
	

	//忽略分支评论
	$('.spn_process_branch').click(function () {
		var comment = "";
		var dynamicId = "";
		var dynamicTypeId = "1";//1—进度动态

		if(MakeComment("0", dynamicTypeId, dynamicId, comment)) {
			$('').append("");// ？？ UI
		}
		else {
			alert("更新失败");
		}
	})

	//捐款动态评论
	$("#div_pay_comment").delegate(".i_master", "click", function () {
		$('.pop').removeClass('hide');

		var dynamicId = $(this).attr("data-dynamicId");
		var byReviewers = $(this).attr("data-userId");

		var $dialog = $('#Dialog1');
		$dialog.attr("data-dynamicId", dynamicId);
		$dialog.attr("data-dynamicTypeId", "2");//动态类别id 2
		$dialog.attr("data-byReviewers", byReviewers);
		$dialog.attr("data-isMaster", 1);//是主线

		cur_comment_tag = 'pay_master';

		cur_comment_control = $(this);
	})
	
	//捐款动态评论--回复
	$("#div_pay_comment").delegate(".a_branch", "click", function () {
		$('.pop').removeClass('hide');

		var dynamicId = $(this).attr("data-dynamicId");
		var byReviewers = $(this).attr("data-userId");

		var $dialog = $('#Dialog1');
		$dialog.attr("data-dynamicId", dynamicId);
		$dialog.attr("data-dynamicTypeId", "2");//动态类别id 2
		$dialog.attr("data-byReviewers", byReviewers);
		$dialog.attr("data-isMaster", 1);//是主线

		cur_comment_tag = 'pay_master_replay';

		cur_comment_control = $(this);
	})

	//忽略分支评论
	$(".a_branch").click(function () {
		var comment = "";
		var dynamicId = $(this).attr("data-dynamicId");
		var dynamicTypeId = "2";//2—捐款动态

		if(MakeComment("0", dynamicTypeId, dynamicId, comment)) {
			$(this).append(""); // ?? UI
		}
		else {
			alert("更新失败");
		}
	})

	var MakeComment = function (isMaster, dynamicTypeId, dynamicId, byReviewers, comment, callback) {
		//分支id，是否是主线，动态类别id，动态id，评论者，被评论者，评论内容
		var arr = f_tool_request_info(new Array('15', isMaster, dynamicTypeId, dynamicId, userId, byReviewers, comment));
		var obj = {
			apiParams: '{"myinfo":"","cmd":"A01.h5","info":"'+arr+'"}',
			url: sUrl
		}
		eAjax.fnAjax(obj, 
			function (data) {
				data = $.parseJSON(data);
				if (data.oret == "1") {
					callback(true);
				}
				else {
					callback(false);
				}
			}, 
			function () {
				callback(false);
			})
	}
	
	//点击：我要捐助
	$("#do_ido").click(function (){
    	v_url_param =f_tool_scale_list(new Array(v_user_id
    																,v_item_id
    																,v_item_alias
    																,v_item_user_pic
    																));
 		console.log("pCheckStand.html?id="+v_url_param);															
		window.location.href ="pCheckStand.html?id=" +v_url_param;    																
	})	
	
});