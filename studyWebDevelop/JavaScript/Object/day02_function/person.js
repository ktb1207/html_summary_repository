person=new Object();
//定义walk方法
//调用该方法时，把Person实例的状态state设置为walking
//表示正在行走，默认速度设为1
person.walk=function(){
	this.state="walking";
	this.speed=1;
}
//定义faster方法，让Person对象加速行走
//每调用一次速度增加0.1
person.faster=function(){
	//先判断Person对象状态是否处于行走
	if(this.state=="walking"){
		this.speed=this.speed+0.1;
	}
}
//定义slower方法，让Person对象减速行走
//每调用一次速度减少0.1
person.slower=function(){
	//先判断Person对象状态是否处于行走
	if(this.state=="walking"){
		this.speed=this.speed-0.1;
	}
}
//定义stopwalking方法，让Person对象停止行走
//并将速度设为0
person.stopwalking=function(){
	this.state="standing";
	this.speed=0;
	
}