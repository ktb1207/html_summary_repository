$(function(){
    var username = /[A-Za-z][0-9A-Za-z+-@_=*]{7,19}/;//用户名
    var password = /(?=.*[a-zA-Z])(?=.*[0-9])[0-9A-Za-z+-@_=*]{6,16}/;//密码
    var isMobile=/^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/;//手机号
    var dataurl = 'http://103.8.220.166:40000/saywashnew/WashCallApi';

    //提交注册信息
    $('.wx_regbtn01').on('tap',function(){
        if(!isMobile.test($('.phonenum').val())){$('.wx_regp01').html('手机号输入有误');return false;}
        else if(!username.test($('.reg_username').val())){$('.wx_regp01').html('用户名输入有误');return false;}
        else if(!password.test($('.reg_password').val())){$('.wx_regp01').html('密码过于简单');return false;}
        else{
            $.ajax({
                type:"POST",
                url:''+dataurl+'/common/user/register.api',
                data:{"channelId":"HLXS-WX","phoneNumber":$('.phonenum').val(),"baiduUserId":"1","deviceType":"3","osVersion":"","password":$('.reg_password').val(),"verifyCode":$('.wx_vecode').val(),"loginName":$('.reg_username').val()},
                dataType:"json",
                success:function(data){
                    console.log(data);
                    if(data.retCode == 10005){$('.wx_regp01').html('验证码输入有误');}
                    if(data.retCode == 10037){$('.wx_regp01').html('手机号已被注册或用户名已存在');}
                    if(data.retCode == 00000){$('.wx_regsuccess').css('display','block');
                        setTimeout(function(){
                            $('.wx_regsuccess').css('display','none');
                            window.location.href = 'index.html'
                        },500)
                    }
                }
            });
        }
    });
});
