### 说说你对BOM的理解
---

##### [一、是什么？]()

BOM (Browser Object Model)，浏览器对象模型，提供了独立与浏览器窗口进行交互的对象

其作用就是跟浏览器做一些交互效果，比如如何进行页面的后退，前进，刷新，浏览器的窗口发生变化，滚动条的滚动，以及获取客户的一些信息如：浏览器品牌版本，屏幕分辨率等。

##### [二、window]()

Bom的核心对象是window，它表示浏览器的一个实例

在浏览器中，window对象有双重角色，即是浏览器窗口的一个接口，又是全局对象

关于窗口控制方法如下：

- moveBy(x,y)：从当前位置水平移动窗体x个像素，垂直移动窗体y个像素，x为负数，将向左移动窗体，y为负数，将向上移动窗体
- moveTo(x,y)：移动窗体左上角到相对于屏幕左上角的(x,y)点
- resizeBy(w,h)：相对窗体当前的大小，宽度调整w个像素，高度调整h个像素。如果参数为负值，将缩小窗体，反之扩大窗体
- resizeTo(w,h)：把窗体宽度调整为w个像素，高度调整为h个像素
- scrollTo(x,y)：如果有滚动条，将横向滚动条移动到相对于窗体宽度为x个像素的位置，将纵向滚动条移动到相对于窗体高度为y个像素的位置
- scrollBy(x,y)：如果有滚动条，将横向滚动条向左移动x个像素，将纵向滚动条向下移动y个像素
- window.open() 既可以导航到一个特定的url，也可以打开一个新的浏览器窗口
   + 如果 window.open() 传递了第二个参数，且该参数是已有窗口或者框架的名称，那么就会在目标窗口加载第一个参数指定的URL
   ```js
    window.open('htttp://www.vue3js.cn','topFrame')
    ==>
    <a href="http://www.vue3js.cn" target="topFrame"></a>
   ```
   + window.open() 会返回新窗口的引用，也就是新窗口的 window 对象
   + window.close() 仅用于通过 window.open() 打开的窗口
   + 新创建的 window 对象有一个 opener 属性，该属性指向打开他的原始窗口对象

##### [三、location]()

url地址如下：
http://www.wrox.com:80/WileyCDA/?q=javascript#contents

location属性描述如下：

- hash:utl中#后面的字符，没有则返回空串---#contents
- host:服务器名称和端口号---www.wrox.com:80
- hostname:域名---www.wrox.com
- href:完整url---	http://www.wrox.com:80/WileyCDA/?q=javascript#contents
- pathname:服务器下面的文件路径---/WileyCDA/
- port:url的端口号，没有则为空---80
- protocol: 使用的协议
- search:url的查询字符串，通常为？后面的内容---?q=javascript

除了 hash之外，只要修改location的一个属性，就会导致页面重新加载新URL

location.reload()，此方法可以重新刷新当前页面
这个方法会根据最有效的方式刷新页面，如果页面自上一次请求以来没有改变过，页面就会从浏览器缓存中重新加载
如果要强制从服务器中重新加载，传递一个参数true即可,location.reload(true)

##### [四、history]()

history对象主要用来操作浏览器URL的历史记录，可以通过参数向前，向后，或者向指定URL跳转

- history.go():接收一个整数数字或者字符串参数：向最近的一个记录中包含指定字符串的页面跳转
   + 当参数为整数数字的时候，正数表示向前跳转指定的页面，负数为向后跳转指定的页面
- history.forward()：向前跳转一个页面
- history.back()：向后跳转一个页面
- history.length：获取历史记录数

##### [五、screen]()

保存的纯粹是客户端能力信息，也就是浏览器窗口外面的客户端显示器的信息

##### [六、navigator]()

navigator 对象主要用来获取浏览器的属性，区分浏览器类型。属性较多，且兼容性比较复杂