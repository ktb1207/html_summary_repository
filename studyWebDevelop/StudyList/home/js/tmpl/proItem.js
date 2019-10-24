define(['jquery'],function($){
	var proItem = function(){
	};
	
	proItem.prototype = {
		fnShowInfo : function(obj,theList,nflag,fnCallBack,pact){
			
			var oData = {
				user_id: obj.user_id,//用户id
				user_alias: obj.user_alias,//用户昵称
				user_pic: obj.user_pic,//用户头像
				item_id: obj.item_id,//项目id
				alias: obj.alias, //项目名称	
				logdate: obj.logdate.split(" ")[0],//项目发布时间
				pic_cover: obj.pic_cover,//项目封面
				pic_array: obj.pic_array,//项目图片			
				coin_target: obj.coin_target,//目标捐款金额
				coin_usage: obj.coin_usage, //项目用途
				item_desc: obj.item_desc,//项目介绍
				begin_at: obj.begin_at,//项目开始时间
				end_at: obj.end_at,//结束时间
				item_type_id: obj.item_type_id,//项目类别 助学 学医...
				item_act_address:obj.item_act_address,//项目执行地	
				item_coin_done: obj.item_coin_done,//项目进度
				item_coin_support_count:obj.item_coin_support_count//项目支持次数
			};
			
			var picPath;
			if(obj.user_pic){
				picPath = getPicPath(obj.user_pic);
			}else{
				//picPath = getPicPath('320160229120600_3_1');
			}
			
			var nDay = getDays(obj.begin_at,obj.end_at);
					
			var sHtml = '<div class="s_box s_deta">'
					+'     <dl class="s_info">'
					+'       <dt>'
					+'         <img src=" '+ picPath +'" width="100%" />'
					+'         <input type="hidden" class="picPath" value="'+picPath+'" />'			
					+'         <input type="hidden" class="userId" value="${user_id}" />'					
					+'       </dt>'
					+'       <dd>'
					+'         <b>${user_alias}</b>'
					+'         <p><time>${logdate}</time></p>'
					+'       </dd>'
					+'     </dl>'
					+'     <div class="s_dc">'
					+'       <h2 class="s_dtit">'
					+'          <span>'+nDay+'</span>${alias}'
					+'         <input type="hidden" class="alias" value="${alias}" />'
					+'       </h2>'
					+'       <p class="s_js">${item_desc}</p>'
					+'     </div>'
					+'     <ul class="s_pic">';
					
					var arrPic = obj.pic_array.split(',');
					var nLength =arrPic.length -1;
					if(parseFloat(nflag) == 0){
						if(arrPic.length > 4){
							nLength = 4;
						}
					}
					for(var i = 0; i < nLength; i++){
						//if(i<4){
							sHtml += '<li><a><img src='+ getPicPath(arrPic[i]) +' /></a></li>';
						//}
					}					
					
					sHtml += '  </ul>'
							+'  <ul class="s_num">'
							+'  <li>目标<span>￥${coin_target}</span></li>'
							+'  <li>已筹<span>￥${item_coin_done}</span></li>'
							+'  <li>支持<span>￥${item_coin_support_count}次</span></li>'
							+'  </ul>'
							+'  <input type="hidden" class="itemId" value="${item_id}" />'
							+'</div>';
			
			var oPop = $.tmpl( sHtml , oData).appendTo(theList);			
			
			//点击获取数据跳转到详情页面
			oPop.on("click",function(e){				
				var v_url_param;
				var v_user_id =f_tool_scale_get(pact,1);
				var v_item_id = $(this).find('.itemId').val();		
				v_url_param =f_tool_scale_list(new Array(
														    v_user_id
														    ,v_item_id
												            ));	
												            
				window.location.href = 'projectDetail.html?id=' + v_url_param;
			});
		},
	
		fnHideDialogClick : function(obj){
			obj.remove();
		}
	};
	return proItem;
});
