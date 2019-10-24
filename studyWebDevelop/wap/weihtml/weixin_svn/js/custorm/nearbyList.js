$(function(){
	nearby.init_location();

	nearby.init_control();
	//nearby.init_map();
})

var nearby = (function(){
	
	$(".ne_nodata").css("height","ndh");
	var dataurl = getDataUrl();				//url路径公共头部			
	
	//获取url传参
	var thisUrl = document.URL;
	var u_data = thisUrl.split('?')[1];
	var deviceType = u_data.split('=')[1];					//类型标志位 1 洗衣 2 烘干 3 洗鞋
	var TokenId = localStorage.getItem("tokenId");			//用户id
	
	var latitude; 			// 纬度，浮点数，范围为90 ~ -90
    var longitude; 			// 经度，浮点数，范围为180 ~ -180。
    var speed; 				// 速度，以米/每秒计
    var accuracy; 			// 位置精度
    var pageNumber=1;		//起始页
    var load=true;			//是否加载更多标志
    var callData;			//回调数据
    var flag;				//是否收藏标志位--列表
    var f_num;				//是否收藏标志位--地图
    var lon=[];				//保存经度
    var lat=[];				//保存纬度
    var m_name=[];			//保存洗衣店名字
    var m_dis=[];			//保存洗衣店距离
    var m_free=[];			//保存空闲洗衣机数量
    var m_washid=[];		//保存洗衣店id
    var m_select=[];		//保存洗衣店是否收藏
    var lmarker=[];
    var scontent=[];
    var infowindow=[];
	//页面控制部分
	var bind_control = function(){
		
		//点击返回
		$("#jump_back").on("tap",function(){
			window.history.back(-1);
			
		})
		//点击跳转至洗衣店设备列表页面
		$("#mac_list>li").live("tap",function(){
			
			var bussid= $(this).attr("laundryid");		//商户id
			var isselect=$(this).attr("value");			//是否收藏值，1，没有收藏，2已收藏
			
			window.location.href='shopDeviceList.html?flag='+deviceType+'&bussid='+bussid+'&selectvalue='+isselect;
			
		})
		//点击查看地图
		$("#checkmap").on("tap",function(){
			if($("#checkmap").html()=="地图"){
				$("#checkmap").html("列表");
				$(".ne_map").css({"z-index":"6"});
				//点击地图获取附近列表的每一项经度值并保存至数组
				for(var i=0;i<callData.length;i++){
					var alongitude = callData[i].laundry.longitude;				//获取经度
					lon.push(alongitude);
				}
				//点击地图获取附近列表的每一项纬度值并保存至数组
				for(var i=0;i<callData.length;i++){
					var alatitude = callData[i].laundry.latitude;				//获取经度
					lat.push(alatitude);
				}
				//点击地图获取附近列表每一项洗衣店名字并保存至数组
				for(var i=0;i<callData.length;i++){
					var aname = callData[i].laundry.name;						//获取洗衣店名字
					m_name.push(aname);
				}
				//点击地图获取附近列表每一项洗衣店名字并保存至数组
				for(var i=0;i<callData.length;i++){
					var dis = callData[i].distance;								//获取距离洗衣店距离
					m_dis.push(dis);
				}
				//点击地图获取附近列表每一项洗衣店空闲设备数量
				for(var i=0;i<callData.length;i++){								//获取洗衣店空闲设备数量
					var mf = callData[i].laundry.spareDeviceNumber;
					m_free.push(mf);
				}
				//点击地图获取附近列表每一项洗衣店id号
				for(var i=0;i<callData.length;i++){								//获取洗衣店id
					var md = callData[i].laundry.laundryId;
					m_washid.push(md);
				}
				//点击地图获取附近列表每一项洗衣店是否收藏
				for(var i=0;i<callData.length;i++){
					var se = callData[i].laundry.isFavorite;
					if(se=="F"){												//没有收藏
						f_num="1";
					}
					else if(se=="T"){											//收藏
						f_num="2";
					}
					m_select.push(f_num);
				}
				//执行调用百度地图
				checkmap(lon,lat,m_name,m_dis,m_free,m_washid,m_select);
			}
			else{
				$("#checkmap").html("地图");
				$(".ne_map").css("z-index","-6");
				//清空经度、纬度,名称，距离、数组
				lon=[];				
    			lat=[];
    			m_name=[];
    			m_dis=[];
    			m_free=[];
    			m_washid=[];
    			m_select=[];
			}
		})
		
		//滑动加载更多项
		$(window).load(function() {
            getNewData();
        });
		page_info();
		
	}
	//上拉刷新下拉加载
	var getNewData=function(){
		console.log("运行中...");
		var myScroll;
        myScroll = new IScroll('#wrapper', { probeType:3, mouseWheel:true, vScroll:true, hideScrollbar:false,});
      
        myScroll.on("slideDown",function(){
        	console.log("运行中down...");
            if(this.y > 40){
                location.reload();
                pageNumber = 1;
                myScroll.refresh();
            }
        });
        
        myScroll.on("slideUp",function(){
        	console.log("运行中up...");
            if(this.maxScrollY - this.y > 40){
                if(load==true){
                    pageNumber++;
                    page_info();
                    myScroll.refresh();
                    
                }
                else{
                    $('.pull-up-msg').text('已无更多数据');
                }
            }
        });
	}
	
	//页面初始加载部分
	var page_info = function(){
		
		longitude=localStorage.getItem("longitude");
		latitude=localStorage.getItem("latitude");
		
		$.ajax({
           type:"GET",
           url:''+dataurl+'/common/laundry/getNearbyLaundryList.api',
           data:{"tokenId":TokenId,"longitude":'116.46611',"latitude":'39.909412',"type":deviceType,"distance":"10000","pageNumber":pageNumber,"ssid":getTime()},
           dataType:"jsonp",
           jsonp:'outAccess',
           success:function(data){
   			   var cdata=data.data;
   			   console.log(data);
   			   //判断是否有更多数据加载
   			   if(!cdata){
   			   		load=false;
   			   		
   			   	}
   			   //判断是否有数据返回
   			   //循环获取数据
   			   if(cdata){
   			   	callData=data.data;
   			   	for(var i=0;i<cdata.length;i++){
   					var bhtml;
   					var adis=cdata[i].distance;					//获取距离
   					var bussname=cdata[i].laundry.name;			//洗衣店名称
   					var bussid=cdata[i].laundry.laundryId;
   					var freedevice=cdata[i].laundry.spareDeviceNumber;		//空闲设备数量
   					//是否收藏
   					if(cdata[i].laundry.isFavorite=="F"){							//没有收藏
   						flag="1";
   					}
   					else if(cdata[i].laundry.isFavorite=="T"){						//已经收藏
   						flag="2";
   					}
   					
   					if(freedevice=='0'){									//非空闲
   						bhtml='<li class="ne_busy" laundryid='+bussid+' value='+flag+'>';
   						bhtml=bhtml+'<div class="ne_place">';
   						bhtml=bhtml+'<p class="ne_placep1">'+bussname+'</p>';
   						bhtml=bhtml+'<p class="ne_placep3">0台空闲</p>';
   						bhtml=bhtml+'</div>';
   						bhtml=bhtml+'<div class="ne_distance">'+adis+'</div>';
   						bhtml=bhtml+'</li>';
   					}else{													//空闲
   						bhtml='<li class="ne_free" laundryid='+bussid+' value='+flag+'>';
   						bhtml=bhtml+'<div class="ne_place">';
   						bhtml=bhtml+'<p class="ne_placep1">'+bussname+'</p>';
   						bhtml=bhtml+'<p class="ne_placep2">'+freedevice+'台空闲</p>';
   						bhtml=bhtml+'</div>';
   						bhtml=bhtml+'<div class="ne_distance">'+adis+'米</div>';
   						bhtml=bhtml+'</li>';
   					}
   											
   					$("#mac_list").append(bhtml);
   				}
   			   	
   			   }
   			   
   			   	//判断有误数据
				var list_data=$("#mac_list>li").length;
				console.log(list_data);
				if(list_data==0){
					$(".ne_nodata").css("display","block");					//页面提示无数据
				}
				
				//隐藏下拉刷新项
				if(list_data<10){
					$("#scroller-pullUp").css("display","none");
				}
				
				return callData;
            },
            error:function(){
                alert("error");
            }
        });
	}
	
	
	//获取地理位置信息部分
	var get_location = function(){
		
		//获取本地位置
		$.ajax({
            type:"GET",
            url:'http://wx.mrhi.cn/hlwxApp/wxcheckAppController/wxAccessToken.do',
            data:{"url":window.location.href.split("#")[0],"check":'HLWXCHKACES',"ssid":getTime()},
            dataType:"jsonp",
            jsonp:'outAccess',
            async:"false",
            success:function(data){
                wx.config({
                    debug:false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: 'wx7fec0f7c8a105c4d', // 必填，公众号的唯一标识
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature: data.signature,// 必填，签名，见附录1
                    // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    jsApiList: [
                        // 所有要调用的 API 都要加到这个列表中
                        //'openLocation',
                        'getLocation'
                    ]
                });
                wx.ready(function () {
                        wx.getLocation({
                            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                            success: function (res) {
                                var wd = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                                var jd= res.longitude; // 经度，浮点数，范围为180 ~ -180。
                                var sd= res.speed; // 速度，以米/每秒计
                                var ac= res.accuracy; // 位置精度
                                //alert("latitude : "+latitude+"--longitude : "+longitude+"--speed : "+speed+"--accuracy : "+accuracy);
                               //本地保存位置信息
								localStorage.setItem("latitude",wd);
								localStorage.setItem("longitude",jd);
                                //page_info();
                              
                            },
                            
                        });  
                });
            }
        });
	}
	
	//地图信息
	var checkmap = function(lon,lat,m_name,m_dis,m_free,m_washid,m_select){
		var bmarker;
		var bhtml='';
		infowindow=[];
		lmarker=[];
		scontent=[];
		var map = new BMap.Map("allmap");  							//创建地图实例
		var point = new BMap.Point(116.466, 39.909);				//创建中心点坐标
		map.centerAndZoom(point, 14);								//地图初始化
		map.centerAndZoom(point,15); 								//设置地图中心点
		
		var markergg = new BMap.Marker(point);
    	map.addOverlay(markergg); 	
    	
    	
    	
    	
		//添加缩放工具
		var bottom_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type:BMAP_NAVIGATION_CONTROL_ZOOM});
		map.addControl(bottom_right_navigation);
		//百度坐标转换
		translateCallback = function (data){
			 if(data.status === 0) {
			 	var myIcon = new BMap.Icon("../images/wx_map_center1.png", new BMap.Size(16,16));
			 	bmarker = new BMap.Marker(data.points[0],{icon:myIcon});
        		map.addOverlay(bmarker);
        		map.setCenter(data.points[0]);
			 }
		}
		
		setTimeout(function(){
        	var convertor = new BMap.Convertor();
        	var pointArr = [];
        	pointArr.push(point);
        	convertor.translate(pointArr, 1, 5, translateCallback)
    	}, 100);
    	//判断洗衣机空闲或者忙碌
    	var isfree=function(freedata){
    		var fb;
    		if(freedata=='0'){
    			fb="忙碌";
    		}
    		else{
    			fb="空闲"
    		}
    		return fb;
    	}
    	//生成信息窗口
    	
    	for(var i=0;i<lon.length;i++){
    		bhtml='<div style="margin:0;padding-top:2px;background-color:#33beff;height:70px;width:160px;box-sizing:border-box">';
    		bhtml=bhtml+'<div style="margin:0 0 4px 0;padding:0 10px;height:20px;width:140px;">';
    		bhtml=bhtml+'<p style="color:#fff;font-size:13px;margin:0;padding:0;height:20px;line-height:20px;float:left;">'+m_name[i]+'</p>';
    		bhtml=bhtml+'<a style="border:0;color:#fff;text-decoration:none;width:20px;height:20px;display:block;float:right" href="shopDeviceList.html?flag='+deviceType+'&bussid='+m_washid[i]+'&isselected='+m_select[i]+'">';        
    		bhtml=bhtml+'<img src="../images/wx_map_jump.png" width="20px" height="20px">';
    		bhtml=bhtml+'</a>';
    		bhtml=bhtml+'</div>';
    		bhtml=bhtml+'<div style="margin:0 0 2px 0;padding:0 10px;height:15px;width:140px;">';
    		bhtml=bhtml+'<img src="../images/wx_map_machine.png" height="16px" width="10px" style="display:block;float:left;">';
    		bhtml=bhtml+'<p style="color:#fff;font-size:2px;margin:0 0 0 6px;padding:0;float:left;">洗衣机:'+m_free[i]+'台</p>';
    		bhtml=bhtml+'<img src="../images/wx_map_machine.png" height="16px" width="10px" style="display:block;float:left;margin:0 0 0 22px">';
    		bhtml=bhtml+'<p style="color:#fff;font-size:4px;margin:0 0 0 3px;float:left">'+isfree(m_free[i])+'</p>';
    		bhtml=bhtml+'</div>';
    		bhtml=bhtml+'<div style="margin:0;padding:0 10px;height:15px;width:140px;">';
    		bhtml=bhtml+'<img src="../images/wx_map_position.png" height="16px" width="10px" style="display:block;float:left">';
    		bhtml=bhtml+'<p style="color:#fff;font-size:2px;margin:0 0 0 6px;padding:0;float:left;">当前距离:'+m_dis[i]+'</p>';
    		bhtml=bhtml+'</div>';
    		bhtml=bhtml+'<div style="margin:0;padding:0;height:4px;width:180px;"></div>';
    		bhtml=bhtml+'<div>';
    		
    		scontent.push(bhtml);
    	}
    	
    	
    	//创建窗口对象
    	for(var i=0;i<lon.length;i++){
    		infowindow[i] =  new BMap.InfoWindow(scontent[i]);
    	}
		//附近列表项在地图中标注显示
		for(var i=0;i<lon.length;i++){
			if(m_free[i]=='0'){											//忙碌状态图标
				var myIcon = new BMap.Icon("../images/wx_map_busy1.png", new BMap.Size(34,34));
				//lmarker[i] = new BMap.Marker(new BMap.Point(lon[i],lat[i]),{icon:myIcon});
				var ghmarker = new BMap.Marker(new BMap.Point(lon[i],lat[i]),{icon:myIcon});
			}
			else{														//空闲状态图标
				var myIcon = new BMap.Icon("../images/wx_map_free1.png", new BMap.Size(34,34));
				//lmarker[i] = new BMap.Marker(new BMap.Point(lon[i],lat[i]),{icon:myIcon});
				var ghmarker = new BMap.Marker(new BMap.Point(lon[i],lat[i]),{icon:myIcon});
			}
			var content =scontent[i];
			map.addOverlay(ghmarker); 
			addClickHandler(content,ghmarker);
		}
		
		var opts = {
				width : 250,     // 信息窗口宽度
				height: 80,     // 信息窗口高度
				enableMessage:true//设置允许信息窗发送短息
			   };
		
		function addClickHandler(content,marker){
			marker.addEventListener("click",function(e){
				openInfo(content,e)}
			);
		}
		
		function openInfo(content,e){
			var p = e.target;
			var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
			var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
			map.openInfoWindow(infoWindow,point); //开启信息窗口
		}
		
		//未转换位置信息窗口
		markergg.addEventListener("click", function(){          
	   		this.openInfoWindow(infowindow[0]);
	   		
		});
		
		//console.log(lon);
		//console.log(lat);
		//console.log(m_name);
		//console.log(m_dis);
		//console.log(lmarker);
		//console.log(m_free);
		//console.log(m_washid);
		//console.log(infowindow);
		console.log(m_select);
	}
	return {
		init_location:function(){
			get_location();
		},
		
		init_control:function(){
			bind_control();
		},
		
		init_map:function(){
			checkmap();
		}
	}
})()

			



