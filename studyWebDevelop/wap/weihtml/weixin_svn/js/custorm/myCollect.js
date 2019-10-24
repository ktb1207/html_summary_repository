$(function(){
	myCollect.init_page();
	
	myCollect.init_control();
	
})

var myCollect = (function(){
	var dataurl = getDataUrl();			//url路径公共头部	
	var favoriteType ="1";				//收藏类型 1洗衣点 2 设备
	var modelType = "1";				//模式，1 自助 2 上门
	var pageNumber = 1;				//分页数，默认为加载第一页
	var TokenId = localStorage.getItem("tokenId");			//用户id
	var load=true;						//是否加载更多标志
	var floor_num=[];			//保存楼层号码
	var machine_num=[];			//保存机器号码
	var callData='';			//回调数据用以点击事件
	var model_price='';			//洗衣价格
	var select_time='10';		//洗衣选择时间
	var model_time=30;			//洗衣时间(价格换算)
	//页面控制部分
	var bind_control = function(){
		
		//点击返回
		$("#jump_back").on("tap",function(){
			window.history.back(-1);
		})
		
		//默认为洗衣点
		$("#type_select>li").eq(0).css({"color":"#33beff","border-bottom":"1px solid #33beff"});
		
		//点击洗衣点列表跳转至商家设备列表
		$("#mystore>li").live("tap",function(){
			var isselect;
			var bussid=$(this).attr("bussid");					//商家id
			var itf=$(this).attr("isselect");				//是否收藏
			var flag="0";									//无用标签，拼接url传参
			if(itf=="F"){									//没有收藏
				isselect="1";
			}else if(itf=="T"){								//已收藏
				isselect="2";			
			}
			
			window.location.href='shopDeviceList.html?flag='+flag+'&bussid='+bussid+'&selectvalue='+isselect;
			
		})
		//单击选择洗衣点或者洗衣机
		$("#type_select>li").on("tap",function(){
			
			//初始化加载起始页
			pageNumber = 1;	
			//清空楼层和机器数组
			floor_num=[];		
			machine_num=[];	
			
			var tap = $(this).index();
			$("#type_select>li").css({"color":"#333333","border-bottom":"1px solid #ccc"});
			$(this).css({"color":"#33beff","border-bottom":"1px solid #33beff"});
			$("#mystore").html(" ");				//清空页面内容
			//判断点击洗衣点或者洗衣机
			if(tap==0){								//洗衣点
				favoriteType ="1";	
				
			}
			else if(tap==1){
				favoriteType ="2";
				
			}
			
			get_data();
		})
		
		
		
		//点击展开洗衣模式详情
		$("#mystore .sl_details").live("tap",function(){
			var d_num = $("#mystore .sl_details").index(this);					//点击展开的是哪一个？
			var show=$(this).next().css("display");								//展开项的display
			var modelButton=callData[d_num].deviceInfo.runMode;
			var move=false;														//移动标记
			var mk,xc,yc;
			var modelType = callData[d_num].deviceInfo.type;
			if(show=="none"){													//隐藏
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
				
				//烘干滑动条时间
				if(modelType=='3010'||modelType=='3020'){
					var drap_w =$(".sl_show_details[show='on']").find(".re_drapbar").width();		//滚动条宽度
					var scroll_w = $(".sl_show_details[show='on']").find(".re_drapscroll").width();	//滑块长度
					var ml=drap_w-scroll_w;						//滑块距离左边margin-left的最大值
					var move=false;								//移动标记
					var mk,xc,yc;
					//时间初始化，默认30分钟
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
						console.log(offset.left);
						move=true;
						xc=touch.pageX-parseFloat(offset.left);
						yc=touch.pareY-parseInt($("#drap").css("top"));
					})
					//移动
					$(document).on("touchmove",function(e){
						var modelButton=callData[d_num].deviceInfo.runMode;
						var touch = e.touches[0];
						
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
					})
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
				//点击选择洗衣模式
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
			else{																//显示
				$(this).find("img").attr("src","../images/wx_sdl_down.png");
				$(this).next().css("display","none");
			}
			
		})
		
		//设备列表点击跳转至洗衣机详情页面
		$("#mystore .sl_place_des").live("tap",function(){
			var l_num = $("#mystore .sl_place_des").index(this);					//点击展开的是哪一个？
			var device_num=$(".sl_place_des").eq(l_num).attr("deviceid");
			window.location.href="washDetails.html?deviceId="+device_num;
			//console.log(l_num);
		})
		
	}
	
	//页面初始化部分
	var page_info = function(){
		
		//滑动加载更多项
		$(window).load(function() {
            getNewData();
        });
		//加载数据
		get_data();
		
		
		
	}
	
	//上拉刷新下拉加载
	var getNewData=function(){
		var myScroll;
        myScroll = new IScroll('#wrapper', { probeType: 3, mouseWheel: true });
        myScroll.on("slideDown",function(){
            if(this.y > 40){
            	console.log("xia");
                location.reload();
                pageNumber = 1;
                myScroll.refresh();
            }
        });
        
        myScroll.on("slideUp",function(){
            if(this.maxScrollY - this.y > 40){
            	console.log("shang");
                if(load==true){
                    pageNumber++;
                    get_data();
                    myScroll.refresh();
                    
                }
                else{
                    $('.pull-up-msg').text('已无更多数据');
                }
            }
        });
	}
	
	//数据请求
	var get_data = function(){
		
		$.ajax({
            type:"GET",
            url:''+dataurl+'/api/laundry/getFavoriteLaundryList.api',
            data:{"tokenId":TokenId,"favoriteType":favoriteType,"modelType":modelType,"pageNumber":pageNumber,"ssid":getTime()},
            dataType:"jsonp",
            jsonp:'outAccess',
            success:function(data){
            	//console.log(data);
            	if(!data.data){
            		load=false;
            	}
            	
            	if(data.retCode=="00000"){				//返回有收藏数据
            		if(favoriteType=='1'){				//洗衣点
            			console.log(data);
            			var cdata = data.data;
            			for(var i=0;i<cdata.length;i++){
            				var bhtml="<li class='my_conter_li' bussid='"+cdata[i].laundryInfo.laundryId+"' isselect='"+cdata[i].laundryInfo.isFavorite+"'>"+cdata[i].laundryInfo.name+"</li>";
            				$("#mystore").append(bhtml);
            			}
            		}
            	
            		if(favoriteType=='2'){			//洗衣机
            			console.log(data);
            			var cdata = data.data;
            			callData= data.data;
            			//获取楼层和机器号码部分
           				for(var i=0;i<cdata.length;i++){
           					if(cdata[i].deviceInfo.serialNumber){					//如果返回有楼层字段
           						var serinum=cdata[i].deviceInfo.serialNumber;
           						var f_num=serinum.split('-')[0];		//楼层字段
           						f_num=f_num.substring(0,2);
           						floor_num.push(f_num);
           						var m_num=serinum.split('-')[1];		//机器号字段
           						m_num=m_num.substring(1);
           						machine_num.push(m_num);
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
    						if(cdata[i].deviceInfo.name==undefined){
    							cdata[i].name="";
    						}
    						//如果获取不到机器位置
    						var loc=cdata[i].deviceInfo.location;
    						//console.log(loc);
    						if(loc==undefined){
    							loc="";
    						}
    				
    						var dhtml='<div class="sl_device_list" floor='+floor_num[i]+'>';
    						dhtml=dhtml+'<div class="sl_place">';
    						dhtml=dhtml+'<div class="sl_place_num machineNum">'+machine_num[i]+'</div>';
    						dhtml=dhtml+'<div class="sl_place_des" deviceid="'+cdata[i].deviceInfo.deviceId+'">';
		    				dhtml=dhtml+'<p class="sl_place_state machineDes01"><i>'+cdata[i].deviceInfo.name+'</i><span>'+machine_state(cdata[i].deviceInfo.status)+'</span></p>';
		    				dhtml=dhtml+'<p class="sl_place_location" class="machineDes02"><i>'+loc+'</i><span>'+floor_num[i]+'层</span></p>';
		    				dhtml=dhtml+'</div>';
		    				dhtml=dhtml+'<div class="sl_booked">';
		    				dhtml=dhtml+'<div class="sl_book_bar">'+book(cdata[i].deviceInfo.status)+'</div>';
		    				dhtml=dhtml+'</div>';
		    				dhtml=dhtml+'</div>';
		    				dhtml=dhtml+'<div class="sl_details">';
		    				dhtml=dhtml+'<div class="sl_wash_mode modelDesc">';
		    				dhtml=dhtml+'<p>'+cdata[i].deviceInfo.runMode[0].modeName+'<span>'+cdata[i].deviceInfo.runMode[0].price+'</span>'+cdata[i].deviceInfo.runMode[0].timeDuration+'分钟</p>';
		    				dhtml=dhtml+'</div>';
		    				dhtml=dhtml+'<div class="wash_bar">';
		    				dhtml=dhtml+'<img src="../images/wx_sdl_down.png" class="wash_bar_img">';
		    				dhtml=dhtml+'</div>';
		    				dhtml=dhtml+'</div>';
    				
		    				dhtml=dhtml+'<div class="sl_show_details">';
		    				dhtml=dhtml+'<div class="sl_place_selectMode">';
		    				dhtml=dhtml+'<ul class="selectModel">';
		    				for(var j=0;j<cdata[i].deviceInfo.runMode.length;j++){
		    					var mode_img="../images/wx_modeid"+cdata[i].deviceInfo.runMode[j].modeId+".png";
		    					if(cdata[i].deviceInfo.runMode[j].isDisply=='T'){
									dhtml=dhtml+'<li>';
									dhtml=dhtml+'<img src="'+mode_img+'"'+'class="re_mode_img">';
									dhtml=dhtml+'<p class="sl_selectModeTittle">'+cdata[i].deviceInfo.runMode[j].modeName+'</p>';
									dhtml=dhtml+'</li>';
									k=k+1;
								}
		    					
		    				}
    				
		    				dhtml=dhtml+'</ul>';
		    				dhtml=dhtml+'</div>';
		    				dhtml=dhtml+'<p class="sl_modeDesc modelDetails">';
		    				dhtml=dhtml+cdata[i].deviceInfo.runMode[0].modeFeature;
		    				dhtml=dhtml+'</p>';
    				
    						if(cdata[i].deviceInfo.type=="3010"||cdata[i].deviceInfo.type=="3020"){																//是否是烘干机，显示滑动时间
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
    						$("#mystore").append(dhtml);
    			
    					}
           			
           			}
            	}	
            		
            	
            	
            	if(favoriteType=='1'){				//洗衣点
            		//判断有误数据
					var list_data=$("#mystore>li").length;
					//console.log(list_data);
					if(list_data==0){
						$(".ne_nodata").css("display","block");					//页面提示无数据
					}
					else{
						$(".ne_nodata").css("display","none");
					}
					//隐藏下拉刷新项
					if(list_data<10){
						$("#scroller-pullUp").css("display","none");
					}
				}
            	
            	if(favoriteType=='2'){				//洗衣机
            		//判断有误数据
					var list_data=$("#mystore>div").length;
					//console.log(list_data);
					if(list_data==0){
						$(".ne_nodata").css("display","block");					//页面提示无数据
					}
					else{
						$(".ne_nodata").css("display","none");
					}
					//隐藏下拉刷新项
					if(list_data<10){
						$("#scroller-pullUp").css("display","none");
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
	
	return {
		init_page:function(){
			page_info();
		},
		init_control:function(){
			bind_control();
		},
		
	}
})()