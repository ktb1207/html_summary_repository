/*常用字符串、数组方法*/
$(function(){
	/*demo1
	 字符串指定位置插入新字符
	 方法第一个位置参数为要插入的字符、第二个参数为指定位置，如果不传默认为字符串开始位置，如果传递参数值大于字符串长度则为最后添加*/
	//构建方法
	function strAdd(str,i){
		if(i==undefined){
			i = 0;
		}else if(i>=this.length){
			i = this.length;
		}
		var arr = this.split("");
		arr.splice(i,0,str);
		var backStr = arr.join("");
		return backStr;
	}
	//字符串对象添加方法
	String.prototype.addStr = strAdd;
	//调用
	var astr = "qweasdzxc";
	var newstr = astr.addStr("123",8);
	console.log(newstr);
	
	/*demo2
	数组去除重复项
	 */
	//方法1
	function clearRepeat1(){
		this.sort();
		var ownArr=[this[0]];
		for(var i=0;i<this.length;i++){
			if(this[i]!=ownArr[ownArr.length-1]){
				ownArr.push(this[i]);
			}else{
					
			}
			
		}
		return ownArr;
	}
	//方法2
	function clearRepeat2(){
		var n = [this[0]];
		for(var i=0;i<this.length;i++){
			for(var j=0;j<n.length;j++){
				if(this[i]==n[j]){
					break;
				}else{
					if(j==n.length-1){
						n.push(this[i]);
					}
					
				}
			}
		}
		return n;
		
	}
	
	Array.prototype.removeRepeat = clearRepeat1;
	Array.prototype.remove_repeat = clearRepeat2;

	var myArr = [1,2,3,4,5,4,3,2,1];
	var byArr = ['a','b','c','d','e','d','a','c','b'];
	byArr = byArr.remove_repeat();
	myArr = myArr.removeRepeat();
	
	console.log(myArr);
	console.log(byArr);
	
	//demo3
	//查找字符串中出现次数最多的索引和索引值
	function findStrRepat(){
		var str = 'qwertyuilo.,mnbvcsarrrrrrrrtyuiop;l,mhgfdqrtyuio;.cvxsrtyiuo';    
		var json = {};       
		for (var i = 0; i < str.length; i++) {     //遍历str拆解其中的每一个字符将其某个字符的值及出现的个数拿出来作为json的kv      
			if (!json[str.charAt(i)]) {      //判断json中是否有当前str的值          
				json[str.charAt(i)] = 1;   //如果不存在 就将当前值添加到json中去      
			} else {           
				json[str.charAt(i)]++;   //else的话就让数组中已有的当前值的index值++；        
			} 
		}
		var number = '';    		//存储出现次数最多的值和次数  
		var num=0;      	  
		for (var i in json) {    	//遍历json  使用打擂算法统计需要的值       
			if (json[i]>num) {    	//如果当前项大于下一项     
				num = json[i];      //就让当前值更改为出现最多次数的值   
				number = i;        
			}      
		}      
		//最终打印出现最多的值以及出现的次数      
		console.log('出现最多的值是'+number+'出现次数为'+num);
		console.log(json);
	}
	findStrRepat();
	//demo4
	//查找数组重复项最多的项
	var testAr = ['a','b','c','a','a','c','d','d','d','d','d','d','b'];
	function findArrRepeat(arr){
		var obj = {}
		for(var i=0;i<arr.length;i++){
			if(!obj[arr[i]]){
				obj[arr[i]] = 1;
			}else{
				obj[arr[i]]++;
			}
		}
		console.log(obj);
		var txt = '';			//存储出现次数最多的值
		var num = 0;			//存储出现次数最多的次数
		for(var k in obj){
			if(obj[k]>num){
				num = obj[k];
				txt = k;
			}
		}
		console.log('出现最多的值是：'+txt+'出现次数为：'+num);
	}
	
	findArrRepeat(testAr);
	console.log(typeof findArrRepeat);
})
