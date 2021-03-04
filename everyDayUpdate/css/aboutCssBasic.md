### css面试基础部分一
---
#####[1.介绍一下标准的 CSS 的盒子模型？低版本 IE 的盒子模型有什么不同的？]()

（1）有两种盒子模型：IE盒模型（border-box）、W3C标准盒模型（content-box）
（2）盒模型：分为内容（content）、填充（padding）、边界（margin）、边框（border）四个部分

- W3C标准盒模型：属性width，height只包含内容content，不包含border和padding
- IE盒模型：属性width，height包含content、border和padding，指的是content
+padding+border。

在ie8+浏览器中使用哪个盒模型可以由box-sizing（CSS新增的属性）控制，默认值为content-box，即标准盒模型；
如果将box-sizing设为border-box则用的是IE盒模型。

#####[2.CSS 选择符有哪些？]()
（1）id选择器（#myid）
（2）类选择器（.myclassname）
（3）标签选择器（div,h1,p）
（4）后代选择器（h1 p）
（5）子代选择器（ul>li）
（6）兄弟选择器（li~a）
（7）相邻兄弟选择器（li+a）
（8）属性选择器（a[rel="external"]）
（9）伪类选择器（a:hover,li:nth-child）
（10）伪元素选择器（::before、::after）
（11）通配符选择器（*）
#####[3.::before 和:after 中双冒号和单冒号有什么区别？解释一下这 2 个伪元素的作用。]()
单冒号（:）用于CSS3伪类，双冒号（::）用于CSS3伪元素。
双冒号是在当前规范中引入的，用于区分伪类和伪元素。
不过浏览器需要同时支持旧的已经存在的伪元素写法，如:before、:after
想让插入的内容出现在其它内容前，使用::before，否者，使用::after；
#####[4.伪类与伪元素的区别]()
css引入伪类和伪元素概念是为了格式化文档树以外的信息。也就是说，伪类和伪元素是用来修饰不在文档树中的部分，比如，一句话中的第一个字母，或者是列表中的第一个元素。

伪类用于当已有的元素处于某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，我们可以通过:hover来描述这个元素的状态。

伪元素用于创建一些不在文档树中的元素，并为其添加样式。
#####[5.CSS 中哪些属性可以继承？]()

每个CSS属性定义的概述都指出了这个属性是默认继承的，还是默认不继承的。这决定了当你没有为元素的属性指定值时该如何计算值。

当元素的一个继承属性没有指定值时，则取父元素的同属性的计算值。

当元素的一个非继承属性没有指定值时，则取属性的初始值

当一个属性不是继承属性的时候，我们也可以通过将它的值设置为inherit来使它从父元素那获取同名的属性值来继承。

#####[6.CSS 优先级算法如何计算？]()

CSS的优先级是根据样式声明的特殊性值来判断的

选择器的特殊性值分为四个等级，如下：

（1）标签行内样式x,0,0,0
（2）ID选择符0,x,0,0
（3）class选择符/属性选择符/伪类选择符 0,0,x,0
（4）元素和伪元素选择符0,0,0,x

计算方法：
（1）每个等级的初始值为0
（2）每个等级的叠加为选择器出现的次数相加
（3）不可进位，比如0,99,99,99
（4）依次表示为：0,0,0,0
（5）每个等级计数之间没关联
（6）等级判断从左向右，如果某一位数值相同，则判断下一位数值
（7）如果两个优先级相同，则最后出现的优先级高，!important也适用
（8）通配符选择器的特殊性值为：0,0,0,0
（9）继承样式优先级最低，通配符样式优先级高于继承样式
（10）!important（权重），它没有特殊性值，但它的优先级是最高的，为了方便记忆，可以认为它的特殊性值为1,0,0,0,0。

注意：
（1）样式应用时，css会先查看规则的权重（!important），加了权重的优先级最高，当权重相同的时候，会比较规则的特殊性。

（2）特殊性值越大的声明优先级越高。

（3）相同特殊性值的声明，根据样式引入的顺序，后声明的规则优先级高（距离元素出现最近的）

 (4) 部分浏览器由于字节溢出问题出现的进位表现不做考虑
#####[7.关于a标签伪类 LVHA 的解释?]()
a标签有四种状态：链接访问前、链接访问后、鼠标滑过、激活，分别对应四种伪类:link、:visited、:hover、:active；

当链接未访问过时：

