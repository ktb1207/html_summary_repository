/**
*1关于JSBridge
*
*1.1用途：JSBridge 简单来讲，主要是 给 JavaScript 提供调用 Native 功能的接口
*JSBridge 就像其名称中的『Bridge』的意义一样，是 Native 和非 Native 之间的桥梁，
*它的核心是 构建 Native 和非 Native 间消息通信的通道，而且是 双向通信的通道。
*
* Native-----JSBridge-----javascript
*
*1.2所谓双向通信的通道：
*
*JS 向 Native 发送消息 : 调用相关功能、通知 Native 当前 JS 的相关状态等。
*
*Native 向 JS 发送消息 : 回溯调用结果、消息推送、通知 JS 当前 Native 的状态等。
*
*
*/

/**
*
*2JSBridge 的实现原理
*
*2.1JavaScript 是运行在一个单独的 JS Context 中
*
**/

/**
*3JSBridge 的通信原理
*
*3.1JavaScript 调用 Native
*
*JavaScript 调用 Native 的方式，主要有三种：注入 API 和 拦截 URL SCHEME和重写 prompt

*3.1.1注入API
*注入 API 方式的主要原理是，通过 WebView 提供的接口，向 JavaScript 的 Context（window）中注入对象或者方法，
*让 JavaScript 调用时，直接执行相应的 Native 代码逻辑，达到 JavaScript 调用 Native 的目的。
*ios:
*前端调用方式：window.webkit.messageHandlers.nativeBridge.postMessage(message);
*Android:window.nativeBridge.postMessage(message);
*
*
*3.1.2拦截 URL SCHEME
*
*URL SCHEME是一种类似于url的链接，是为了方便app直接互相调用设计的，形式和普通的 url 近似，
*主要区别是 protocol 和 host 一般是自定义的
*
*如：qunarhy://hy/url?url=ymfe.tech
*
*拦截 URL SCHEME 的主要流程是：
*Web 端通过某种方式（例如 iframe.src）发送 URL Scheme 请求，
*之后 Native 拦截到请求并根据 URL SCHEME（包括所带的参数）进行相关操作
*
*
*在时间过程中，这种方式有一定的 缺陷：
*
*a.使用 iframe.src 发送 URL SCHEME 会有 url 长度的隐患。
*b.创建请求，需要一定的耗时，比注入 API 的方式调用同样的功能，耗时会较长。
*
*
*
*
*
*3.2Native 调用 JavaScript
*
*相比于 JavaScript 调用 Native， Native 调用 JavaScript 较为简单，
*毕竟不管是 iOS 的 UIWebView 还是 WKWebView，还是 Android 的 WebView 组件，
*都以子组件的形式存在于 View/Activity 中，直接调用相应的 API 即可。
*
*
*Native 调用 JavaScript，其实就是执行拼接 JavaScript 字符串，从外部调用 JavaScript 中的方法，
*******************因此 JavaScript 的方法必须在全局的 window 上。
**/


/**
*4.JSBridge 如何引用
*4.1由 Native 端进行注入
*
*注入方式和 Native 调用 JavaScript 类似，直接执行桥的全部代码。
*
*它的优点在于：
*桥的版本很容易与 Native 保持一致，Native 端不用对不同版本的 JSBridge 进行兼容；
*
*缺点在于：
*它的缺点是：注入时机不确定，需要实现注入失败后重试的机制，保证注入的成功率，
*同时 JavaScript 端在调用接口时，需要优先判断 JSBridge 是否已经注入成功。
*
*
*
*
*4.2由 JavaScript 端引用
*直接与 JavaScript 一起执行。
*
*与由 Native 端注入正好相反，它的优点在于：
*JavaScript 端可以确定 JSBridge 的存在，直接调用即可
*
*缺点：
*如果桥的实现方式有更改，JSBridge 需要兼容多版本的 Native Bridge 或者 Native Bridge 兼容多版本的 JSBridge。
*
*
**/