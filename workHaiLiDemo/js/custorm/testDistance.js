$(function(){
	
	var longitude = 116.466241;				//经度
	var latitude = 39.909505;				//纬度
	var map = new BMap.Map("allmap");  		//创建地图实例
	var geoc = new BMap.Geocoder();   		//地址解析实例
	/*获取地理位置信息*/
	navigator.geolocation.getCurrentPosition(show_map,handle_error);
	function show_map(position){					//成功处理
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		changedata(longitude,latitude);
	}
	function handle_error(error){					//错误处理
		switch(error.code){
			case 1:
				alert("位置服务被拒绝");
				break;
			case 2:
				alert("获取不到位置信息");
				break;
			case 3:
				alert("获取信息超时");
				break;
			default:
				alert("位置错误");
				break;
		}
	}
	
	/*坐标转换*/
	function changedata(longitude,latitude){
		var gpsPoint = new BMap.Point(longitude,latitude);
		tranCallback = function (point){
			console.log(point.points[0].lng+":"+point.points[0].lat);
			longitude = point.points[0].lng;
			latitude = point.points[0].lat;
			addMap(longitude,latitude);
		}
		setTimeout(function(){
			var convertor = new BMap.Convertor();
			var pointBrr = [];
        	pointBrr.push(gpsPoint);
	        convertor.translate(pointBrr,1,5,tranCallback)
	    }, 100);
	}
	//地图显示控件
	function addMap(lon,lat){
		//地图配置
		var point = new BMap.Point(lon,lat);						//创建中心点坐标
		map.centerAndZoom(point,15);								//地图初始化大小级别
		//添加位置标注
		var marker = new BMap.Marker(point);  						// 创建标注
		map.addOverlay(marker);               						// 将标注添加到地图中
		marker.setAnimation(BMAP_ANIMATION_BOUNCE); 				//跳动的动画
		//添加缩放工具
		var bottom_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type:BMAP_NAVIGATION_CONTROL_ZOOM});
		map.addControl(bottom_right_navigation);
	}
			
	changedata(longitude,latitude);
	
	//地址解析-根据输入地址信息获取经纬度值
	function getTxtData(txt){
		// 创建地址解析器实例
		var myGeo = new BMap.Geocoder();
		// 将地址解析结果显示在地图上,并调整地图视野
		myGeo.getPoint(txt, function(point){
			if(point){
				var getlng = point.lng;				//指定位置经度
				var getlat = point.lat;				//指定位置纬度
				console.log(getlng+':'+getlat);
				map.centerAndZoom(point, 15);
				map.addOverlay(new BMap.Marker(point));
				getDistance(getlng,getlat);
			}else{
				alert("您选择地址没有解析到结果!");
			}
		}, "北京市");
	}
	
	//两点之间距离计算
	function getDistance(poslng,poslat){
		var pointA = new BMap.Point(longitude,latitude);  				// 创建点坐标A--当前位置
		var pointB = new BMap.Point(poslng,poslat);  					// 创建点坐标B--配送点位置
		var getdis = (map.getDistance(pointA,pointB)).toFixed(2);
		getdis = (Number(getdis)/1000).toFixed(2);
		//var polyline = new BMap.Polyline([pointA,pointB], {strokeColor:"blue", strokeWeight:6, strokeOpacity:0.5});  //定义折线
		//map.addOverlay(polyline);     								//添加折线到地图上
		$(".dis_show").html("配送位置距离您当前位置大概"+getdis+"km");
	}
	
	//确定点击
	$("#sure").on("tap",function(){
		var txtVal = $("#address").val();
		console.log(txtVal);
		if(txtVal==''){
			alert("输入不能为空");
		}else{
			getTxtData(txtVal);
		}
	})
	
	//点击地图拾取点坐标
	map.addEventListener("click",function(e){
		var pt = e.point;
		getDistance(pt.lng,pt.lat);
		//alert(pt.lng + "," + pt.lat);
		geoc.getLocation(pt, function(rs){
			var addComp = rs.addressComponents;
			var clickAddress = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
			$("#address").val(clickAddress);
		})
	});
	
	    
		
		
	
})