（1）当鼠标滑过a链接时，满足:link和:hover两种状态，要改变a标签的颜色，就必须将:hover伪类在:link伪
类后面声明；
（2）当鼠标点击激活a链接时，同时满足:link、:hover、:active三种状态，要显示a标签激活时的样式（:active），
必须将:active声明放到:link和:hover之后。因此得出LVHA这个顺序。

当链接访问过时，情况基本同上，只不过需要将:link换成:visited。

这个顺序能不能变？可以，但也只有:link和:visited可以交换位置，因为一个链接要么访问过要么没访问过，不可能同时满足，也就不存在覆盖的问题。

#####[9.如何居中 div？]()

- 水平居中：给 div 设置一个宽度，然后添加 margin:0 auto 属性

```css
div {
  width: 200px;
  margin: 0 auto;
}
```

- 水平居中，利用 text-align:center 实现

```css
.container {
  background: rgba(0, 0, 0, 0.5);
  text-align: center; // 对行元素有效
  font-size: 0;
}

.box {
  display: inline-block; // 设置为行元素
  width: 500px;
  height: 400px;
  background-color: pink;
}
```
- 让绝对定位的 div 居中水平垂直居中一（定宽定高）
```css
.box{
  position: absolute;/*绝对定位*/
  width: 500px;
  height: 300px;
  top: 50%;
  left: 50%;
  margin: -150px,-250px;/*外边距为自身宽高的一半*/
  background-color: pink;/*方便看效果*/
}
```
- 让绝对定位的 div 居中水平垂直居中二（未知宽高）
```css
div {
  position: absolute; /*相对定位或绝对定位均可*/
  width: 500px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: pink; /*方便看效果*/
}
```
- 利用flex布局水平垂直居中三
```css
.container {
  display: flex;
  align-items: center; /*垂直居中*/
  justify-content: center; /*水平居中*/
}
.containerdiv {
  width: 100px;
  height: 100px;
  background-color: pink; /*方便看效果*/
}
```
- 水平垂直居中四(利用text-align:center和vertical-align:middle属性)
```css
.container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  font-size: 0;
  white-space: nowrap;
  overflow: auto;
}

.container::after {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

.box {
  display: inline-block;
  width: 500px;
  height: 400px;
  background-color: pink;
  white-space: normal;
  vertical-align: middle;
}
```
#####[10.display 有哪些值？说明他们的作用。]()
block 块类型。默认宽度为父元素宽度，可设置宽高，换行显示。
none 元素不显示，并从文档流中移除。
inline 行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。
inline-block 默认宽度为内容宽度，可以设置宽高，同行显示。
list-item 像块类型元素一样显示，并添加样式列表标记。
table 此元素会作为块级表格来显示。
inherit 规定应该从父元素继承display属性的值。

#####[11.position 的值 relative 和 absolute 定位原点是？]()
- absolute
生成绝对定位的元素，相对于值不为static的第一个父元素的padding box进行定位，也可以理解为离自己这一级元素最近的一级position设置为absolute或者relative的父元素的padding box的左上角为原点的。
- fixed（老IE不支持）
生成绝对定位的元素，相对于浏览器窗口进行定位。
- relative
生成相对定位的元素，相对于其元素本身所在正常位置进行定位。
- static
默认值。没有定位，元素出现在正常的流中（忽略top,bottom,left,right,z-index声明）。

#####[12.用纯 CSS 创建一个三角形的原理是什么？]()
采用的是相邻边框连接处的均分原理。
将元素的宽高设为0，只设置border，把任意三条边隐藏掉（颜色设为transparent），剩下的就是一个三角形。

```css
#demo {
  width: 0;
  height: 0;
  border-width: 20px;
  border-style: solid;
  border-color: transparent transparent red transparent;
}
```
#####[13.Chrome中文界面下默认会将小于12px的文本强制按照12px显示]()

解决方法：

1.可通过加入CSS属性-webkit-text-size-adjust:none;解决。但是，在chrome
更新到27版本之后就不可以用了。

2.还可以使用-webkit-transform:scale(0.5);注意-webkit-transform:scale(0.75);
收缩的是整个span的大小，这时候，必须要将span转换成块元素，可以使用display：block/inline-block/...；

#####[14.li 与 li 之间有看不见的空白间隔是什么原因引起的？有什么解决办法？]()

