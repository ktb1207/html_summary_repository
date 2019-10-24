$(function(){
	washDetails.init_page();
	washDetails.init_control();
})

var washDetails = (function(){
	//获取url传递设备id参数
	var thisUrl = document.URL;
	var u_data = thisUrl.split('?')[1];
	var deviceId=u_data.split('=')[1];
	var TokenId = localStorage.getItem("tokenId");
	var callData='';
	var dataurl = getDataUrl();				//url路径公共头部
	var machine_num='';			//洗衣机编号
	var machine_name='';		//洗衣机名字
	var machine_dtm='';			//洗衣机运行程序
	var machine_type='';		//洗衣机类型
	var machine_state='';		//洗衣机状态
	var machine_location='';	//洗衣机位置
	var machine_f='';			//洗衣机楼层位置
	var machine_company_name='';//洗衣机商家名称
	var machine_img='';			//洗衣机封面图片路径
	var select_time='10';		//洗衣选择时间
	var model_price='';			//洗衣价格
	var model_time=30;			//洗衣时间(价格换算)
	var flag;					//是否收藏状态标志位
	//页面控制部分
	var bind_control = function(){
		
		var drap_w = $(".wa_drapbar").width();		//滚动条宽度
		var scroll_w = $(".wa_drapscroll").width();	//滑块长度
		var ml=drap_w-scroll_w;						//滑块距离左边margin-left的最大值
		var move=false;								//移动标记
		var mk,xc,yc;
	
		
		//点击返回
		$("#jump_back").on("tap",function(){
			window.history.back(-1);
			
		})
		
		
		//删除或者增加收藏
		$("#selected").on("tap",function(){
			var tap_say;											//消息提示
			var flag_num=$(this).attr("value");
			console.log(flag_num);
			$.ajax({
				url:''+dataurl+'/api/laundry/manageFavoriteDevice.api',
				type:"POST",
				data:{"tokenId":TokenId,"deviceId":deviceId,"flag":flag_num,"ssid":getTime()},
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
		
		//即时预定
		$("#sureBook").on("tap",function(){
			//console.log(callData);
		})
		
		//滚动条选择时间滑动控制
		//时间初始化
		$("#drap_num>li").eq(2).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
		$("#drap_heri i").eq(2).css("background-color","rgb(249,73,58)");
		$("#drap_num>li").eq(2).attr("value","on");
		
		$("#drap").on("touchstart",function(e){
			var touch = e.touches[0];
			var offset=$(this).offset();
			console.log(offset.left);
			move=true;
			//xc=touch.pageX-parseFloat($("#drap").css("left"));
			xc=touch.pageX-parseFloat(offset.left);
			yc=touch.pareY-parseInt($("#drap").css("top"));
			
		});
		
		$(document).on("touchmove",function(e){
			var modelButton=callData.runMode;
			var touch = e.touches[0];
			if(move){
			
				var x=touch.pageX-xc;
				//控制滑动左右边界
				if(x<=0){
					x=0;
				}else if(x>=ml){
					x=ml;
				}
				$("#drap").css({"top":"0","left":x});
				mk = parseFloat((x/ml)*100).toFixed(2);
				
				$(".ceshi").text(mk);
				
				if(mk>=0&&mk<=4.00){
					$("#drap_num>li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
					$("#drap_heri i").css("background-color","rgb(50,190,255)");
					$("#drap_num>li").removeAttr("value");
					$("#drap_num>li").eq(0).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
					$("#drap_heri i").eq(0).css("background-color","rgb(249,73,58)");
					$("#drap_num>li").eq(0).attr("value","on");
				}else if(mk>=4.00&&mk<=13.50){
					$("#drap_num>li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
					$("#drap_heri i").css("background-color","rgb(50,190,255)");
					$("#drap_num>li").removeAttr("value");
					$("#drap_num>li").eq(1).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
					$("#drap_heri i").eq(1).css("background-color","rgb(249,73,58)");
					$("#drap_num>li").eq(1).attr("value","on");
				}else if(mk>=13.50&&mk<=22.50){
					$("#drap_num>li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
					$("#drap_heri i").css("background-color","rgb(50,190,255)");
					$("#drap_num>li").removeAttr("value");
					$("#drap_num>li").eq(2).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
					$("#drap_heri i").eq(2).css("background-color","rgb(249,73,58)");
					$("#drap_num>li").eq(2).attr("value","on");
				}else if(mk>=22.50&&mk<=31.50){
					$("#drap_num>li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
					$("#drap_heri i").css("background-color","rgb(50,190,255)");
					$("#drap_num>li").removeAttr("value");
					$("#drap_num>li").eq(3).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
					$("#drap_heri i").eq(3).css("background-color","rgb(249,73,58)");
					$("#drap_num>li").eq(3).attr("value","on");
				}else if(mk>=31.50&&mk<=40.50){
					$("#drap_num>li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
					$("#drap_heri i").css("background-color","rgb(50,190,255)");
					$("#drap_num>li").removeAttr("value");
					$("#drap_num>li").eq(4).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
					$("#drap_heri i").eq(4).css("background-color","rgb(249,73,58)");
					$("#drap_num>li").eq(4).attr("value","on");
				}else if(mk>=40.50&&mk<=50.00){
					$("#drap_num>li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
					$("#drap_heri i").css("background-color","rgb(50,190,255)");
					$("#drap_num>li").removeAttr("value");
					$("#drap_num>li").eq(5).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
					$("#drap_heri i").eq(5).css("background-color","rgb(249,73,58)");
					$("#drap_num>li").eq(5).attr("value","on");
				}else if(mk>=50.00&&mk<=59.00){
					$("#drap_num>li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
					$("#drap_heri i").css("background-color","rgb(50,190,255)");
					$("#drap_num>li").removeAttr("value");
					$("#drap_num>li").eq(6).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
					$("#drap_heri i").eq(6).css("background-color","rgb(249,73,58)");
					$("#drap_num>li").eq(6).attr("value","on");
				}else if(mk>=59.00&&mk<=68.00){
					$("#drap_num>li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
					$("#drap_heri i").css("background-color","rgb(50,190,255)");
					$("#drap_num>li").removeAttr("value");
					$("#drap_num>li").eq(7).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
					$("#drap_heri i").eq(7).css("background-color","rgb(249,73,58)");
					$("#drap_num>li").eq(7).attr("value","on");
				}else if(mk>=68.00&&mk<=77.00){
					$("#drap_num>li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
					$("#drap_heri i").css("background-color","rgb(50,190,255)");
					$("#drap_num>li").removeAttr("value");
					$("#drap_num>li").eq(8).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
					$("#drap_heri i").eq(8).css("background-color","rgb(249,73,58)");
					$("#drap_num>li").eq(8).attr("value","on");
				}else if(mk>=77.00&&mk<=86.00){
					$("#drap_num>li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
					$("#drap_heri i").css("background-color","rgb(50,190,255)");
					$("#drap_num>li").removeAttr("value");
					$("#drap_num>li").eq(9).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
					$("#drap_heri i").eq(9).css("background-color","rgb(249,73,58)");
					$("#drap_num>li").eq(9).attr("value","on");
				}else if(mk>=86.00&&mk<=95.00){
					$("#drap_num>li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
					$("#drap_heri i").css("background-color","rgb(50,190,255)");
					$("#drap_num>li").removeAttr("value");
					$("#drap_num>li").eq(10).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
					$("#drap_heri i").eq(10).css("background-color","rgb(249,73,58)");
					$("#drap_num>li").eq(10).attr("value","on");
				}else if(mk>=95.00&&mk<=100.00){
					$("#drap_num>li").css({"font-size":"1.6rem","color":"rgb(50,190,255)"});
					$("#drap_heri i").css("background-color","rgb(50,190,255)");
					$("#drap_num>li").removeAttr("value");
					$("#drap_num>li").eq(11).css({"font-size":"2.2rem","color":"rgb(249,73,58)"});
					$("#drap_heri i").eq(11).css("background-color","rgb(249,73,58)");
					$("#drap_num>li").eq(11).attr("value","on");
				}else{
					
				}
				//获取滑动选择的时间
				select_time=$("#drap_num>li[value='on']").text();
				model_time=select_time.substring(0,select_time.length-1);
				model_time=Number(model_time);
				//伴随滑动显示价格和时间
				var pv=$("#selectModel>li[value='on']").index();								//当前选中的模式位置
				model_price = modelButton[pv].price;
				var total_price=model_price*model_time;
				machine_dtm ='<p>'+modelButton[pv].modeName+'<span>￥'+total_price+'</span>'+select_time+'分钟</p>';
				$("#modelDesc").html(machine_dtm);
				
			}
		});
		
		$(document).on("touchend",function(e){
			if(mk>=0&&mk<=4.00){
				$("#drap").css({"top":"0","left":"0"});
			}else if(mk>=4.00&&mk<=13.50){
				$("#drap").css({"top":"0","left":"8.00%"});
			}else if(mk>=13.50&&mk<=22.50){
				$("#drap").css({"top":"0","left":"16.80%"});	
			}else if(mk>=22.50&&mk<=31.50){
				$("#drap").css({"top":"0","left":"25.00%"});	
			}else if(mk>=31.50&&mk<=40.50){
				$("#drap").css({"top":"0","left":"33.50%"});
			}else if(mk>=40.50&&mk<=50.00){
				$("#drap").css({"top":"0","left":"42.00%"});
			}else if(mk>=50.00&&mk<=59.00){
				$("#drap").css({"top":"0","left":"50.20%"});
			}else if(mk>=59.00&&mk<=68.00){
				$("#drap").css({"top":"0","left":"58.50%"});
			}else if(mk>=68.00&&mk<=77.00){
				$("#drap").css({"top":"0","left":"66.80%"});
			}else if(mk>=77.00&&mk<=86.00){
				$("#drap").css({"top":"0","left":"75.20%"});
			}else if(mk>=86.00&&mk<=95.00){
				$("#drap").css({"top":"0","left":"83.50%"});
			}else if(mk>=95.00&&mk<=100.00){
				$("#drap").css({"top":"0","left":"91.70%"});
			}
			move=false;
			
		});
		
		//模式选择
		$("#selectModel>li").live("tap",function(){
			var modelButton=callData.runMode;
			var modelType=callData.type;
			var s_num = $(this).index();
			model_price = modelButton[s_num].price;
			//初始化选中项背景颜色、模式说明、详情说明
			$("#selectModel>li").css("background-color","#fff");
			$("#selectModel>li").removeAttr("value");
			$("#modelDesc").html('');
			$("#modelDetails").html('');
			//判断点击模式并显示相应模式说明
			$(this).css("background-color","#b7b7b7");
			$(this).attr("value","on");
			if(modelType=='1010'||modelType=='1020'||modelType=='1030'||modelType=='1040'||modelType=='1050'||modelType=='2010'){
				machine_dtm ='<p>'+modelButton[s_num].modeName+'<span>￥'+modelButton[s_num].price+'</span>'+modelButton[s_num].timeDuration+'分钟</p>';
				$("#modelDesc").html(machine_dtm);
			}else if(modelType=='3010'||modelType=='3020'){
				var total_price=model_price*model_time;
				machine_dtm ='<p>'+modelButton[s_num].modeName+'<span>￥'+total_price+'</span>'+select_time+'分钟</p>';
				$("#modelDesc").html(machine_dtm);
				
			}
			$("#modelDetails").html(modelButton[s_num].modeFeature);
			
			
		})
		
	}
	
	//页面初始化部分
	var page_info = function(){
		//洗衣机信息接口请求部分
		
		//判断洗衣机封面图片
		var machineImg = function(itype){
			var Imgsrc='';
			switch(itype){
				case '1010':
					Imgsrc='../images/wx_wash1010.png';
					break;
				case '1020':
					Imgsrc='../images/wx_wash1020.png';
					break;
				case '1030':
					Imgsrc='../images/wx_wash1030.png';
					break;
				case '1040':
					Imgsrc='../images/wx_wash1040.png';
					break;
				case '1050':
					Imgsrc='../images/wx_wash1050.png';
					break;
				case '2010':
					Imgsrc='../images/wx_wash2010.png';
					break;
				case '3010':
					Imgsrc='../images/wx_wash3010.png';
					break;
				case '3020':
					Imgsrc='../images/wx_wash3020.png';
					break;
				default:
					break;
				
			}
			return Imgsrc;
		}
		//判断洗衣机类型
		var machineType = function(atype){
			var mType='';
			switch(atype){
				case '1010':
					mType='波轮洗衣机';
					break;
				case '1020':
					mType='滚筒洗衣机';
					break;
				case '1030':
					mType='智慧经济型洗衣机';
					break;
				case '1040':
					mType='智慧免清洗洗衣机';
					break;
				case '1050':
					mType='海狸智慧波轮洗衣机';
					break;	
				case '2010':
					mType='波轮洗鞋机';
					break;
				case '3010':
					mType='小容量智慧干衣机';
					break;
				case '3020':
					mType='大容量智慧干衣机';
					break;
				default:
					break;
					
			}
			return mType;
		}
		
		//判断洗衣机状态
		var machineState = function(astate){
			var mstate='';
			switch(astate){
				case '1':
					mstate='空闲';
					break;
				case '2':
					mstate='使用中（可预约）';
					break;
				case '3':
					mstate='使用中（可排队）';
					break;
				case '4':
					mstate='不能服务';
					break;
				default:
					break;
			}
			return mstate;
		}
		//请求获取洗衣机信息
		$.ajax({
			url:''+dataurl+'/common/laundry/getDeviceInfo.api',
			type:"GET",
			data:{"tokenId":TokenId,"deviceId":deviceId,"ssid":getTime()},
			dataType:'jsonp',
			jsonp:'outAccess',
			success:function(data){
				var ndata=data.data;
				console.log(data);
				if(data.retCode=="00000"){
					//获取请求数据并回传用以按钮操作
					callData=data.data;
					//获取洗衣机类型
					var d_type = ndata.type;
					//洗衣机类型
					machine_name = ndata.name;
					$("#topNav>h1").html(machine_name);
					//洗衣机模式、价格、时间说明
					
					//洗衣机名称
					machine_company_name = ndata.name;
					if(machine_company_name==undefined){
						machine_company_name=" ";
					}
					$("#machineDes01").contents().filter(function(){return this.nodeType == 3;}).text(machine_company_name);
					machine_type = machineType(d_type);
					//洗衣机封面图片
					machine_img=machineImg(d_type);
					if(d_type=='1050'){
						$("#machineImg").removeClass('wa_midimg01');
						$("#machineImg").addClass('wa_midimg02');
					}
					$("#machineImg").attr('src',machine_img);
					//获取洗衣机编号
					var d_serialNumber = ndata.serialNumber;
					if(d_serialNumber==undefined){
						machine_num=" ";
					}else{
						d_serialNumber = d_serialNumber.split('-')[1];
						machine_num = d_serialNumber.substring(1);
					}
					
					$("#machineNum").html(machine_num);
					//获取洗衣机状态
					var d_state = ndata.status;
					machine_state = machineState(d_state);
					$("#machineDes01>span").html(machine_state);
					//获取洗衣机位置
					machine_location = ndata.location;
					if(machine_location==undefined){
						machine_location=" ";
					}
					$("#machineDes02").contents().filter(function(){return this.nodeType == 3;}).text(machine_location);
					var f_location=ndata.serialNumber;
					if(f_location==undefined){
						machine_f=" ";
					}else{
						f_location=f_location.split('-')[0]
						machine_f=f_location.substring(0,2)+'层';
					}
					
					$("#machineDes02>span").html(machine_f);
		
					
					//干衣机烘干时间选择区域是否显示
					if(d_type=='3010'||d_type=='3020'){
						$(".wa_draptime").css("display","block");
					}else{
						$(".wa_draptime").css("display","none");
					}
					
					var modelButton=ndata.runMode;
					//按钮动态显示
					for(var i=0;i<modelButton.length;i++){
						var bHtml;
						var mode_img="../images/wx_modeid"+modelButton[i].modeId+".png";
						if(modelButton[i].isDisply=='T'){
							bHtml='<li>';
							bHtml=bHtml+'<img src="'+mode_img+'"'+'class="wa_mode_img">';
							bHtml=bHtml+'<p class="wa_selectModeTittle">'+modelButton[i].modeName+'</p>';
							bHtml=bHtml+'</li>';
						}else{
							var bHtml='';
						}
						$("#selectModel").append(bHtml);
					}
					
					//洗衣机按钮选择项显示判断
					//判断按钮宽度值
					
					if(modelButton.length<=4){
						$("#selectModel>li").css("width","50%");
					}else if(modelButton.length>4){
						$("#selectModel>li").css("width","25%");
					}else{
						
					}
					
					//默认选中第一项
					//默认价格为第一模式价格
					model_price = modelButton[0].price;
					$("#selectModel>li").eq(0).css("background-color","#b7b7b7");
					$("#selectModel>li").eq(0).attr("value","on");
					if(d_type=='1010'||d_type=='1020'||d_type=='1030'||d_type=='1040'||d_type=='1050'||d_type=='2010'){
						machine_dtm ='<p>'+modelButton[0].modeName+'<span>￥'+modelButton[0].price+'</span>'+modelButton[0].timeDuration+'分钟</p>';
						$("#modelDesc").html(machine_dtm);
					}else if(d_type=='3010'||d_type=='3020'){
						
						var total_price=model_price*3;
						machine_dtm ='<p>'+modelButton[0].modeName+'<span>￥'+total_price+'</span>'+model_time+'分钟</p>';
						$("#modelDesc").html(machine_dtm);
					}
					$("#modelDetails").html(modelButton[0].modeFeature);
					
					
				}
				//页面是否已收藏
				console.log(ndata);
				if(ndata.isFavorite=="F"){									//没有收藏
					flag="1";
					$("#selected").css("background-image","url(../images/wx_noselected.png)");
					
				}
				else if(ndata.isFavorite=="T"){								//收藏
					flag="2";
					$("#selected").css("background-image","url(../images/wx_selected.png)");
					
				}
				$("#selected").attr("value",flag);
				
				return callData;
			},
			error:function(){
				console.log('error');
			}
			
		})
		
		
		
	
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
