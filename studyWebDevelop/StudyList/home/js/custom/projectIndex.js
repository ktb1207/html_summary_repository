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
	
	var v_user_id;

	url_id_get();	
	v_user_id =f_tool_scale_get(v_url_id,1); 
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
	//底部导航
	//发布项目
	$("#jump_02").click(function(){
		v_url_param =f_tool_scale_list(new Array(v_user_id));
		window.location.href ="launch.html?id=" +v_url_param;
	});	
	//公益主页
	$("#jump_03").click(function(){
		v_url_param =f_tool_scale_list(new Array(v_user_id));
		window.location.href ="gyIndex.html?id=" +v_url_param;
	});
	$("#jump_04").click(function(){
		v_url_param =f_tool_scale_list(new Array(v_user_id));
		window.location.href ="myHome.html?id=" +v_url_param;
	});	
	
	
	
	//-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 	 
	//缓存对象
	var _topProCon = $('#topProCon');	
	var _goodProCon = $('#goodProCon');	
	
	var prev = $("#prev");
	var backHome = $("#backHome");
	var next = $("#next");
	
	var prev2 = $("#prev2");
	var backHome2 = $("#backHome2");
	var next2 = $("#next2");
	
	
	//构建对象
	var	eAjax = new EncryptAjax(); //构造ajax对象
	var proItem = new proItem();//构造项目item对象
	
	//全局
	var gCurPage1 = 1; //当前前页码
	var gCurPage2 = 1; //当前前页码
	var gPageSize = 3;
	
	/****************推荐 操作*******************/
	//推荐翻页：next后
	next.on('tap',function(){//下一页
		prev.removeClass('disabled');
		if($(this).hasClass('disabled')){
			return false;
		}else{			
			gCurPage1++;
			getProList(gCurPage1.toString(),'3','1',_topProCon);
		}
		
	});
	//推荐翻页：pre前
	prev.on('tap',function(){//上一页
		if(gCurPage1 == '1'){
			$(this).addClass('disabled');
			return false;
		}else{
			$(this).removeClass('disabled');
			next.removeClass('disabled');
			gCurPage1--;
			getProList(gCurPage1.toString(),'3','1',_topProCon);
		}
	});
	//推荐翻页：home
	backHome.on('tap',function(){//下一页
		gCurPage1 = 1;
		prev.addClass('disabled');
		next.removeClass("disabled");
		getProList(gCurPage1.toString(),'3','1',_topProCon);
	});
	
	/****************精选 操作*******************/
	//精选翻页：next后
	next2.on('tap',function(){//下一页
		prev2.removeClass('disabled');		
		if($(this).hasClass('disabled')){
			return false;
		}else{			
			gCurPage2++;
			getProList(gCurPage2.toString(),'3','2',_goodProCon);
		}
		
	});
	//精选翻页：pre前	
	prev2.on('tap',function(){//上一页
		next2.removeClass('disabled');
		if(gCurPage2 == '1'){
			$(this).addClass('disabled');
			return false;
		}else{
			$(this).removeClass('disabled');
			gCurPage2--;
			getProList(gCurPage2.toString(),'3','2',_goodProCon);
		}
	});
	//精选翻页：home		
	backHome2.on('tap',function(){//下一页
		gCurPage2 = 1;
		prev2.addClass('disabled');
		next2.removeClass("disabled");
		getProList(gCurPage2.toString(),'3','2',_goodProCon);
	});
	
	/**************首次加载*************/
	getProList('1','3','1',_topProCon);
	getProList('1','3','2',_goodProCon);
	
	/**
	 * 请求项目列表
	 * nItem 1：推荐募歀  2：精选募歀
	 * nCurPage 当前页数
	 * nPageSize 每页条数
	 */
	function getProList(nCurPage,nPageSize,nItem,theList){
		
		var nextParams = {
			theList: theList,
			nItem:nItem
		};
		
		var arr= f_tool_request_info(new Array('7',nCurPage,nPageSize,nItem));
		
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
		try {
			var obj = eval('(' + data + ')');
			var oret = obj.oret;
			var infoList  = obj.info;
			var theList = params.theList;
			var nItem = params.nItem;
			
			if (oret == '1') {
				if(nItem == '1'){
					_topProCon.html('');
				}else if(nItem == '2'){
					_goodProCon.html('');
				}
				setTimeout(function(){
					for(var i=0;i<infoList.length;i++){
						proItem.fnShowInfo(infoList[i],theList,0,function(btn){},v_pact);
					}
				},500);
				
				//load.fnHide();
			}else if(oret == '10'){
				if(nItem == '1'){
					gCurPage1--;
					next.addClass("disabled");
				}else if(nItem == '2'){
					gCurPage2--;
					next2.addClass("disabled");
				}
			}else {
				//load.fnHide();
				//msg.fnShowInfo(respMsg, '', '我知道了', function(btn) {});
				alert('失败');
			}
		} catch (e) {
			//load.fnHide();
			//msg.fnShowInfo('系统繁忙，请稍后再试', '', '我知道了', function(btn) {});
			alert('异常');
		}
	}
	/**
	 * 失败回调
	 */
	function errorCallBank(){
		//load.fnHide();
		//msg.fnShowInfo('系统繁忙，请稍后再试', '', '我知道了', function(btn) {});
	}
	
	
	
	//tab切换
	var tabLi = $(".s_tab li");
	var proindex = $('.proindex');
	tabLi.bind("tap",function(){
		var $this = $(this);
		tabSet($this,tabLi,proindex);
	});
});