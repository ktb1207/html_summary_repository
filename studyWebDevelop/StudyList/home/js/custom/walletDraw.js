$(function() {
	mydo.url_id();
	mydo.init_page();
	mydo.init();
})

var mydo = (function() {
	var v_url_id;													//接口参数
	var v_url_to													//接口参数
	var userId;														//用户id
	var cur_page_num = 1;
	var cur_page_size = 3;
	
	var BindControl = function() {
		$(".s_order").delegate('.s_sqtx', 'click', function() {
			//点击获取对应的项目id
			var a_item=$(this).find("dd>span").text();				//项目ID item_id
			window.location.href = "walletDraw_sq.html?user_id=" + userId+ "&balance=" + a_item;
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
	};

	
	var BindTable = function() {
		$(document).scroll(function(event) {
			var viewH = $(this).height(),
			contentH = $(this).find("body").height(),
			scrollTop = $(this).scrollTop();
			if (scrollTop / (viewH - contentH) >= 0.95) {
				//alert("Loading info");
				cur_page_num = (Number(cur_page_num) + 1) + "";
				GetProject(cur_page_num, cur_page_size);
			}
		})
	}
	
	//page_index   page_size
	var GetProject = function(page_index,page_size) {
		//$("#dl_loading").css("display", "block");
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
				var item= data.info[0];
				if(data.oret == "1") {  
					
					$("#dl_loading").css("display", "none");
					var arr_str ="";
					//获取数据进行绑定
					for(var i = 0, length = data.info.length; i < length; i++) {
						(function(item) {
							var a_pic = item.user_pic;
							var v_pic = pic.url_get(a_pic,1);
							arr_str =arr_str +"<dl class='s_oList   s_sqtx'>";
							arr_str =arr_str +"<dt><img src='" + v_pic+ "'></dt>"; 
							arr_str =arr_str +"<dd class='mid'>";
							arr_str =arr_str +"<p>" +item.item_alias+ "</p>";
							arr_str =arr_str+"<span style='display:none'>"+item.item_id+"</span>";
							arr_str =arr_str +"<b>项目余额：<span class='let'>" +item.item_coin_left+ "元</span><a data-proId='" +item.item_id+ "' data-balance='" +item.item_coin_left+ "' class='rig'>申请提现</a></b>";
							arr_str =arr_str +"</dd>";
							arr_str =arr_str +"</dl>";				
						})(data.info[i])
					}
					
				 	$("#dl_loading").before(arr_str);
				}
				else {
					alert("else");
				}
			},
			error: function() {
				alert("异常!");
			}
		});
	};
	
	//解析url中id参数
		var url_id_get =function(){		
			var v_kv_map =urlParam.get_kv_array();
			v_url_id =v_kv_map["id"];	
			v_url_id =decodeURI(v_url_id);
			return v_url_id;			
	} 
	//页面初始化
		var f_user_info =function(){  
		$("#dl_loading").css("display", "block");
  		//解析用户id
  			userId =f_tool_scale_get(v_url_id,1);

		
  		//list追加id值		
			v_url_to =f_tool_scale_list(new Array(
							userId
						));
  	}
	return {
		
		init: function() {			
			BindControl();
			BindTable();
		},
		//url参数：解析
		url_id : function() {
			url_id_get();			
		},
		//页面：初始化
		init_page : function() {
			f_user_info();	
			GetProject(1, 30);
		}
	}
})()