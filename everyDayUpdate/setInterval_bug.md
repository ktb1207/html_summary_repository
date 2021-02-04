### 为什么要用 setTimeout 模拟 setInterval ？
---
####1.setTimeout

```js
setTimeout(fn(),ms);
```
说明：延时调用，在延时ms后执行fn一次

####2.setInterval

```js
setInterval(fn(),ms);
```
说明：间歇调用，没间隔ms，执行fn一次

#### 3.setInterval你不知道的bug
在JS 事件循环之宏任务和微任务中讲到过，setTimeout和setInterval 是一个宏任务。
依据浏览器事件循环机制，宏任务添加至任务队列等待同步任务执行完毕再依次从任务队列取出执行



**setInterval 缺点 与 setTimeout 的不同**
- 再次强调，定时器指定的时间间隔，表示的是何时将定时器的代码添加到消息队列，而不是何时执行代码。
- 所以真正何时执行代码的时间是不能保证的，取决于何时被主线程的事件循环取到，并执行。

定时器代码

```js
setInterval(fn(), N);
```
- 上面这句代码的意思其实是fn()将会在 N 秒之后被推入任务队列。
- 但是，setInterval 在每次把任务 push 到任务队列前，都要进行一下判断(看上次的任务是否仍在队列中，如果有则不添加，没有则添加)。
- bug1:使用 setInterval 时，某些间隔会被跳过；
- bug2:使用 setInterval 时,执行间隔不保证；

延时器代码


```js
setTimeout(fn(), N);
```

- 每个 setTimeout 产生的任务会直接 push 到任务队列中,区别与setInterval

#### 4. setTimeout 模拟 setInterval
- 在前一个定时器执行完前，不会向队列插入新的定时器（解决缺点一）
- 保证定时器间隔（解决缺点二）

写一个 interval 方法
```js
let timer = null
function interval(func, wait){
  let interv = function(){
    func.call(null);
    timer=setTimeout(interv, wait);
  };
  timer= setTimeout(interv, wait);
};
```
和 setInterval() 一样使用它

```js
interval(function() {}, 20);
```
