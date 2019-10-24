var urlParam= {};

//alert(urlParam.get_kv_array()['id']);
//alert(urlParam.append_kv('http://test.com',{"id":"hi","id2":"hi","id3":"hi"}));

//,url参数：解析出key/value数组
urlParam.get_kv_array = function () {
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

//,url参数：追加key/value至url
urlParam.append_kv = function (url, json) {
    if (!(url.indexOf('?') >= 0)) {
        url += '?';
    }
    if (url.indexOf('?') == (url.length - 1)) {
        $.each(json, function (name, val) {
            url += (name + "=" + val + "&");
        });
        return url.replace(/(&*$)/g,"")
    }
    else {
        $.each(json, function (name, val) {
            url += ("&" + name + "=" + val);
        });
        return url;
    }
}
