$(function(){
	var $q = jQuery.noConflict(); 					//解决jquery和zepto冲突
	Array.prototype.indexVf=function(arr){
		for(var i=0;i<this.length;i++){
			if(this[i]==arr){
				return i;
			}
				
		}
	}
	var test = "ABPID=123&APPID=B123&NONCESTR=ANS&TASSR=加菲&TIMESTAMP=1472705763";
	var testm5 = $q.md5(test);
	var preary = ["service","partner","sellerId","inputCharset","paymentType","privateKey","notifyUrl","returnUrl","outTradeno","subject","totalFee","showUrl","body"];
	var px = preary.sort();
	console.log(px);
	console.log(test);
	console.log(testm5);
	
	function getObjectString(data){
		
		var data_name=[];
		var data_value=[];
		var data_name_sort=[];
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
				a_string = a_string+'&'+name_sort[i]+'='+data_value[k];
			}
			
		}
		a_string = a_string.toUpperCase();
		a_string = $q.md5(a_string);
		
		return a_string;
	}
	var godata = {"tokenId":"TokenId","orderId":"orderId","price":"orderPrice","totalPrice":"totalPrice","payType":1,"alipayCode":"9000","ssid":"xxxx"};
	getObjectString(godata);
})
