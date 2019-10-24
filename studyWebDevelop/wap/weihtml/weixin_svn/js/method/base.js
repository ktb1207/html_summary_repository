$(function(){

    var dataurl = 'http://103.8.220.166:40000/saywashnew/WashCallApi';

    //input获取焦点失去焦点处理
    $('.reg_ul01 li input').on({'focus':function(){$(this).css('color','#000');if($(this).val()==$(this).attr('value')){$(this).val("");}},'blur':function(){if($(this).val()==''){$(this).val($(this).attr('value'));$(this).css('color','#999');}}});

    //右侧删除按钮
    $('.wx_delipt01').on('tap',function(){
        //$(this).prev().find('input').val($(this).prev().find('input').attr('value'));
        $(this).prev().find('input').val('').focus();
    });

    //密码显示隐藏
    $('.wx_delipt02').on('tap',function(){if($(this).attr('src')=='images/password_open.png'){$(this).attr('src','images/password_close.png');$('.reg_password').attr('type','password');}else{$(this).attr('src','images/password_open.png');$('.reg_password').attr('type','text');}});

    //获取验证码
    var isMobile=/^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/;//手机号
    var tapon = true;
    var timer = null;
    $('.wx_getnum').on('tap',function(){
        if(!isMobile.test($('.phonenum').val())){$('.wx_regp01').html('手机号输入有误');$('.wx_loginp02').html('手机号输入有误');return false;}
        else{
            if(tapon){
                tapon = false;
                //60s倒计时
                var i=60;
                timer = setInterval(function(){
                    if(i>0){
                        i--;
                        $('.wx_getnum').html('已发送('+i+'s)').css('background-color','#ccc');
                    }
                    else{
                        $('.wx_getnum').html('重新获取').css('background-color','#33beff');
                        clearInterval(timer);
                        tapon = true;
                    }
                },1000);
                //请求接口
                $.ajax({
                    type:"POST",
                    url:''+dataurl+'/common/user/requestVerifyCode.api',
                    data:{"phoneNumber":$('.phonenum').val()},
                    dataType:"json",
                    success:function(data){
                    }
                });
            }
        }
    });
});
document.write("<script language='javascript' src='../js/method/des.js'></script>");

function getTime(){
    var getDate = 'saywash#'+(new Date()).valueOf();
    console.log(getDate);
    return strEnc(getDate,'hlF#$1x)','hlG#$2x)','hlH#$3x)');
}

function getDataUrl(){
    return 'http://103.8.220.166:40000/saywashnew/WashCallApi';
}


