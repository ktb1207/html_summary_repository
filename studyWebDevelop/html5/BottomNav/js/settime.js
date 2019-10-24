$(function(){
	
	var sec=9;			//初始化分钟
	var min=60;			//初始化秒
	var k=0;
	
	//60s循环
	
	var formin=function(){
		
		min=min-1;
		//console.log(min);
		if(min<0){
			min=59;
			sec=sec-1;
			k=k+1;
			//console.log(k);
		}
		
		//秒字符拼接
		var asc=min;
		if(asc<10){
			asc="0"+asc;
		}
		
		$("#secvalue").html(sec);
		$("#minvalue").html(asc);
		
		//清除循环
		if(k==9&&min==0){
			console.log();
			clearInterval(setmin);
		}
	}
	
	var setmin = setInterval(formin,1000);
	
	
	
})
