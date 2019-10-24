$(function(){
	index.init_page();
	index.init_control();
})

var index = (function(){
	
	var dataurl = getDataUrl();				//url路径公共头部
	var TokenId = localStorage.getItem("tokenId");			//获取本地用户id
	//var TokenId ='NFdTdTNOS0Y3SE9tbFd5aTRkWGNLQjhPUVdCSExQY0hoeVdjMmlUa2pXMlY1WFR1TGJZemlvT1EzMEZBSTZ0VQ==';
	var flag;												//点击类型判断
	//页面控制部分
	var bind_control = function(){
		//点击洗衣
		$("#clothes").on("tap",function(){
			flag='1';
			if(TokenId==null){
				window.location.href='nearbyList.html?dt='+flag;
			}else{
				//判断是否有收藏或者下单记录
				$.ajax({
           			type:"GET",
          	 		url:''+dataurl+'/api/user/getOrderHistoryOrFavoriteExists.api',
           			data:{"tokenId":TokenId,"deviceType":flag,"ssid":getTime()},
           			dataType:"jsonp",
           			jsonp:'outAccess',
           			success:function(data){
           				console.log(data.data.isExists);
           				
           				if(data.data.isExists=='1'){
           					window.location.href='recommend.html?dt='+flag;
           				}else{
           					window.location.href='nearbyList.html?dt='+flag;
           				}
           				
           			},
           			error:function(){
           				
           			}
				});
			}
		})
		//点击烘干
		$("#dry").on("tap",function(){
			flag='2';
			if(TokenId==null){
				window.location.href='nearbyList.html?dt='+flag;
			}else{
				//判断是否有收藏或者下单记录
				$.ajax({
           			type:"GET",
          	 		url:''+dataurl+'/api/user/getOrderHistoryOrFavoriteExists.api',
           			data:{"tokenId":TokenId,"deviceType":flag,"ssid":getTime()},
           			dataType:"jsonp",
           			jsonp:'outAccess',
           			success:function(data){
           				console.log(data.data.isExists);
           				if(data.data.isExists=='1'){
           					window.location.href='recommend.html?dt='+flag;
           				}else{
           					window.location.href='nearbyList.html?dt='+flag;
           				}
           			},
           			error:function(){
           				
           			}
				});
			}
			
		})
		//点击洗鞋
		$("#shoes").on("tap",function(){
			flag='3';
			if(TokenId==null){
				window.location.href='nearbyList.html?dt='+flag;
			}else{
				//判断是否有收藏或者下单记录
				$.ajax({
           			type:"GET",
          	 		url:''+dataurl+'/api/user/getOrderHistoryOrFavoriteExists.api',
           			data:{"tokenId":TokenId,"deviceType":flag,"ssid":getTime()},
           			dataType:"jsonp",
           			jsonp:'outAccess',
           			success:function(data){
           				console.log(data.data.isExists);
           				if(data.data.isExists=='1'){
           					window.location.href='recommend.html?dt='+flag;
           				}else{
           					window.location.href='nearbyList.html?dt='+flag;
           				}
           			},
           			error:function(){
           				
           			}
				});
			}
			
		})
		
	}
	
	//页面初始化部分
	var page_info = function(){
		
	}
	
	return {
		init_page:function(){
			page_info();
		},
		init_control:function(){
			bind_control();
		}
	}
})()