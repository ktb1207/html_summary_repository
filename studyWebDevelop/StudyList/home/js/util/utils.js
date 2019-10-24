var utils = {};

utils.addDate = function addDate(dd,dadd){
    var a = new Date(dd)
    a = a.valueOf()
    a = a + dadd * 24 * 60 * 60 * 1000
    a = new Date(a)
    return a;
}

utils.formatDate = function formatDate(date, fmt) { //author: meizz  
    var $this = date; 
    var o = {   
        "M+" : $this.getMonth()+1,                 //月份   
        "d+" : $this.getDate(),                    //日   
        "h+" : $this.getHours(),                   //小时   
        "m+" : $this.getMinutes(),                 //分   
        "s+" : $this.getSeconds(),                 //秒   
        "q+" : Math.floor(($this.getMonth()+3)/3), //季度   
        "S"  : $this.getMilliseconds()             //毫秒   
    };   
    if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, ($this.getFullYear()+"").substr(4 - RegExp.$1.length));   
    for(var k in o)   
        if(new RegExp("("+ k +")").test(fmt))   
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
    return fmt;   
} 

//获取url中的get参数
utils.url_getParameter = function () {
    var url = location.search; //获取url中"?"符后的字串，包括?
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] =
                (strs[i].split("=")[1]) == "null" ? "" : (strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

//在url中添加get参数
utils.url_addParameter = function (url, json) {
    if (!(url.indexOf('?') >= 0)) {
        url += '?';
    }

    if (url.indexOf('?') == (url.length - 1)) {
        $.each(json, function (name, val) {
            url += (name + "=" + val + "&");
        });
        return utils.str_TrimRight(url);
    }
    else {
        $.each(json, function (name, val) {
            url += ("&" + name + "=" + val);
        });
        return url;
    }
}

//utils.ajax({"url":"", "data":"", "type":"post", "dataType":"json"}, function(data){}, function(){});
utils.ajax = function(option, fn_success, fn_error) {
    var default_option = {
        "url" : "http://test.huluteng.com/dopost/h5",
        "data" : "{'myinfo':'','cmd':'A01.h5','info':'" + option.data + "'}",
        "type" : "post",
        "dataType" : "json"
    }
    var setting = $.extend({}, default_option, option);

    $.ajax({
        url: setting.url,
        data: setting.data,
        type: setting.type,
        dataType: setting.dataType,
        success: fn_success,
        error: fn_error
    });
}


//xhui
utils.showdate =function (n) 
{ 
var uom = new Date(new Date()-0+n*86400000); 
uom = uom.getFullYear() + "-" + (uom.getMonth()+1) + "-" + uom.getDate(); 
return uom; 
} 