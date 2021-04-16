### 说说你对DOM的理解
---

##### [一、DOM]()
文档对象模型 (DOM) 是 HTML 和 XML 文档的编程接口

##### [二、操作]()

- 创建节点
- 添加节点
- 更新节点
- 查询节点
- 删除节点

>$\color{green}{创建节点}$
- createElement：创建新元素，接受一个参数，即要创建元素的标签名
```js
const divEl = document.createElement("div");
```
- createTextNode: 创建一个文本节点
```js
const textEl = document.createTextNode("content");
```
- createAttribute: 创建属性节点，可以是自定义属性
```js
const dataAttribute = document.createAttribute('custom');
```

>$\color{green}{添加节点}$

- innerHTML： 
```
如果这个DOM节点是空的，例如，<div></div>，那么，直接使用innerHTML = '<span>child</span>'就可以修改DOM节点的内容，相当于添加了新的DOM节点
```
```
如果这个DOM节点不是空的，那就不能这么做，因为innerHTML会直接替换掉原来的所有子节点
```

- appendChild: 把一个子节点添加到父节点的最后一个子节点
- insertBefore: 把子节点插入到指定的位置, parentElement.insertBefore(newElement, referenceElement)
- setAttribute: 在指定元素中添加一个属性节点，如果元素中已有该属性改变属性值

>$\color{green}{更新节点}$

>$\color{green}{删除节点}$

- removeChild：
```js
// 拿到待删除节点:
const self = document.getElementById('to-be-removed');
// 拿到父节点:
const parent = self.parentElement;
// 删除:
const removed = parent.removeChild(self);
removed === self; // true
```

删除后的节点虽然不在文档树中了，但其实它还在内存中，可以随时再次被添加到别的位置

>$\color{green}{获取节点}$

```js
document.getElementById('id属性值');返回拥有指定id的对象的引用
document.getElementsByClassName('class属性值');返回拥有指定class的对象集合
document.getElementsByTagName('标签名');返回拥有指定标签名的对象集合
document.getElementsByName('name属性值'); 返回拥有指定名称的对象结合
document/element.querySelector('CSS选择器');  仅返回第一个匹配的元素
document/element.querySelectorAll('CSS选择器');   返回所有匹配的元素
document.documentElement;  获取页面中的HTML标签
document.body; 获取页面中的BODY标签
document.all[''];  获取页面中的所有元素节点的对象集合型
```

每个dom元素还存在有：parentNode、childNodes、firstChild、lastChild、nextSibling、previousSibling属性