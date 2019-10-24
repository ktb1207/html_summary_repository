//jQuery动画函数-自定义动画
//任务
//1位移动画
//2渐变动画
//3动画队列

$(function(){
	//1位移动画
	//animate({},{})函数用来实现位移，它有两个参数，第一个表示位移的目标值
	//第二个参数duration代表过程持续的时间
	//animate有一个缺点即不支持颜色渐变和形状渐变
	$(".me1").animate(
		{left:"70%",top:"80%",width:"5%",height:"5%",borderWidth:"1px"},		//第一个参数目标值为css属性
		{queue:true,duration:1000}		//queue:true代表动画队列
	);

	//2渐变动画  1完成

	//3动画队列
	//把上面的目标值设为原来的初始值，还原
	$(".me1").animate(
		{left:"10%",top:"30%",width:"20%",height:"20%",borderWidth:"30px"},		//第一个参数目标值为css属性
		{queue:true,duration:1000}		//queue:true代表动画队列
	);

	$(".me2").animate(
		{left:"10%",top:"80%",width:"5%",height:"5%",borderWidth:"1px"},		//第一个参数目标值为css属性
		{queue:true,duration:1000}		//queue:true代表动画队列
	);

	$(".me2").animate(
		{left:"70%",top:"30%",width:"20%",height:"20%",borderWidth:"30px"},		//第一个参数目标值为css属性
		{queue:true,duration:1000}		//queue:true代表动画队列
	);




});