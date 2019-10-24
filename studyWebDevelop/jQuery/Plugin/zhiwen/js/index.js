
//index.js
$(function(){
/*******************************查询按钮*******************************/
	$('#search_button').button({			
		icons : {
			primary : 'ui-icon-zoomout',	//按钮前增加图标
			//secondary:' ui-icon-triangle-1-s'		//按钮后面增加图标
		},
	});	

/******************************注册***********************************/
	//$('#reg_a').click(function(){
		$('#reg').dialog({
		autoOpen:true,
		modal:true,
		width:320,
		height:340,
		resizable:false,
		buttons:{
			'提交':function(){
				alert('注册信息已提交！')
			},
			'取消':function(){
				$('#reg').dialog('close');
			},
		},
	});
	//});
	
/*****************************性别按钮*********************************/
	//$('#reg').buttonset();

/*****************************生日*****************************************/
	$('#date').datepicker({
		dateFormat:'yy-mm-dd',		//显示的日历格式年-月-日
		//dayNames:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
		//dayNamesShort:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
		dayNamesMin:['日','一','二','三','四','五','六'],
		monthNames:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
		monthNamesShort:['一','二','三','四','五','六','七','八','九','十','十一','十二'],
		firstDay:1,
		//showOtherMonths:true,			//补充填充显示，但是补充的不可选
		//selectOtherMonths:true,		//补充显示的可以选择了，上一个为true为前提
		changeMonth:true,				//显示月份下拉菜单快速选择
		changeYear:true,				//显示年份快速选择下拉菜单
		//autoSize:true,				//是否自动调整显示大小
		//showOn:'button',				//显示一个按钮
		//buttonText:'日历',			//改变按钮显示的文本字体
		//showButtonPanel:true,			//当为true时打开日历控制面板
		//closeText:'关闭',				//关闭文本字体设置
		//currentText:'今天',				//日历控制面板今天文本
		//nextText:'下一月',				//日历前后翻页提示文本
		//prevText:'上一月',				//日历前后翻页提示文本
		//yearSuffix:'年',				//年数字后面增加字体‘年’
		//showMonthAfterYear:true,		//调换年月显示方式
		yearRange:'1950:2020',			//年份下拉选择区间
	});
/***************************提醒输入*************************************/
	$('#reg input[title]').tooltip({
		position:{				//提示框位置
			my:'left+5 center',
			at:'right center'
		},	
	});

/************************邮箱自动补全autocomplete*************************/
	
	$('#email').autocomplete({
		delay:100,				//延迟时间
		autoFocus:true,			//默认为false，为true第一项默认选定
		source:function(request,response){
			//获取用户输入的内容
			//alert(request.term);
			//绑定数据源,会全部显示出来
			//response(['aa','aaa','bbb','cc','dddd']);
			//定义域名集合
			var hosts=['qq.com','163.com','168.com','sina.com.cn'],
				term=request.term,		//获取用户输入的内容
				name=term,				//邮箱的用户名
				host='',				//邮箱的域名
				ix=term.indexOf('@'),	//@的位置
				result=[];				//邮箱最终呈现的列表

			result.push(term);

			//当有@的时候重新分配用户名和域名
			if(ix>-1){
				name=term.slice(0,ix);
				host=term.slice(ix+1);
			}

			if(name){
				//如果用户已经输入@和后面的域名
				//那么就找到相关的域名提示比如bnaa@1,则提示bnaa@163.com
				//如果用户还没有输入@或者后面的域名
				//那么把所有的域名都提示出来
				var findHosts=[];
				if(host){
					findHosts=$.grep(hosts,function(value,index){
						return value.indexOf(host)>-1;
					});
				}else{
					findHosts=hosts;
				}
				var findResult=$.map(findHosts,function(value,index){
					return name+'@'+value;
				
				});
				result=result.concat(findResult);
			}
			response(result);
		},		
	});
/******************************************************************/
		
});