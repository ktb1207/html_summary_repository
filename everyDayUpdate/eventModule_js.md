### 关于javascript中的事件模型
---

##### [一、事件与事件流]()

javascript中的事件，可以理解就是在HTML文档或者浏览器中发生的一种交互操作，使得网页具备互动性， 常见的有加载事件、鼠标事件、键盘事件、自定义事件等

由于DOM是一个树结构，如果在父子节点绑定事件时候，当触发子节点的时候，就存在一个顺序问题，这就涉及到了事件流的概念

事件流都会经历三个阶段：

- 事件捕获阶段(capture phase)
- 处于目标阶段(target phase)
- 处于目标阶段(target phase)

事件冒泡是一种从下往上的传播方式，由最具体的元素（触发节点）然后逐渐向上传播到最不具体的那个节点，也就是DOM中最高层的父节点

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Event Bubbling</title>
    </head>
    <body>
        <button id="clickMe">Click Me</button>
    </body>
</html>
```
然后，我们给button和它的父元素，加入点击事件

```js
var button = document.getElementById('clickMe');

button.onclick = function() {
  console.log('1.Button');
};
document.body.onclick = function() {
  console.log('2.body');
};
document.onclick = function() {
  console.log('3.document');
};
window.onclick = function() {
  console.log('4.window');
};
```
点击按钮输出如下：

```js
1.button
2.body
3.document
4.window
```
点击事件首先在button元素上发生，然后逐级向上传播

事件捕获与事件冒泡相反，事件最开始由不太具体的节点最早接收事件, 而最具体的节点（触发节点）最后接收事件

##### [一、事件模型]()

事件模型可以分为三种：

- 原始事件模型（DOM0级）
- 标准事件模型（DOM2级）
- IE事件模型(基本不用)

>$\color{green}{原始事件模型}$

两种方式：
html代码中直接绑定
```html
<input type="button" onClick="fun()">
```

通过js绑定：

```js
var btn = document.getElementById('.btn');
btn.onclick = fun;
```

特性：
- 绑定速度快
DOM0级事件具有很好的跨浏览器优势，会以最快的速度绑定，但由于绑定速度太快，可能页面还未完全加载出来，以至于事件可能无法正常运行
- 只支持冒泡，不支持捕获
- 同一个事件类型只能绑定一次

删除 DOM0 级事件处理程序只要将对应事件属性置为null即可
```js
btn.onclick = null;
```

>$\color{green}{标准事件模型}$

在该事件模型中，一次事件共有三个过程:

- 事件捕获阶段：事件从document一直向下传播到目标元素, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行
- 事件处理阶段：事件到达目标元素, 触发目标元素的监听函数
- 事件冒泡阶段：事件从目标元素冒泡到document, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行

事件绑定监听函数方式：
```js
addEventListener(eventType, handler, useCapture)
```

移除事件绑定监听函数：

```js
removeEventListener(eventType, handler, useCapture)
```

特性：

- 可以在一个DOM元素上绑定多个事件处理器，各自并不会冲突