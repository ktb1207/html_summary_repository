$(function(){
    var dataurl = 'http://103.8.220.166:40000/saywashnew/WashCallApi';
    //登陆
    var isMobile=/^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/;//手机号
    var username = /[A-Za-z][0-9A-Za-z+-@_=*]{7,19}/;//用户名
    var password = /(?=.*[a-zA-Z])(?=.*[0-9])[0-9A-Za-z+-@_=*]{6,16}/;//密码
    $('.wx_lohinbtn03').on('tap',function(){
    	
        if(!username.test($('.phonename').val()) && !isMobile.test($('.phonename').val())){$('.wx_loginp02').html('用户名输入有误');return false;}
        if(!password.test($('.reg_password').val())){$('.wx_loginp02').html('密码输入有误');return false;}
        else{
            $.ajax({
                type:"POST",
                url:''+dataurl+'/common/user/loginNew.api',
                data:{"channelId":"HLXS-WX","phoneNumber":$('.phonename').val(),"baiduUserId":"1","deviceType":"3","osVersion":"","password":$('.reg_password').val(),"ssid":getTime()},
                dataType:"json",
                success:function(data){
                    console.log(data);
                    if(data.retCode==10040){$('.wx_loginp02').html('用户名或手机号不存在');}
                    if(data.retCode==10036){$('.wx_loginp02').html('手机号或密码错误');}
                    if(data.retCode==00000){
                        //添加key-value 数据到 sessionStorage
                        localStorage.setItem("tokenId",data.data.tokenId);
                        window.location.href = 'index.html';
                    }
                }
            });
        }
    });
    //快捷登陆
    $('.wx_lohinbtn02').on('tap',function(){
    	
        if(!isMobile.test($('.phonenum').val())){$('.wx_loginp02').html('手机号输入有误');return false;}
        else{
            $.ajax({
                type:"POST",
                url:''+dataurl+'/common/user/login.api',
                data:{"channelId":"HLXS-WX","phoneNumber":$('.phonenum').val(),"baiduUserId":"1","deviceType":"3","osVersion":"","verifyCode":$('.login_vecode').val(),"ssid":getTime()},
                dataType:"json",
                success:function(data){
                    console.log(data);
                    //添加key-value 数据到 sessionStorage
                    localStorage.setItem("tokenId",data.data.tokenId);
                    //alert(localStorage.getItem("tokenId"));
                    if(data.data.userName){
                        window.location.href = 'index.html';
                    }
                    else{
                        window.location.href = 'updateusername.html';
                    }
                },
                error:function(){
                	console.log('error');
                }
            });
        }
    });
});