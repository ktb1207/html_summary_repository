$(function(){
	shopdevicelist.init_page();
	shopdevicelist.init_control();
})

var shopdevicelist = (function(){
	
	var dataurl = getDataUrl();				//url路径公共头部	
	//获取url传参
	var thisUrl = document.URL;
	var u_data = thisUrl.split('?')[1];
	var dt = u_data.split('&')[0];
	var bd = u_data.split('&')[1];
	var su = u_data.split('&')[2];
											
	var deviceType = dt.split('=')[1];						//传递设备类型参数 0,1,2,3
	var laundryId = bd.split('=')[1];						//商户id
	var isselected = su.split('=')[1];						//是否收藏标志位参数，1，没有收藏，2，已经收藏；
	var flag;												//是否收藏标志位，用于点击判断
	var TokenId = localStorage.getItem("tokenId");			//用户id
	var pageNumber=1;		//起始页
	var floor_num=[];		//保存楼层号码
	var machine_num=[];		//保存机器号码
	var callData='';		//回调数据用以点击事件
	var model_price='';			//洗衣价格
	var machine_dtm='';			//洗衣机运行程序
	var select_time='10';		//洗衣选择时间
	var model_time=30;			//洗衣时间(价格换算)
	var ajaxData;				//ajax请求数据
	var load=true;				//是否加载更多标志
	var devicefloor=[];			//保存设备楼层号
	var deviceindex=[];			//设备楼层位置索引
	var c_html=" ";				//显示洗衣机设备数量
    var s_html=" ";				//显示洗鞋机设备数量
    var dry_html=" ";				//显示烘干机设备数量
	//页面控制部分
	var bind_control = function(){
		
		
		
		//点击返回
		$("#jump_back").on("tap",function(){
			window.history.back(-1);
		})
		
		//点击收藏
		$("#selected").on("tap",function(){
			var tap_say;											//消息提示
			var flag_num=$(this).attr("value");
			$.ajax({
				url:''+dataurl+'/api/laundry/manageFavoriteLaundry.api',
				type:"POST",
				data:{"tokenId":TokenId,"laundryId":laundryId,"flag":flag_num,"ssid":getTime()},
				dataType:'json',
				success:function(data){
					console.log(data);
					if(data.retCode=="00000"){
						if(flag_num=="1"){							//增加
							flag="2";
							$("#selected").css("background-image","url(../images/wx_selected.png)");
							tap_say='收藏成功<br>可在"收藏栏>收藏"查看';
							f_show_tip(tap_say);
						}
						else if(flag_num=="2"){						//删除
							flag="1";
							tap_say='已取消收藏';
							$("#selected").css("background-image","url(../images/wx_noselected.png)");
							f_show_tip(tap_say);
						}
						$("#selected").attr("value",flag);
					}
				},
				error:function(){
					console.log('error');
				}
		
			})
		})
		
		//点击楼层选择
		$("#select_floor").on("tap",function(){
			if($(".floor_conter").css("display")=="none"){
				$("#select_floor>img").attr("src","../images/wx_sdl_up.png");
				$(".floor_conter").css("display","block");
			}
			else{
				$("#select_floor>img").attr("src","../images/wx_sdl_down.png");
				$(".floor_conter").css("display","none");
			}
		});
		
		//点击选择不同楼层，显示或者隐藏
		$("#floor_num>li").live("tap",function(){
			//清空设备楼层号数组、楼层位置索引
			devicefloor=[];
			deviceindex=[];
			var floorText=$(this).html();
			$(".floor_conter").css("display","none");
			$("#select_floor>img").attr("src","../images/wx_sdl_down.png");
			
			//循环获取楼层位置
			for(var i=0;i<$(".sl_device_list").length;i++){
				var myfloor=$(".sl_device_list").eq(i).attr("floor");
				devicefloor.push(myfloor);
				
			}
			
			//console.log(devicefloor);
			
			if(floorText=="显示全部"){
				$(".sl_device_list").css("display","block");
			}else{
				var floorNum=floorText.substring(0,2);
				$(".sl_device_list").css("display","none");
				
				//点击楼层号在楼层号码数组中出现的索引位置
				for(var j=0;j<devicefloor.length;j++){
					if(floorNum==devicefloor[j]){
						//保存位置索引
						deviceindex.push(j);	
					}
				}
				
				//循环位置索引显示对应楼层号设备
				for(var k=0;k<deviceindex.length;k++){
					$(".sl_device_list").eq(k).css("display","block");
				}
				//console.log(deviceindex);
			}
			
		})
		
		
		//点击展开洗衣机模式详情
		$("#device_list .sl_details").live("tap",function(){
			
			var d_num = $("#device_list .sl_details").index(this);					//点击展开的是哪一个？
			var show=$(this).next().css("display");									//展开项的display
			var modelButton=callData[d_num].runMode;
			var move=false;															//移动标记
			var mk,xc,yc;
			var modelType = callData[d_num].type;
			//console.log(modelType);
			if(show=="none"){
				$(".sl_show_details").css("display","none");
				$(".sl_show_details").removeAttr("show");
				$(".wash_bar").find("img").attr("src","../images/wx_sdl_down.png");
				$(this).find("img").attr("src","../images/wx_sdl_up.png");
				$(this).next().css("display","block");
				$(this).next().attr("show","on");
				//按钮宽度判断
				if($(".selectModel").eq(d_num).children("li").length<=4){
					$(".selectModel").eq(d_num).children("li").css("width","50%");
				}else if($(".selectModel").eq(d_num).children("li").length>4){
					$(".selectModel").eq(d_num).children("li").css("width","25%");
				}else{
						
				}
				//默认选中第一项
				$(".selectModel").eq(d_num).children("li").css("background-color","#fff");
				$(".selectModel").eq(d_num).children("li").removeAttr("value");
				$(".selectModel").eq(d_num).children("li").eq(0).css("background-color","#b7b7b7");
				$(".selectModel").eq(d_num).children("li").eq(0).attr("value","on");
				//洗衣或者洗鞋
				if(modelType=='1010'||modelType=='1020'||modelType=='1030'||modelType=='1040'||modelType=='1050'||modelType=='2010'){
					machine_dtm ='<p>'+modelButton[0].modeName+'<span>￥'+modelButton[0].price+'</span>'+modelButton[0].timeDuration+'分钟</p>';
				}
				//烘干
				model_time=30;			//洗衣时间(价格换算)
				if(modelType=='3010'||modelType=='3020'){
					model_price = modelButton[0].price;
					var total_price=model_price*3;
					machine_dtm ='<p>'+modelButton[0].modeName+'<span>￥'+total_price+'</span>'+model_time+'分钟</p>';
					
				}
				$(".sl_device_list").eq(d_num).find(".modelDesc").html(machine_dtm);
				$(".sl_show_details[show='on']").find(".modelDetails").html(modelButton[0].modeFeature);
				
				//烘干
				var drap_w =$(".sl_show_details[show='on']").find(".re_drapbar").width();		//滚动条宽度
				var scroll_w = $(".sl_show_details[show='on']").find(".re_drapscroll").width();	//滑块长度
				var ml=drap_w-scroll_w;						//滑块距离左边margin-left的最大值
				
				if(modelType=='3010'||modelType=='3020'){
					//时间初始化,默认30分钟
					$(".drap_num>li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
					$(".drap_num>li").eq(2).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
					$(".drap_heri i").css("background-color","rgb(50,190,255)");
					$(".drap_heri i").eq(2).css("background-color","rgb(249,73,58)");
					$(".drap_num>li").removeAttr("value");
					$(".drap_num>li").eq(2).attr("value","on");
					$(".sl_show_details[show='on']").find(".drap").css({"top":"0","left":"16.80%"});
					
					//按下
					$(".sl_show_details[show='on']").find(".drap").on("touchstart",function(e){
						var touch = e.touches[0];
						var offset=$(this).offset();
						
						move=true;
						xc=touch.pageX-parseFloat(offset.left);
						yc=touch.pareY-parseInt($("#drap").css("top"));
			
					});
					//移动
					$(document).on("touchmove",function(e){
						var touch = e.touches[0];
						var modelButton=callData[d_num].runMode;
						if(move){
							var x=touch.pageX-xc;
							//控制滑动左右边界
							if(x<=0){
								x=0;
							}else if(x>=ml){
								x=ml;
							}
							$(".sl_show_details[show='on']").find(".drap").css({"top":"0","left":x});
							mk = parseFloat((x/ml)*100).toFixed(2);
							
							$(".ceshi").text(mk);
							
							if(mk>=0&&mk<=4.00){
								$(".sl_show_details[show='on']").find(".drap_num").find("li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").css("background-color","rgb(50,190,255)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").removeAttr("value");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(0).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").eq(0).css("background-color","rgb(249,73,58)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(0).attr("value","on");
							}else if(mk>=4.00&&mk<=13.50){
								$(".sl_show_details[show='on']").find(".drap_num").find("li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").css("background-color","rgb(50,190,255)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").removeAttr("value");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(1).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").eq(1).css("background-color","rgb(249,73,58)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(1).attr("value","on");
							}else if(mk>=13.50&&mk<=22.50){
								$(".sl_show_details[show='on']").find(".drap_num").find("li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").css("background-color","rgb(50,190,255)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").removeAttr("value");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(2).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").eq(2).css("background-color","rgb(249,73,58)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(2).attr("value","on");
							}else if(mk>=22.50&&mk<=31.50){
								$(".sl_show_details[show='on']").find(".drap_num").find("li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").css("background-color","rgb(50,190,255)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").removeAttr("value");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(3).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").eq(3).css("background-color","rgb(249,73,58)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(3).attr("value","on");
							}else if(mk>=31.50&&mk<=40.50){
								$(".sl_show_details[show='on']").find(".drap_num").find("li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").css("background-color","rgb(50,190,255)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").removeAttr("value");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(4).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").eq(4).css("background-color","rgb(249,73,58)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(4).attr("value","on");
							}else if(mk>=40.50&&mk<=50.00){
								$(".sl_show_details[show='on']").find(".drap_num").find("li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").css("background-color","rgb(50,190,255)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").removeAttr("value");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(5).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").eq(5).css("background-color","rgb(249,73,58)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(5).attr("value","on");
							}else if(mk>=50.00&&mk<=59.00){
								$(".sl_show_details[show='on']").find(".drap_num").find("li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").css("background-color","rgb(50,190,255)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").removeAttr("value");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(6).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").eq(6).css("background-color","rgb(249,73,58)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(6).attr("value","on");
							}else if(mk>=59.00&&mk<=68.00){
								$(".sl_show_details[show='on']").find(".drap_num").find("li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").css("background-color","rgb(50,190,255)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").removeAttr("value");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(7).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").eq(7).css("background-color","rgb(249,73,58)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(7).attr("value","on");
							}else if(mk>=68.00&&mk<=77.00){
								$(".sl_show_details[show='on']").find(".drap_num").find("li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").css("background-color","rgb(50,190,255)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").removeAttr("value");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(8).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").eq(8).css("background-color","rgb(249,73,58)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(8).attr("value","on");
							}else if(mk>=77.00&&mk<=86.00){
								$(".sl_show_details[show='on']").find(".drap_num").find("li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").css("background-color","rgb(50,190,255)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").removeAttr("value");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(9).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").eq(9).css("background-color","rgb(249,73,58)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(9).attr("value","on");
							}else if(mk>=86.00&&mk<=95.00){
								$(".sl_show_details[show='on']").find(".drap_num").find("li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").css("background-color","rgb(50,190,255)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").removeAttr("value");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(10).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").eq(10).css("background-color","rgb(249,73,58)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(10).attr("value","on");
							}else if(mk>=95.00&&mk<=100.00){
								$(".sl_show_details[show='on']").find(".drap_num").find("li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").css("background-color","rgb(50,190,255)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").removeAttr("value");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(11).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
								$(".sl_show_details[show='on']").find(".drap_heri").find("i").eq(11).css("background-color","rgb(249,73,58)");
								$(".sl_show_details[show='on']").find(".drap_num").find("li").eq(11).attr("value","on");
							}else{
					
							}
							//获取滑动选择的时间
							select_time=$(".sl_show_details[show='on']").find(".drap_num").find("li[value='on']").text();
							model_time=select_time.substring(0,select_time.length-1);
							model_time=Number(model_time);
							//伴随滑动显示价格和时间
							var pv=$(".sl_show_details[show='on']").find(".selectModel").find("li[value='on']").index();			//当前选中的模式位置
							model_price = modelButton[pv].price;
							var total_price=model_price*model_time;
							machine_dtm ='<p>'+modelButton[pv].modeName+'<span>￥'+total_price+'</span>'+select_time+'分钟</p>';
							$(".sl_device_list").eq(d_num).find(".modelDesc").html(machine_dtm);
				
						}
					});
					//抬起
					$(document).on("touchend",function(e){
						
						if(mk>=0&&mk<=4.00){
							$(".sl_show_details[show='on']").find(".drap").css({"top":"0","left":"0"});
						}else if(mk>=4.00&&mk<=13.50){
							$(".sl_show_details[show='on']").find(".drap").css({"top":"0","left":"8.00%"});
						}else if(mk>=13.50&&mk<=22.50){
							$(".sl_show_details[show='on']").find(".drap").css({"top":"0","left":"16.80%"});	
						}else if(mk>=22.50&&mk<=31.50){
							$(".sl_show_details[show='on']").find(".drap").css({"top":"0","left":"25.00%"});	
						}else if(mk>=31.50&&mk<=40.50){
							$(".sl_show_details[show='on']").find(".drap").css({"top":"0","left":"33.50%"});
						}else if(mk>=40.50&&mk<=50.00){
							$(".sl_show_details[show='on']").find(".drap").css({"top":"0","left":"42.00%"});
						}else if(mk>=50.00&&mk<=59.00){
							$(".sl_show_details[show='on']").find(".drap").css({"top":"0","left":"50.20%"});
						}else if(mk>=59.00&&mk<=68.00){
							$(".sl_show_details[show='on']").find(".drap").css({"top":"0","left":"58.50%"});
						}else if(mk>=68.00&&mk<=77.00){
							$(".sl_show_details[show='on']").find(".drap").css({"top":"0","left":"66.80%"});
						}else if(mk>=77.00&&mk<=86.00){
							$(".sl_show_details[show='on']").find(".drap").css({"top":"0","left":"75.20%"});
						}else if(mk>=86.00&&mk<=95.00){
							$(".sl_show_details[show='on']").find(".drap").css({"top":"0","left":"83.50%"});
						}else if(mk>=95.00&&mk<=100.00){
							$(".sl_show_details[show='on']").find(".drap").css({"top":"0","left":"91.70%"});
						}
						move=false;
			
					});
					
				}
				
				//模式点击选择事件
				$(".sl_show_details[show='on']").find(".selectModel").delegate("li","tap",function(){
					
					var s_num = $(this).index();							//点击是哪一个模式
					model_price = modelButton[s_num].price;
					$(".sl_show_details[show='on']").find(".selectModel").find("li").css("background-color","#fff");
					$(".sl_show_details[show='on']").find(".selectModel").find("li").removeAttr("value");
					$(this).css("background-color","#b7b7b7");
					$(this).attr("value","on");
					
					$(".sl_device_list").eq(d_num).find(".modelDesc").html();
					$(".sl_show_details[show='on']").find(".modelDetails").html();
					//洗衣或者洗鞋
					if(modelType=='1010'||modelType=='1020'||modelType=='1030'||modelType=='1040'||modelType=='1050'||modelType=='2010'){
						machine_dtm ='<p>'+modelButton[s_num].modeName+'<span>￥'+modelButton[s_num].price+'</span>'+modelButton[s_num].timeDuration+'分钟</p>';      
					}
					//烘干
					if(modelType=='3010'||modelType=='3020'){
						var total_price=model_price*model_time;
						machine_dtm ='<p>'+modelButton[s_num].modeName+'<span>￥'+total_price+'</span>'+select_time+'分钟</p>';
					}
					
					$(".sl_device_list").eq(d_num).find(".modelDesc").html(machine_dtm);
					$(".sl_show_details[show='on']").find(".modelDetails").html(modelButton[s_num].modeFeature);
				});
				
			}
			else{
				$(this).find("img").attr("src","../images/wx_sdl_down.png");
				$(this).next().css("display","none");
			}
		})
		
		//设备列表点击跳转至洗衣机详情页面
		$("#device_list .sl_place_des").live("tap",function(){
			var l_num = $("#device_list .sl_place_des").index(this);					//点击展开的是哪一个？
			var device_num=$(".sl_place_des").eq(l_num).attr("deviceid");
			window.location.href="washDetails.html?deviceId="+device_num;
			//console.log(device_num);
		})
		
	}
	
	//页面初始化部分
	var page_info = function(){
		
		//加载数据
		get_data();
		
		//判断洗衣店是否已经收藏
    	if(isselected=="1"){				//没有收藏
    		flag="1";
			$("#selected").css("background-image","url(../images/wx_noselected.png)");
    	}
   	 	else if(isselected=="2"){			//已经收藏
    		flag="2";
			$("#selected").css("background-image","url(../images/wx_selected.png)");
    	}
    	$("#selected").attr("value",flag);
	}
		
	
	
	//获取洗衣点数据
	var get_data = function(){
		
		//去除重复数组项
		Array.prototype.clearrepeat = function () {
        		this.sort();//排序
        		var n = [this[0]];
        		for (var i = 1; i < this.length; i++) {
            		if (this[i] !== n[n.length - 1]) {
                	n.push(this[i]);
            	}
        	}
        	return n;
    	}
		
		if(deviceType=="0"){
			ajaxData={"tokenId":TokenId,"laundryId":laundryId,"pageNumber":pageNumber,"ssid":getTime()};
		}else{
			ajaxData={"tokenId":TokenId,"laundryId":laundryId,"type":deviceType,"pageNumber":pageNumber,"ssid":getTime()};
		}
		
		$.ajax({
           type:"GET",
           url:''+dataurl+'/common/laundry/getLaundryDeviceList.api',
           data:ajaxData,
           dataType:"jsonp",
           jsonp:'outAccess',
           success:function(data){
           	console.log(data);
           	if(!data.data){
            		load=false;
            }
           	if(data.data){									//如果返回有设备
           		var cdata=data.data;
           		callData=data.data;
           		//console.log(cdata.length);
           		
           		//显示洗衣店名称
           		var buss_name=cdata[0].laundryInfo.name;
           		$("#title_name").html(buss_name);
           		//显示洗衣店设备数量
           		var c_length = cdata[0].laundryInfo.deviceAmount;					//洗衣机数量
           		var s_length = cdata[0].laundryInfo.shoeWashDeviceAmount;			//洗鞋机数量
           		var d_length = cdata[0].laundryInfo.dryerDeviceAmount;
           		
           		if(c_length=="0"){													//没有洗衣机设备
           			c_html=" ";
           		}
           		else{																//有洗衣机设备
           			c_html="洗衣机"+c_length+"台";
           		}
           		
           		$("#device_num").html(c_html);
           		
           		if(s_length=="0"){													//没有洗鞋机设备
           			s_html=" ";
           		}
           		else{																//有洗鞋机设备
           			s_html="洗鞋机"+s_length+"台";
           		}
           		
           		$("#device_num01").html(s_html);
           		
           		if(d_length=="0"){													//没有烘干机设备
           			dry_html=" ";
           		}
           		else{																//有烘干机设备
           			dry_html="烘干机"+d_length+"台";
           		}
           		
           		$("#device_num02").html(dry_html);
           		
           		//楼层显示部分
           		for(var i=0;i<cdata.length;i++){
           			if(cdata[i].serialNumber){					//如果返回有楼层字段
           				var serinum=cdata[i].serialNumber;
           				var f_num=serinum.split('-')[0];		//楼层字段
           				f_num=f_num.substring(0,2);
           				floor_num.push(f_num);
           				var m_num=serinum.split('-')[1];		//机器号字段
           				m_num=m_num.substring(1);
           				machine_num.push(m_num);
           			}
           			else{
           				
           			}
           		}
           	
           		//添加楼层
           		var floorNum=floor_num.clearrepeat();		//调用去除重复项
           		for(var i=0;i<floorNum.length;i++){
           			if(floorNum[i]!=undefined){
           				var ahtml='<li>'+floorNum[i]+'楼</li>';
           				$("#floor_num").append(ahtml);
           			}else{
        	
           			}	
           		}
    
    			//添加设备列表
    			for(var i=0;i<cdata.length;i++){
    				
    				//如果获取不到机器编号
    				if(machine_num[i]==undefined){
    					machine_num[i]='';
    				}
    				//如果获取不到楼层信息
    				if(floor_num[i]==undefined){
    					floor_num[i]="";
    				}
    				//如果获取不到机器名字
    				if(cdata[i].name==undefined){
    					cdata[i].name="";
    				}
    				//如果获取不到机器位置
    				var loc=cdata[i].location;
    				//console.log(loc);
    				if(loc==undefined){
    					loc="";
    				}
    				
    				var dhtml='<div class="sl_device_list" floor='+floor_num[i]+'>';
    				dhtml=dhtml+'<div class="sl_place">';
    				dhtml=dhtml+'<div class="sl_place_num machineNum">'+machine_num[i]+'</div>';
    				dhtml=dhtml+'<div class="sl_place_des" deviceid="'+cdata[i].deviceId+'">';
    				dhtml=dhtml+'<p class="sl_place_state machineDes01"><i>'+cdata[i].name+'</i><span>'+machine_state(cdata[i].status)+'</span></p>';
    				dhtml=dhtml+'<p class="sl_place_location" class="machineDes02"><i>'+loc+'</i><span>'+floor_num[i]+'层</span></p>';
    				dhtml=dhtml+'</div>';
    				dhtml=dhtml+'<div class="sl_booked">';
    				dhtml=dhtml+'<div class="sl_book_bar">'+book(cdata[i].status)+'</div>';
    				dhtml=dhtml+'</div>';
    				dhtml=dhtml+'</div>';
    				dhtml=dhtml+'<div class="sl_details">';
    				dhtml=dhtml+'<div class="sl_wash_mode modelDesc">';
    				dhtml=dhtml+'<p>'+cdata[i].runMode[0].modeName+'<span>'+cdata[i].runMode[0].price+'</span>'+cdata[i].runMode[0].timeDuration+'分钟</p>';
    				dhtml=dhtml+'</div>';
    				dhtml=dhtml+'<div class="wash_bar">';
    				dhtml=dhtml+'<img src="../images/wx_sdl_down.png" class="wash_bar_img">';
    				dhtml=dhtml+'</div>';
    				dhtml=dhtml+'</div>';
    				
    				dhtml=dhtml+'<div class="sl_show_details">';
    				dhtml=dhtml+'<div class="sl_place_selectMode">';
    				dhtml=dhtml+'<ul class="selectModel">';
    				for(var j=0;j<cdata[i].runMode.length;j++){
    					var mode_img="../images/wx_modeid"+cdata[i].runMode[j].modeId+".png";
    					if(cdata[i].runMode[j].isDisply=='T'){
							dhtml=dhtml+'<li>';
							dhtml=dhtml+'<img src="'+mode_img+'"'+'class="re_mode_img">';
							dhtml=dhtml+'<p class="sl_selectModeTittle">'+cdata[i].runMode[j].modeName+'</p>';
							dhtml=dhtml+'</li>';
							k=k+1;
						}
    					
    				}
    				
    				dhtml=dhtml+'</ul>';
    				dhtml=dhtml+'</div>';
    				dhtml=dhtml+'<p class="sl_modeDesc modelDetails">';
    				dhtml=dhtml+cdata[i].runMode[0].modeFeature;
    				dhtml=dhtml+'</p>';
    				
    				if(cdata[i].type=="3010"||cdata[i].type=="3020"){																//是否是烘干机，显示滑动时间
    					dhtml=dhtml+'<div class="re_draptime">';	
    					dhtml=dhtml+'<p>请选择烘干时间(10-120分钟)</p>';
    					dhtml=dhtml+'<div class="re_drapnum">';
    					dhtml=dhtml+'<ul class="drap_num">';
    					dhtml=dhtml+'<li>10</li>';
    					dhtml=dhtml+'<li>20</li>';
    					dhtml=dhtml+'<li>30</li>';
    					dhtml=dhtml+'<li>40</li>';
    					dhtml=dhtml+'<li>50</li>';
    					dhtml=dhtml+'<li>60</li>';
    					dhtml=dhtml+'<li>70</li>';
    					dhtml=dhtml+'<li>80</li>';
    					dhtml=dhtml+'<li>90</li>';
    					dhtml=dhtml+'<li>100</li>';
    					dhtml=dhtml+'<li>110</li>';
    					dhtml=dhtml+'<li>120</li>';
    					dhtml=dhtml+'</ul>';
    					dhtml=dhtml+'</div>';
    					dhtml=dhtml+'<div class="re_drapheri">';
    					dhtml=dhtml+'<ul class="drap_heri">';
    					dhtml=dhtml+'<li><i class="wa_drapheribar"></i></li>';
    					dhtml=dhtml+'<li><i class="wa_drapheribar"></i></li>';
    					dhtml=dhtml+'<li><i class="wa_drapheribar"></i></li>';
    					dhtml=dhtml+'<li><i class="wa_drapheribar"></i></li>';
    					dhtml=dhtml+'<li><i class="wa_drapheribar"></i></li>';
    					dhtml=dhtml+'<li><i class="wa_drapheribar"></i></li>';
    					dhtml=dhtml+'<li><i class="wa_drapheribar"></i></li>';
    					dhtml=dhtml+'<li><i class="wa_drapheribar"></i></li>';
    					dhtml=dhtml+'<li><i class="wa_drapheribar"></i></li>';
    					dhtml=dhtml+'<li><i class="wa_drapheribar"></i></li>';
    					dhtml=dhtml+'<li><i class="wa_drapheribar"></i></li>';
    					dhtml=dhtml+'<li><i class="wa_drapheribar"></i></li>';
    					dhtml=dhtml+'</ul>';
    					dhtml=dhtml+'</div>';
    					dhtml=dhtml+'<div class="re_drapbar"></div>';
    					dhtml=dhtml+'<div class="re_drapscroll drap"></div>';
    					dhtml=dhtml+'</div>';
    				
    				}
    				
    				dhtml=dhtml+'</div>';
    				dhtml=dhtml+'</div>';
    				
    				$("#device_list").append(dhtml);
    				
    				
    			}
   	
           	}
           	
           	
           	
           	
           	return callData;
           },
           error:function(){
           	
           }
     	});
     
   	}
	//判断洗衣机运行状态
	var machine_state = function(num){
		var m_state="";
		switch(num){
			case "1":
				m_state="空闲";
				break;
			case "2":
				m_state="使用中";
				break;
			case "3":
				m_state="使用中";
				break;
			case "4":
				m_state="不能服务";
				break;
			default:
				break;
		}
		return m_state;
	}
	//判断显示预订或者即时预约
	var book = function(num){
		var book_text;
		if(num=="1"){
			book_text="预订";
		}
		else{
			book_text="即时预约";
		}
		return book_text;
	}
	
	//页面提示
	var f_show_tip =function(tip_say){
				var v_item_say =tip_say;
				$("#tip_say").html(v_item_say);
				$("#tip_say").show();
				var hide = setTimeout(function(){
					$("#tip_say").hide();
				},1000);
				
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