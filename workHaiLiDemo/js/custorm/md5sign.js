$(function(){
	//解决jquery和zepto冲突
	var $q = jQuery.noConflict(); 	
	var stringdata ='{"tokenId":"tokenId","orderId":"orderId","price":"price","totalPrice":"totalPrice","payType":8,"alipayCode":"SUCCESS","blank":" ","ssid":"getssid"}';
	var postData = {"tokenId":"tokenId","orderId":"orderId","price":"price","totalPrice":"totalPrice","payType":8,"alipayCode":"SUCCESS","blank":" ","ssid":"getssid"};
	//返回数组索引
	Array.prototype.indexVf=function(arr){
		for(var i=0;i<this.length;i++){
			if(this[i]==arr){
				return i;
			}
				
		}
	}
	
	$(".sign_start").html("待签名:"+stringdata);
	getObjectString(postData);
	/*md5签名加密
	 其中tokenId、ssid、空值不参与签名*/
	function getObjectString(data){
		var data_name=[];					//保存对象名
		var data_value=[];					//保存对象值
		var data_name_sort=[];				//对象名排序
		for(var x in data){
			data_name.push(x);
			data_name_sort.push(x);
			data_value.push(data[x]);
		}
		var name_sort = data_name_sort.sort();
		var a_string = 'SING=HLYF';
		for(var i=0;i<name_sort.length;i++){
			if(name_sort[i]!='tokenId' && name_sort[i]!='ssid'){
				var k =data_name.indexVf(name_sort[i]);
				if(data_value[k]!=" "){
					a_string = a_string+'&'+name_sort[i]+'='+data_value[k];
				}else{
					
				}
				
			}
			
		}
		$(".sign_ing").html("排序:"+a_string);
		a_string = a_string.toUpperCase();
		a_string = $q.md5(a_string);
		//return a_string;
		$(".sign_end").html("签名值:"+a_string);
	}
	
	
	
})