浏览器会把inline元素间的空白字符（空格、换行、Tab等）渲染成一个空格。而为了美观。我们通常是一个```<li>```放在一行，这导致```<li>```换行后产生换行字符，它变成一个空格，占用了一个字符的宽度。

解决办法：
（1）为```<li>```设置float:left。不足：有些容器是不能设置浮动，如左右切换的焦点图等。
（2）将所有```<li>```写在同一行。不足：代码不美观。
（3）将```<ul>```内的字符尺寸直接设为0，即font-size:0。不足：```<ul>```中的其他字符尺寸也被设为0，需要额外重新设定其他字符尺寸，且在Safari浏览器依然会出现空白间隔。
（4）消除```<ul>```的字符间隔letter-spacing:-8px，不足：这也设置了```<li>```内的字符间隔，因此需要将```<li>```内的字符间隔设为默认letter-spacing:normal。

#####[15.为什么要初始化 CSS 样式？]()

因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。

当然，初始化样式会对SEO有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化。

淘宝的样式初始化代码：
```css
body,h1,h2,h3,h4,h5,h6,hr,p,blockquote,dl,dt,dd,ul,ol,li,pre,form,fieldset,legend
,button,input,textarea,th,td{margin:0;padding:0;}
body,button,input,select,textarea{font:12px/1.5tahoma,arial,\5b8b\4f53;}
h1,h2,h3,h4,h5,h6{font-size:100%;}
address,cite,dfn,em,var{font-style:normal;}
code,kbd,pre,samp{font-family:couriernew,courier,monospace;}
small{font-size:12px;}
ul,ol{list-style:none;}
a{text-decoration:none;}
a:hover{text-decoration:underline;}
sup{vertical-align:text-top;}
sub{vertical-align:text-bottom;}
legend{color:#000;}
fieldset,img{border:0;}
button,input,select,textarea{font-size:100%;}
table{border-collapse:collapse;border-spacing:0;}
```
#####[16.什么是包含块，对于包含块的理解?]()

包含块（containing block）就是元素用来计算和定位的一个框。

（1）根元素（很多场景下可以看成是```<html>```）被称为“初始包含块”，其尺寸等同于浏览器可视窗口的大小。
（2）对于其他元素，如果该元素的position是relative或者static，则“包含块”由其最近的块容器祖先盒的content box边界形成。
（3）如果元素position:fixed，则“包含块”是“初始包含块”。
（4）如果元素position:absolute，则“包含块”由最近的position不为static的祖先元素建立

#####[17.CSS 里的 visibility 属性有个 collapse 属性值是干嘛用的？在不同浏览器下以后什么区别？]()

（1）对于一般的元素，它的表现跟visibility：hidden;是一样的。元素是不可见的，但此时仍占用页面空间。
（2）但例外的是，如果这个元素是table相关的元素，例如table行，table group，table列，table column group，它的表现却跟display:none一样，也就是说，它们占用的空间也会释放。

在不同浏览器下的区别：

- 在谷歌浏览器里，使用collapse值和使用hidden值没有什么区别。
- 在火狐浏览器、Opera和IE11里，使用collapse值的效果就如它的字面意思：table的行会消失，它的下面一行会补充它的位置。
#####[18.width:auto 和 width:100%的区别]()

一般而言:
- width:100%会使元素box的宽度等于父元素的content box的宽度。
- width:auto会使元素撑满整个父元素，margin、border、padding、content区域会自动分配水平空间。
#####[19.绝对定位元素与非绝对定位元素的百分比计算的区别]()

- 绝对定位元素的宽高百分比是相对于临近的position不为static的祖先元素的padding box来计算的。
- 非绝对定位元素的宽高百分比则是相对于父元素的content box来计算的。

#####[20.简单介绍使用图片 base64 编码的优点和缺点。]()

base64编码是一种图片处理格式，通过特定的算法将图片编码成一长串字符串，在页面上显示的时候，可以用该字符串来代替图片的url属性。

使用base64的优点是：
（1）减少一个图片的HTTP请求

使用base64的缺点是：

（1）根据base64的编码原理，编码后的大小会比原文件大小大1/3，如果把大图片编码到html/css中，不仅会造成文件体积的增加，影响文件的加载速度，还会增加浏览器对html或css文件解析渲染的时间。
（2）使用base64无法直接缓存，要缓存只能缓存包含base64的文件，比如HTML或者CSS，这相比域直接缓存图片的效果要差很多。

（3）兼容性的问题，ie8以前的浏览器不支持。