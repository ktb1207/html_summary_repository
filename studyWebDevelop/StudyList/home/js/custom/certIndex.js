
$(function(){
	mydo.url_id();
	mydo.init_page();
	mydo.init();
	
})

var mydo=(function(){
	var v_user_id="1";//项目id
	var v_url_to;//接口
	
		//事件的绑定
		var BindControl=function(){
				$("#rig").click(function(){
					window.location.href="certOrgtion.html?id="+v_url_to;
				})
				$("#rig1").click(function(){
					window.location.href="certPerson.html?id="+v_url_to;
				})
			//底部导航链接
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
		//公益主页：链接
		$("#do_bottom_04").click(function(){
			window.location.href ="myHome.html?id="+v_url_to;
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
  		
  		v_user_id =f_tool_scale_get(v_url_id,1);
  	
  		v_url_to =f_tool_scale_list(new Array(
																v_user_id
												));
											
  	}
    
		return {
		init : function(){
			BindControl();	
		},
		
	   //url参数：解析
		url_id : function() {
			url_id_get();
		},
		
		//页面：初始化
		init_page : function() {
			f_user_info();			
		},		
	}
		
})();
