/**
 *转换成&字符串格式
 */
function setHrefParam(json) {
	var url = '';
	if (json != null) {
		for (var key in json) {
			url += key + "=" + json[key] + '&';
		}
		url = url.substring(0, url.length - 1);
	}

	return url;
}

/**
 *解析页面传过来的参数
 */
function getQueryString(vhref, name) {
	// 如果链接没有参数，或者链接中不存在我们要获取的参数，直接返回空 
	if (vhref.indexOf("?") == -1 || vhref.indexOf(name + '=') == -1) {
		return '';
	}
	// 获取链接中参数部分 
	var queryString = vhref.substring(vhref.indexOf("?") + 1);
	// 分离参数对 ?key=value&key2=value2 
	var parameters = queryString.split("&");
	var pos, paraName, paraValue;
	for (var i = 0; i < parameters.length; i++) {
		// 获取等号位置 
		pos = parameters[i].indexOf('=');
		if (pos == -1) {
			continue;
		}
		// 获取name 和 value 
		paraName = parameters[i].substring(0, pos);
		paraValue = parameters[i].substring(pos + 1);

		if (paraName == name) {
			if (paraValue == "null" || paraValue == "undefined") {
				return '';
			}
			return decodeURI(paraValue.replace(/\+/g, " "));
		}
	}
	return '';
}
/*
 * 计算两个日期直接的天数
 * strDateStart开始时间
 * strDateEnd结束时间
 */
function getDays(strDateStart,strDateEnd){
   var strSeparator = "-"; //日期分隔符
   var oDate1;
   var oDate2;
   var iDays;
   var strDateStart2 = strDateStart.substr(0,10);
   var strDateEnd2 = strDateEnd.substr(0,10);
   var nowDate = getCurtime();
   var nowDate2 = nowDate.substr(0,10);
   
   oDate1= strDateStart2.split(strSeparator);
   oDate2= strDateEnd2.split(strSeparator);
   
   var strDateS = new Date(oDate1[0], oDate1[1]-1, oDate1[2]);
   var strDateE = new Date(oDate2[0], oDate2[1]-1, oDate2[2]);
   
   iDays = parseInt(Math.abs(strDateS - strDateE ) / 1000 / 60 / 60 /24);//把相差的毫秒数转换为天数 
   
   var comparDay = (Date.parse(strDateEnd2)-Date.parse(nowDate2))/3600/1000;
   var comparDay2 = (Date.parse(strDateStart2)-Date.parse(nowDate2))/3600/1000;
   if(comparDay < 0){
   	return '已结束';
   	//console.log("已结束");
   }else if(comparDay2 > 0){
   	return '未开始';
	//console.log("还没有到期");
   }else if(iDays >= 0){
	  	return '剩余'+ iDays +'天';
   }
   
   //return iDays;
}

/**
 * 获取时间到秒
 */
function getCurtime() {
	var now = new Date();
	var yy = now.getYear();
	if (yy < 1900) yy = yy + 1900;

	var MM = now.getMonth() + 1;
	if (MM < 10) MM = '0' + MM;

	var dd = now.getDate();
	if (dd < 10) dd = '0' + dd;

	var hh = now.getHours();
	if (hh < 10) hh = '0' + hh;

	var mm = now.getMinutes();
	if (mm < 10) mm = '0' + mm;

	var ss = now.getSeconds();
	if (ss < 10) ss = '0' + ss;

	var nowTime =yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
	return nowTime;
}

/*
 * 生成图片
 */
function f_pic_path_get(ipic_name,ipic_size_id){
	
	var v_pic_type_id;
	var v_pic_size_id;
	var v_pic_name;
	var v_pic_path;

	v_pic_type_id = ipic_name.substring(0,1); 
	v_pic_name = ipic_name.substring(1);

	v_pic_size_id = ipic_size_id;
	v_pic_path = String(v_pic_type_id) + "/" + String(v_pic_size_id) + "/" + String(v_pic_name.substring(0,8)) + "/" + String(v_pic_name);
	return v_pic_path;
}

function f_pic_array_get(ipic_array,ipic_pos){

	var v_pic_array = ipic_array.split(',');
	var v_pic_pos = ipic_pos;
	
	v_pic_pos = v_pic_pos -1;
	 
	return v_pic_array[v_pic_pos];
}

function getPicPath(nPath){
	var v_pic_head_url ="http://test.huluteng.com/pic/";		//图片路径头
	return String(v_pic_head_url)+f_pic_path_get(nPath,1); //获取完整的图片路径
}
//alert(String(v_pic_head_url)+f_pic_path_get('320160229120600_3_1',1));   //获取完整的图片路径
//alert(f_pic_array_get('320160229120600_1_1,320160229120600_2_1,320160229120600_3_1,',2));  //取出第n个图片名


/*
 * tab切换
 */
function tabSet($this,nItem,nClass){
	nItem.removeClass('on');
	$this.addClass('on');
	var title = $this.attr('forContent');
	nClass.hide();
	$("#" + title).fadeIn();
}

//加法函数
function accAdd(arg1, arg2) {
	var r1, r2, m;
	try {
		r1 = arg1.toString().split(".")[1].length;
	}
	catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	}
	catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	return (arg1 * m + arg2 * m) / m;
} 


//减法函数
function Subtr(arg1, arg2) {
	var r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length;
	}
	catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	}
	catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
     //last modify by deeka
     //动态控制精度长度
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

//处理乘法
function accMul(arg1, arg2) {
	var sStr = arg1;
	if(!sStr){
		sStr = 0;
	}
	
	var m = 0,
		s1 = sStr.toString(),
		s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length
	} catch (e) {}
	try {
		m += s2.split(".")[1].length
	} catch (e) {}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

//处理除法
function accDiv(arg1, arg2) {
	var t1 = 0,
		t2 = 0,
		r1, r2;
	try {
		t1 = arg1.toString().split(".")[1].length
	} catch (e) {}
	try {
		t2 = arg2.toString().split(".")[1].length
	} catch (e) {}
	with(Math) {
		r1 = Number(arg1.toString().replace(".", ""))
		r2 = Number(arg2.toString().replace(".", ""))
		return (r1 / r2) * pow(10, t2 - t1);
	}
}



/*
 * 解析项目类别
 */
var itemTypeDate = [
	{ key: '0', value:'其他' },
	{ key: '1', value:'助医' },
	{ key: '2', value:'助学' },
	{ key: '3', value:'养老' },
	{ key: '4', value:'助残' },
	{ key: '5', value:'创意' },
	{ key: '6', value:'梦想' },
	{ key: '7', value:'健康' },
	{ key: '8', value:'生活' }
];
function getItemType(itemId){
	for(var i=0;i<itemTypeDate.length;i++){
		if(itemId == itemTypeDate[i].key){
			return itemTypeDate[i].value;
		}
	}
}






