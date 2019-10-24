$(function() {
	gyIndex.url_id();			//解析url
	gyIndex.init_page()		//页面初始化
	gyIndex.init();				//页面操作
})

var gyIndex = (function() {
	var select_item;																				//跳转详情页对应项目id
	var nd;																								//当前时间
	var v_url_id;
	var user_id;																						//用户id
	var user_alias;																					//用户昵称
	var user_pic;																						//用户头像
	var phone_no;																					//用户手机号
	//传递参数
	var v_url_to;
	var proId;																						//项目id
	var proTypeId;																				//项目类型id
	var item_name																				//项目名称
	var upic																							//用户图片
	var BindControl = function() {
		
		$(".g_tab li").click(function() {															//发起、参与、关注点击切换
			$(".g_tab li").removeClass('first on');
			$(this).addClass('first on');
			$("#div_ProDetail").html("");
			 //var tabNum= $(this).attr("data-id");											//获取点击概览类别
			 var tabNum="3";																				//暂时定义类别为3,需要删除
			//alert(tabNum);
			GetProjectInfo(tabNum);
			ScrollControl();
		})
		
		//项目详情
		$(".to_item").die().live("tap",function(){
			select_item = $(this).find("span").eq(0).text();
			v_url_to =f_tool_scale_list(new Array(user_id,select_item));
			window.location.href="projectDetail.html?id="+v_url_to;
		})
		
		$(".g_man").die().live("tap",function() {																//项目管理弹出框
			
			var timeout;
			
			user_id =f_tool_scale_get(v_url_id,1);																//用户id
			proId = $(this).attr("data-id");																			//点击获取对应项目id
			proTypeId = $(this).attr("data-typeId");															//点击获取对应项目类别id
			item_name = $(this).attr("data-itemAlias");													//点击获取对应项目名称
			upic = $(this).attr("data-userPic");																	//点击获取对应用户头像
			
			//点击-“显示”-“隐藏”
			if($(".g_panel").css("display")=="none"){
				
				$(".g_panel").css("display", "block");
				timeout = setTimeout(function(){
					$(".g_panel").css("display", "none");
				},3000);
			}else{
				clearTimeout(timeout);
				$(".g_panel").css("display", "none");
			}	
			
				
		});
		
		
		
		$("#li_new").click(function() {																//更新
			$(".g_panel").css("display", "none");
			//list追加传递参数
			v_url_to =f_tool_scale_list(new Array(user_id,upic,proId,proTypeId,item_name));
			//window.location.href = "gyUpdate.html?userId="+user_id+"&proId="+proId;
			window.location.href = "gyUpdate.html?id="+v_url_to;
		})

		$("#li_stat").click(function() {																//统计跳转
			$(".g_panel").css("display", "none");
			//list追加传递参数
			v_url_to =f_tool_scale_list(new Array(user_id,upic,proId,proTypeId,item_name));
			window.location.href = "gyStat.html?id="+v_url_to;
		})

		$("#li_check").click(function() {															//提现验证跳转
			$(".g_panel").css("display", "none");
			//list追加传递参数
			v_url_to =f_tool_scale_list(new Array(user_id,upic,proId,proTypeId,item_name));
			window.location.href = "gyCheck.html?id="+v_url_to;
		});

		$("#li_over").click(function() {															//提前结束
			$(".g_panel").css("display", "none");
			$(".pop").css("display", "block");
		})
		
		$("#li_help").click(function() {																//帮助
			$(".g_panel").css("display", "none");
			window.location.href = "mhelpCenter.html?proId=" + proId + "&proTypeId=" + proTypeId;
		})

		$("#a_projOver_cancel").click(function() {										//提前结束“取消”
			$('.pop').css("display", "none");
		})

		$("#a_projOver_ok").click(function() {												//提前结束“确定”
			v_url_to =f_tool_scale_list(new Array(user_id,upic,proId,proTypeId,item_name));
			window.location.href = "gyEnd.html?id="+v_url_to;
		})
		
		$("#do_bottom_01").on('click',function(){										//首页
			v_url_to =f_tool_scale_list(new Array(user_id));
			window.location.href ="projectIndex.html?id="+v_url_to;
		});
		$("#do_bottom_02").on('click',function(){										//发起
			v_url_to =f_tool_scale_list(new Array(user_id));
			window.location.href ="launch.html?id="+v_url_to;
		});	
		$("#do_bottom_03").on('click',function(){										//公益主页
			v_url_to =f_tool_scale_list(new Array(user_id));
			window.location.href ="gyIndex.html?id="+v_url_to;
		});	
		$("#do_bottom_04").on('click',function(){										//我
			v_url_to =f_tool_scale_list(new Array(user_id));
			window.location.href ="myHome.html?id="+v_url_to;
		});
			
	}
	//滑动滚动条加载更多
	var ScrollControl = function(){
		var user_id =f_tool_scale_get(v_url_id,1);
  		var v_branch_id ="7";				//分支ID
		var page_index = 2;
		var page_size = "1";
		var tabNum ="3";						//类别
		
		$(window).scroll(function(){	
			if($(document).scrollTop() / ($(document).height() - $(window).height()) >=0.85){
				page_index=page_index+1;
				//console.log(page_index);
				var arr = f_tool_request_info(new Array(
																				v_branch_id
																				,String(page_index)
																				,page_size
																				,tabNum
																				,user_id
				));
				$.ajax({
					url: 'http://test.huluteng.com/dopost/h5',
					data: '{"myinfo":"","cmd":"A01.h5","info":"' + arr + '"}',
					type: 'post',
					dataType: 'json',
					success: function(data){
						if(data.oret == "1") {
							var arr_str;
							for(var i = 0, length = data.info.length; i < length; i++) {
							(function(item) {
							var nDay = getDays(nd,item.end_at);
							if(nDay>0){
									var dDay ="剩余"+nDay+"天";
								}else{
									var dDay ="已结束";
								}
							arr_str="<div class='s_box s_deta'>";
							arr_str=arr_str+"<dl class='s_info'>";
							var u_pic=item.user_pic;
							//alert(u_pic);
							var auser_pic = pic.url_get(u_pic,1);
							//alert(uesr_pic);
							arr_str=arr_str+"<dt><img width='100%'  src='" +auser_pic + "'></dt>";
							arr_str=arr_str+"<dd>";
							arr_str=arr_str+"<b>" + item.user_alias + "</b>";
							arr_str=arr_str+"<p><time>" + item.begin_at + "</time></p>";
							arr_str=arr_str+"<a data-id='" + item.item_id + "' data-typeId='" + item.item_type_id;
							arr_str=arr_str+"'data-userPic='"+auser_pic+"'data-itemAlias='"+item.alias+ "' class='x_man'></a>";
							arr_str=arr_str+"</dd>";
							arr_str=arr_str+"</dl>";

							arr_str=arr_str+"<div class='to_item'>";												//item
							arr_str=arr_str+"<span style='display:none'>"+ item.item_id +"</span>";
							arr_str=arr_str+"<div class='s_dc'>";
							arr_str=arr_str+"<h2 class='s_dtit'>";
							arr_str=arr_str+"<span>"+dDay+"</span>" +"<p>"+ item.alias+"</p>";                //已完成？
							arr_str=arr_str+"</h2>";
							arr_str=arr_str+"<p class='s_js'>" + item.item_desc + "</p>";
							arr_str=arr_str+"</div>";
								
							arr_str=arr_str+"<ul class='s_pic'>";
								
							var a_pic =item.pic_array;
							var s_pic =a_pic.split(",");						//项目图片返回字符串转换为数组
							for(var j = 0; j < s_pic.length-1; j++) {
								var b_pic = s_pic[j];
								var v_pic =pic.url_get(b_pic,1);
								arr_str=arr_str+"<li><a><img src='" + v_pic + "'></a></li>";
								if(j>=3){													//取前4张项目图片显示
									break;
								}
							}
							arr_str=arr_str+"</ul>";

							arr_str=arr_str+"<ul class='s_num'>";
							arr_str=arr_str+"<li>目标<span>￥" + item.coin_target + "</span></li>";
							arr_str=arr_str+"<li>已筹<span>￥" + item.coin_done + "</span></li>";
							arr_str=arr_str+"<li>支持<span>" + item.coin_support_count + "次</span></li>";
							arr_str=arr_str+"</ul>";
							
							arr_str=arr_str+"</div>";
							
							arr_str=arr_str+"</div>";
								
							$("#div_ProDetail").append(arr_str);
							})(data.info[i])
						}
				}else {
					$(window).unbind("scroll");
					//v_tip_item_say ="已全部加载";
					//f_show_tip(v_tip_item_say);	
				}
			},
			error: function() {
				//alert("异常!");
			}
		});
			}
		});
	}
		
	
	//概览类别加载
	var GetProjectInfo = function(tabNum) {
		//初始化页面
		//$("#div_ProDetail").html("");
		//分支Id，起始页，页大小，概览类别Id
		user_id =f_tool_scale_get(v_url_id,1);
  		var v_branch_id ="7";				//分支ID
		var page_index = "1";
		var page_size = "2";
		//var arr = f_tool_request_info(new Array("7",page_index,page_size,tabNum));
		var arr = f_tool_request_info(new Array(
																				v_branch_id
																				,page_index
																				,page_size
																				,tabNum
																				,user_id
		));
		$.ajax({
			url: 'http://test.huluteng.com/dopost/h5',
			data: '{"myinfo":"","cmd":"A01.h5","info":"' + arr + '"}',
			type: 'post',
			dataType: 'json',
			success: function(data){
				if(data.oret == "1") {
					var arr_str;
					for(var i = 0, length = data.info.length; i < length; i++) {
							(function(item) {
							var nDay = getDays(nd,item.end_at);
							if(nDay>0){
									var dDay ="剩余"+nDay+"天";
								}else{
									var dDay ="已结束";
								}
							arr_str="<div class='s_box s_deta'>";
							arr_str=arr_str+"<dl class='s_info'>";
							var u_pic=item.user_pic;
							//alert(u_pic);
							var auser_pic = pic.url_get(u_pic,1);
							//alert(uesr_pic);
							arr_str=arr_str+"<dt><img width='100%'  src='" +auser_pic + "'></dt>";
							arr_str=arr_str+"<dd>";
							arr_str=arr_str+"<b>" + item.user_alias + "</b>";
							arr_str=arr_str+"<p><time>" + item.begin_at + "</time></p>";
							arr_str=arr_str+"<a data-id='" + item.item_id + "' data-typeId='" + item.item_type_id;
							arr_str=arr_str+"'data-userPic='"+auser_pic+"'data-itemAlias='"+item.alias+ "' class='x_man'></a>";
							arr_str=arr_str+"</dd>";
							arr_str=arr_str+"</dl>";
							
							arr_str=arr_str+"<div class='to_item'>";												//item
							arr_str=arr_str+"<span style='display:none'>"+ item.item_id +"</span>";
							arr_str=arr_str+"<div class='s_dc'>";
							arr_str=arr_str+"<h2 class='s_dtit'>";
							arr_str=arr_str+"<span>"+dDay+ "</span>" +"<p>"+ item.alias+"</p>";               //已完成？
							arr_str=arr_str+"</h2>";
							arr_str=arr_str+"<p class='s_js'>" + item.item_desc + "</p>";
							arr_str=arr_str+"</div>";
								
							arr_str=arr_str+"<ul class='s_pic'>";
								
							var a_pic =item.pic_array;
							var s_pic =a_pic.split(",");						//项目图片返回字符串转换为数组
							for(var j = 0; j < s_pic.length-1; j++) {
								var b_pic = s_pic[j];
								var v_pic =pic.url_get(b_pic,1);
								arr_str=arr_str+"<li><a><img src='" + v_pic + "'></a></li>";
								if(j>=3){													//取前4张项目图片显示
									break;
								}
							}
							arr_str=arr_str+"</ul>";

							arr_str=arr_str+"<ul class='s_num'>";
							arr_str=arr_str+"<li>目标<span>￥" + item.coin_target + "</span></li>";
							arr_str=arr_str+"<li>已筹<span>￥" + item.coin_done + "</span></li>";
							arr_str=arr_str+"<li>支持<span>" + item.coin_support_count + "次</span></li>";
							arr_str=arr_str+"</ul>";
							
							arr_str=arr_str+"</div>";
							
							arr_str=arr_str+"</div>";
								
							$("#div_ProDetail").append(arr_str);
							})(data.info[i])
						}
				}else {
					alert(data);
				}
			},
			error: function() {
				alert("异常!");
			}
		});
		
		
		
	}
	//url参数解析
	var url_id_get =function(){		
			var v_kv_map =urlParam.get_kv_array();
			v_url_id =v_kv_map["id"];	
			v_url_id =decodeURI(v_url_id);
			return v_url_id;			
	} 
	
	//获取本地时间
	var myDate =function(){
		var d = new Date();
  		var y =d.getFullYear();
  		var m = d.getMonth()+1;
  		var td = d.getDate();
  		var h = d.getHours();
  		var mf = d.getMinutes();
  		var s = d.getSeconds();
  		if(m<10){
  			m = "0"+m;
  		}
  		if(td<10){
  			td = "0"+td;
  		}
  		if(h<10){
  			h = "0"+h;
  		}
  		if(mf<10){
  			mf = "0"+mf;
  		}
  		if(s<10){
  			s = "0"+s;
  		}
  		 nd = y+"-"+m+"-"+td+" "+h+":"+mf+":"+s;
  		
  		return nd;
	}

	//页面初始化  用户信息显示
  	var f_user_info =function(){  
  		//alert(nd);
  		//解析用户id
  		//$("#div_ProDetail").html("");
  		user_id =f_tool_scale_get(v_url_id,1);
  		var v_branch_id ="26";			//分支ID
		var v_come_id ="1";				//来源ID
	 	var arr = f_tool_request_info(new Array(v_branch_id
																						,v_come_id
																						,user_id
																	));
	 		
	 	$.ajax({
				url: 'http://test.huluteng.com/dopost/h5',
				data: '{"myinfo":"","cmd":"A01.h5","info":"' + arr + '"}',
				type: 'post',
				dataType: 'json',
				success: function(data){
					if (data.oret == "1") {
						var list = data.info[0];
						//去掉图片回传字符串最后一个逗号
						var r_user_pic = list.pic;
						user_pic =pic.url_get(r_user_pic,1);
						
						$('#v_user_alias').html(list.alias);//昵称
						$('#v_user_pic').attr('src',user_pic);//头像
						$('#vv_user_alias').html(list.alias);//昵称
					} 
					else{
						v_tip_item_say ="请稍后再试";
						f_show_tip(v_tip_item_say);	
					}
				},
				error: function() {
					v_tip_item_say ="系统错误, 请稍后再试";
					f_show_tip(v_tip_item_say);		
				}
		});
  		
  	}
  	//页面初始化  项目信息显示
  	var f_user_item = function(){
  		
  		//alert(v_url_id);
  		user_id =f_tool_scale_get(v_url_id,1);
  		//alert(user_id);
  		var v_branch_id ="7";				//分支ID
		var page_index = "1";				//起始页
		var page_size = "2";					//页大小
		var tabNum ="3";						//类别
		var arr = f_tool_request_info(new Array(
																				v_branch_id
																				,page_index
																				,page_size
																				,tabNum
																				,user_id
		));
		//alert(arr);
		$.ajax({
				url: 'http://test.huluteng.com/dopost/h5',
				data: '{"myinfo":"","cmd":"A01.h5","info":"' + arr + '"}',
				type: 'post',
				dataType: 'json',
				success: function(data){
					if (data.oret == "1") {
						var arr_str;
						for(var i = 0, length = data.info.length; i < length; i++) {
								(function(item) {
								var nDay = getDays(nd,item.end_at);
								if(nDay>0){
									var dDay ="剩余"+nDay+"天";
								}else{
									var dDay ="已结束";
								}
								arr_str="<div class='s_box s_deta'>";
								arr_str=arr_str+"<dl class='s_info'>";
								var u_pic=item.user_pic;
								//alert(u_pic);
								var auser_pic = pic.url_get(u_pic,1);
								//alert(uesr_pic);
								arr_str=arr_str+"<dt><img width='100%'  src='" +auser_pic + "'></dt>";
								arr_str=arr_str+"<dd>";
								arr_str=arr_str+"<b>" + item.user_alias + "</b>";
								arr_str=arr_str+"<p><time>" + item.begin_at + "</time></p>";
								arr_str=arr_str+"<a data-id='" + item.item_id + "' data-typeId='" + item.item_type_id;
								arr_str=arr_str+"'data-userPic='"+auser_pic+"'data-itemAlias='"+item.alias+ "' class='x_man'></a>";
								//arr_str=arr_str+"<a data-id='" + item.item_id + "' data-typeId='" + item.item_type_id + "' class='g_man'></a>";
								arr_str=arr_str+"</dd>";
								arr_str=arr_str+"</dl>";
								
								arr_str=arr_str+"<div class='to_item'>";												//item
								arr_str=arr_str+"<span style='display:none'>"+ item.item_id +"</span>";
								arr_str=arr_str+"<div class='s_dc'>";
								arr_str=arr_str+"<h2 class='s_dtit'>";
								arr_str=arr_str+"<span>" +dDay+ "</span>" +"<p>"+ item.alias+"</p>";              //已完成？
								arr_str=arr_str+"</h2>";
								arr_str=arr_str+"<p class='s_js'>" + item.item_desc + "</p>";
								arr_str=arr_str+"</div>";
								
								arr_str=arr_str+"<ul class='s_pic'>";
								
								var a_pic =item.pic_array;
								var s_pic =a_pic.split(",");						//项目图片返回字符串转换为数组
								for(var j = 0; j < s_pic.length-1; j++) {
									var b_pic = s_pic[j];
									var v_pic =pic.url_get(b_pic,1);
									arr_str=arr_str+"<li><a><img src='" + v_pic + "'></a></li>";
									if(j>=3){													//取前4张项目图片显示
										break;
									}
								}
								arr_str=arr_str+"</ul>";

								arr_str=arr_str+"<ul class='s_num'>";
								arr_str=arr_str+"<li>目标<span>￥" + item.coin_target + "</span></li>";
								arr_str=arr_str+"<li>已筹<span>￥" + item.coin_done + "</span></li>";
								arr_str=arr_str+"<li>支持<span>" + item.coin_support_count + "次</span></li>";
								arr_str=arr_str+"</ul>";
								
								arr_str=arr_str+"</div>";														//item
								
								arr_str=arr_str+"</div>";
								
								$("#div_ProDetail").append(arr_str);
							})(data.info[i])
						}	
					} else{
						//alert("aaaa");
						v_tip_item_say ="请稍后再试";
						f_show_tip(v_tip_item_say);	
					}
				},
				error: function() {
					//alert();
					v_tip_item_say ="系统错误, 请稍后再试";
					f_show_tip(v_tip_item_say);		
				}
		});
		
		
  	}
  	//提示：设置
  	var f_show_tip =function(itip_say){
				var v_tip_item_say ='<i class="bd"></i>'+itip_say;
				$("#tip_item_say").html(v_tip_item_say);
				$("#tip_item").show();
				$("#tip_item").fadeOut(1500);  	
  	}
  	
	return {
		init: function() {
			BindControl();
			ScrollControl();
		},
		
		//url参数：解析
		url_id : function() {
			url_id_get();
			myDate();
		},
		
		//页面：初始化
		init_page : function() {
			f_user_info();	
			f_user_item();
		}
	}
})()


