$(function(){
    var username = /[A-Za-z][0-9A-Za-z+-@_=*]{7,19}/;//用户名
    var password = /(?=.*[a-zA-Z])(?=.*[0-9])[0-9A-Za-z+-@_=*]{6,16}/;//密码
    var isMobile=/^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/;//手机号
    var dataurl = 'http://103.8.220.166:40000/saywashnew/WashCallApi';
    $('.wx_regbtn01').on('tap',function(){
        if(!username.test($('.phonename').val())){$('.wx_regp01').html('用户名输入有误');return false;}
        else if(!isMobile.test($('.phonenum').val())){$('.wx_regp01').html('手机号输入有误');return false;}
        else if(!password.test($('.reg_password').val())){$('.wx_regp01').html('密码过于简单');return false;}
        else{
            //请求接口
            $.ajax({
                type:"POST",
                url:''+dataurl+'/common/user/retrievePassword.api',
                data:{"phoneNumber":$('.phonenum').val(),"password":$('.reg_password').val(),"userName":$('.phonename').val(),"verifyCode":$('.wx_vecode').val()},
                dataType:"json",
                success:function(data){
                    console.log(data);
                    if(data.retCode==10005){$('.wx_regp01').html('验证码输入有误');return false;}
                }
            });
        }
    });
});