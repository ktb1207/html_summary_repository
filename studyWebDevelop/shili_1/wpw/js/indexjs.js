//js����
$(function(){
	$("img.lazy").lazyload();
	//header����˵�Ч��,�����ӳ�������ʾʱ��400ms��
	function slide(aclass){
		aclass.hover(function(){
			//aclass.find("div").slideDown(400);
			aclass.find("img").attr("src","image/shang.png");
			delay=setTimeout(function(){
				aclass.find("div").slideDown(400);
			},400);
		},function(){
			clearTimeout(delay);
			aclass.find("div").slideUp(400);
			aclass.find("img").attr("src","image/xia.png");
		});
	}
	slide($(".awp"));
	slide($(".asc"));
	slide($(".agh"));
	//input���ý����Զ�����ı�������
	$("#text1").focus(function(){
		if($("#text1").val()=="������ؼ���"){
			$("#text1").val("");
		}
		
	});
	$("#text1").blur(function(){
		if($("#text1").val()==""){
			$("#text1").val("������ؼ���");
		}
		
	});
	//�޸���ർ��������������
	$("#daohang_left>div:odd").css("background","#1f1f1f");
	//���򵼺����򻬶���ʾЧ��,��������ͣʱ��С��400ms�򲻻���ʾ
	function hudong(Adiv){
		var bg="";
		Adiv.hover(function(){
			var color = Adiv.css("background-color");
			bg=color;
			Adiv.css("background-color","#d10e03");
			delaytime=setTimeout(function(){
				Adiv.find("div").fadeIn(300);
			},400);
			//Adiv.find("div").fadeIn(300);
		},function(){
			Adiv.css("background-color",bg);
			clearTimeout(delaytime);
			Adiv.find("div").eq(0).fadeOut(300);
		})
	}
	//���÷���
	hudong($("#aa"));
	hudong($("#bb"));
	hudong($("#cc"));
	hudong($("#dd"));
	hudong($("#ee"));
	hudong($("#ff"));
	hudong($("#gg"));
	hudong($("#hh"));
	hudong($("#kk"));
	hudong($("#mm"));

/******************�ֲ���********************/
	//����һ�����鱣�汳��ͼƬ��src��ַ
	var picArr=new Array();
		picArr[0]="image/lunbo1.jpg";
		picArr[1]="image/lunbo2.jpg";
		picArr[2]="image/lunbo3.jpg";
		picArr[3]="image/lunbo4.jpg";
		picArr[4]="image/lunbo5.jpg";
	//�����ֲ���������
		var index=0;
	//�ֲ�����ʼ�����ӵ�һ�ſ�ʼ
	$("#lunbo img").attr("src",picArr[index]);
	$("#nav div").eq(index).css("background-color","#2d2d2d");
	//������������
	function navAuto(){
			index++;
			if(index==picArr.length){
				index=0;
			}
			$("#lunbo img").attr("src",picArr[index]);
			$("#nav div").css("background","#a1a1a1");
			$("#nav div").eq(index).css("background-color","#2d2d2d");
	};
	//���ú���
	var clear=setInterval(navAuto,2000);
	//������ť�����������ͣ��������ͼƬ����
	$("#lunbo").hover(function(){
		clearInterval(clear);
	},function(){
		clear=setInterval(navAuto,2000);
	});
	$("#nav div").mouseover(function(){
		
		//$("#nav div").index(this)ʹ������index()��ȡ������ĸ���ť��
		$("#lunbo img").attr("src",picArr[$("#nav div").index(this)]);
		$("#nav div").css("background","#a1a1a1");
		$("#nav div").eq($("#nav div").index(this)).css("background-color","#2d2d2d");
		
	});

	
});


	