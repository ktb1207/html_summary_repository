/**
 * Created by ktb on 17-9-13.
 */
/*
* XMLHttpRequest学习总结：
* 参考链接：https://segmentfault.com/a/1190000004322487
* */

/*
* 1.XMLHttpRequest：对象用于在后台与服务器交换数据。
*
* 2.浏览器兼容性：
*       A:所有现代浏览器 (IE7+、Firefox、Chrome、Safari 以及 Opera) 都内建了 XMLHttpRequest 对象:
*           xmlhttp=new XMLHttpRequest();
*       B:老版本的 Internet Explorer （IE5 和 IE6）使用 ActiveX 对象：
*           xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
*       C:兼容写法：
*           var xmlhttp = null;
*           if(window.XMLHttpRequest){
*               xmlhttp = window.XMLHttpRequest;
*           }else{
*               xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
*           }
*       D:
*           *IE8/IE9、Opera Mini 完全不支持xhr对象
*           *IE10/IE11部分支持，不支持 xhr.responseType为json
*           *部分浏览器不支持设置请求超时，即无法使用xhr.timeout
*           *部分浏览器不支持xhr.responseType为blob
*
* 3.XMLHttpRequest标准：
*       XMLHttpRequest标准又分为Level 1和Level 2：
*           XMLHttpRequest Level 1主要存在以下缺点：
*               *受同源策略的限制，不能发送跨域请求；
*               *不能发送二进制文件（如图片、视频、音频等），只能发送纯文本数据；
*               *在发送和获取数据的过程中，无法实时获取进度信息，只能判断是否完成；
*           XMLHttpRequest Level 2中新增了以下功能：
*               *可以发送跨域请求，在服务端允许的情况下；
*               *支持发送和接收二进制数据；
*               *新增formData对象，支持发送表单数据；
*               *发送和获取数据时，可以获取进度信息；
*               *可以设置请求的超时时间；
*
* 4.XMLHttpRequest用例：
*       function sendAjax() {
             //构造表单数据
             var formData = new FormData();
             formData.append('username', 'johndoe');
             formData.append('id', 123456);
             //创建xhr对象
             var xhr = new XMLHttpRequest();
             //设置xhr请求的超时时间
             xhr.timeout = 3000;
             //设置响应返回的数据格式
             xhr.responseType = "text";
             //创建一个 post 请求，采用异步
             xhr.open('POST', '/server', true);
             //注册相关事件回调处理函数
             xhr.onload = function(e) {
             if(this.status == 200||this.status == 304){
             alert(this.responseText);
             }
             };
             xhr.ontimeout = function(e) { ... };
             xhr.onerror = function(e) { ... };
             xhr.upload.onprogress = function(e) { ... };

             //发送数据
             xhr.send(formData);
        }

* 5.如何设置一些请求头部信息request header：
*       描述：在发送Ajax请求（实质是一个HTTP请求）时，我们可能需要设置一些请求头部信息，比如content-type、connection、cookie、accept-xxx等。
*            xhr提供了setRequestHeader来允许我们修改请求 header。
*       注意：
*            *方法的第一个参数 header 大小写不敏感，即可以写成content-type，也可以写成Content-Type，甚至写成content-Type;
*            *Content-Type的默认值与具体发送的数据类型有关;
*            *setRequestHeader必须在open()方法之后，send()方法之前调用，否则会抛错；
*            *setRequestHeader可以调用多次，最终的值不会采用覆盖override的方式，而是采用追加append的方式;
*       事例：
*            var client = new XMLHttpRequest();
*            client.open('GET', 'demo.cgi');
*            client.setRequestHeader('X-Test', 'one');
*            client.setRequestHeader('X-Test', 'two');
*            // 最终request header中"X-Test"为: one, two
*            client.send();
*
* 6.如何指定xhr.response的数据类型：
*       描述：有些时候我们希望xhr.response返回的就是我们想要的数据类型。比如：响应返回的数据是纯JSON字符串，
*            但我们期望最终通过xhr.response拿到的直接就是一个 js 对象，我们该怎么实现呢？
*       解决：有2种方法可以实现
*           一：采用level 1就提供的overrideMimeType()方法；
*           二：采用level 2才提供的xhr.responseType属性。
*
*       实例：
*           *overrideMimeType:
*               说明：
*               overrideMimeType是xhr level 1就有的方法，所以浏览器兼容性良好。这个方法的作用就是用来重写response的content-type,这样做有什么意义呢？
*               比如：server 端给客户端返回了一份document或者是 xml文档，我们希望最终通过xhr.response拿到的就是一个DOM对象，
*               那么就可以用xhr.overrideMimeType('text/xml; charset = utf-8')来实现。
*               场景：
*               我们都知道xhr level 1不支持直接传输blob二进制数据，那如果真要传输 blob 该怎么办呢？当时就是利用overrideMimeType方法来解决这个问题的。
*               var xhr = new XMLHttpRequest();
                 //向 server 端获取一张图片
                 xhr.open('GET', '/path/to/image.png', true);
                 // 这行是关键！
                 //将响应数据按照纯文本格式来解析，字符集替换为用户自己定义的字符集
                 xhr.overrideMimeType('text/plain; charset=x-user-defined');
                 xhr.onreadystatechange = function(e) {
                     if (this.readyState == 4 && this.status == 200) {
                         //通过 responseText 来获取图片文件对应的二进制字符串
                         var binStr = this.responseText;
                         //然后自己再想方法将逐个字节还原为二进制数据
                         for (var i = 0, len = binStr.length; i < len; ++i) {
                             var c = binStr.charCodeAt(i);
                             //String.fromCharCode(c & 0xff);
                             var byte = c & 0xff;
                         }
                     }
                 };
                 xhr.send();
*
*            *responseType:
*               说明：
*                   responseType是xhr level 2新增的属性，用来指定xhr.response的数据类型，目前还存在些兼容性问题；
*               可以设置如下格式：
*                    值	           xhr.response     数据类型说明
                     ""	           String字符串	    默认值(在不设置responseType时)
                     "text"	       String字符串
                     "document"	   Document对象	    希望返回 XML 格式数据时使用
                     "json"	       javascript 对象	存在兼容性问题，IE10/IE11不支持
                     "blob"	       Blob对象
                     "arrayBuffer" ArrayBuffer对象
*               场景：
*                   同样是获取一张图片的代码示例，相比xhr.overrideMimeType,用xhr.response来实现简单得多。
*                    var xhr = new XMLHttpRequest();
                     xhr.open('GET', '/path/to/image.png', true);
                     //可以将`xhr.responseType`设置为`"blob"`也可以设置为`" arrayBuffer"`
                     //xhr.responseType = 'arrayBuffer';
                     xhr.responseType = 'blob';
                     xhr.onload = function(e) {
                         if (this.status == 200) {
                             var blob = this.response;
                             ...
                         }
                     };
                     xhr.send();

*
* 7.如何获取response数据:
*   xhr提供了3个属性来获取请求返回的数据，分别是：xhr.response、xhr.responseText、xhr.responseXML;
*
*   A:xhr.response:
*           *默认值：空字符串"";
*           *当请求完成时，此属性才有正确的值;
*           *请求未完成时，此属性的值可能是""或者 null
*   B:xhr.responseText:
*           *默认值为空字符串"";
*           *只有当 responseType 为"text"、""时，xhr对象上才有此属性，此时才能调用xhr.responseText，否则抛错;
*           *只有当请求成功时，才能拿到正确值。以下2种情况下值都为空字符串""：请求未完成、请求失败;
*   C:xhr.responseXML:
*           *默认值为 null;
*           *只有当 responseType 为"text"、""、"document"时，xhr对象上才有此属性，此时才能调用xhr.responseXML，否则抛错;
*           *只有当请求成功且返回数据被正确解析时，才能拿到正确值。
*           *以下3种情况下值都为null：请求未完成、请求失败、请求成功但返回数据无法被正确解析时;
*
* 8.如何追踪ajax请求的当前状态:
*   在发一个ajax请求后，如果想追踪请求当前处于哪种状态，该怎么做呢？
*   用xhr.readyState这个属性即可追踪到。这个属性是只读属性，总共有5种可能值，分别对应xhr不同的不同阶段。
*   每次xhr.readyState的值发生变化时，都会触发xhr.onreadystatechange事件，我们可以在这个事件中进行相关状态判断。
*   xhr.onreadystatechange = function () {
         switch(xhr.readyState){
             case 1://OPENED
             //do something
             break;
             case 2://HEADERS_RECEIVED
             //do something
             break;
             case 3://LOADING
             //do something
             break;
             case 4://DONE
             //do something
             break;
          }
     }
*   状态值说明：
*   值	            状态	                            描述
    0	    UNSENT (初始状态，未打开)	        此时xhr对象被成功构造，open()方法还未被调用
    1	    OPENED (已打开，未发送)	        open()方法已被成功调用，send()方法还未被调用。注意：只有xhr处于OPENED状态，才能调用xhr.setRequestHeader()和xhr.send(),否则会报错
    2	    HEADERS_RECEIVED (已获取响应头)	send()方法已经被调用, 响应头和响应状态已经返回
    3	    LOADING (正在下载响应体)	        响应体(response entity body)正在下载中，此状态下通过xhr.response可能已经有了响应数据
    4	    DONE (整个数据传输过程结束)	        整个数据传输过程结束，不管本次请求是成功还是失败
*
* 9.如何设置请求的超时时间：
*   如果请求过了很久还没有成功，为了不会白白占用的网络资源，我们一般会主动终止请求。XMLHttpRequest提供了timeout属性来允许设置请求的超时时间。
*   xhr.timeout：0;
*   单位：milliseconds 毫秒;默认值：0，即不设置超时;
*
*   *到底什么时候才算是请求开始 ？
*       xhr.onloadstart事件触发的时候，也就是你调用xhr.send()方法的时候。
*       因为xhr.open()只是创建了一个连接，但并没有真正开始数据的传输，而xhr.send()才是真正开始了数据的传输过程。只有调用了xhr.send()，才会触发xhr.onloadstart 。
*   *什么时候才算是请求结束 ？
*       xhr.loadend事件触发的时候。
*
* 10.如何发一个同步请求:
*   xhr默认发的是异步请求，但也支持发同步请求（当然实际开发中应该尽量避免使用）。到底是异步还是同步请求，由xhr.open（）传入的async参数决定。
*   xhr.open(method, url,true);
*   async: 默认值为true，即为异步请求，若async=false，则为同步请求;
*
*   **注意：当xhr为一个sync同步请求时，xhr.timeout必须置为0，否则会抛错。
*
* 11.如何获取上传、下载的进度：
*   在上传或者下载比较大的文件时，实时显示当前的上传、下载进度是很普遍的产品需求。
*   通过onprogress事件来实时显示进度，默认情况下这个事件每50ms触发一次。
*   区别：上传过程和下载过程触发的是不同对象的onprogress事件：
*
*   *上传：上传触发的是xhr.upload对象的 onprogress事件
*   *下载：下载触发的是xhr对象的onprogress事件
*
*   用例：
*        xhr.onprogress = updateProgress;
         xhr.upload.onprogress = updateProgress;
         function updateProgress(event) {
             if (event.lengthComputable) {
                var completedPercent = event.loaded / event.total;
             }
         }
*
* 12.可以发送什么类型的数据:
*   xhr.send(data)的参数data可以是以下几种类型：
*       *ArrayBuffer
*       *Blob
*       *Document
*       *DOMString
*       *FormData
*       *null
*   xhr.send(data)中data参数的数据类型会影响请求头部content-type的默认值：
*       *如果data是 Document 类型，同时也是HTML Document类型，则content-type默认值为text/html;charset=UTF-8;
*       *如果data是 DOMString 类型，content-type默认值为text/plain;charset=UTF-8；
*       *如果data是 FormData 类型，content-type默认值为multipart/form-data; boundary=[xxx]
*       *如果data是其他类型，则不会设置content-type的默认值
*   当然这些只是content-type的默认值，但如果用xhr.setRequestHeader()手动设置了中content-type的值，以上默认值就会被覆盖。
*
*   注意：
*       *如果是 GET/HEAD请求，send()方法一般不传参或传 null。不过即使你真传入了参数，参数也最终被忽略，xhr.send(data)中的data会被置为 null.
*       *若在断网状态下调用xhr.send(data)方法，则会抛错;
*       *一旦程序抛出错误，如果不 catch 就无法继续执行后面的代码，所以调用 xhr.send(data)方法时，应该用 try-catch捕捉错误。
*       try{
            xhr.send(data)
        }catch(e) {
            //doSomething...
        };
*
* 13.xhr.withCredentials与 CORS 什么关系:
*   我们都知道，在发同域请求时，浏览器会将cookie自动加在request header中。
*   但大家是否遇到过这样的场景：在发送跨域请求时，cookie并没有自动加在request header中。
*   原因：
*   造成这个问题的原因是：在CORS标准中做了规定，默认情况下，浏览器在发送跨域请求时，不能发送任何认证信息:xhr对象有一个属性叫withCredentials，默认值为false
*   解决：
*   在跨域请求中，client端必须手动设置xhr.withCredentials=true；
*   且server端也必须允许request能携带认证信息（即response header中包含Access-Control-Allow-Credentials:true）；
*
*   **另外，要特别注意一点，一旦跨域request能够携带认证信息，server端一定不能将Access-Control-Allow-Origin设置为*，而必须设置为请求页面的域名。
*
* 14.xhr相关事件：
*   *onreadystatechange:每当xhr.readyState改变时触发；但xhr.readyState由非0值变为0时不触发。
*   *onloadstart:调用xhr.send()方法后立即触发，若xhr.send()未被调用则不会触发此事件。
*   *onprogress:xhr.upload.onprogress在上传阶段(即xhr.send()之后，xhr.readystate=2之前)触发，每50ms触发一次；
*               xhr.onprogress在下载阶段（即xhr.readystate=3时）触发，每50ms触发一次。
*   *onload:当请求成功完成时触发，此时xhr.readystate=4
*   *onloadend:当请求结束（包括请求成功和请求失败）时触发
*   *onabort:当调用xhr.abort()后触发;
*   *ontimeout:xhr.timeout不等于0，由请求开始即onloadstart开始算起，当到达xhr.timeout所设置时间请求还未结束即onloadend，则触发此事件。
*   *onerror:在请求过程中，若发生Network error则会触发此事件;
*            （若发生Network error时，上传还没有结束，则会先触发xhr.upload.onerror，再触发xhr.onerror；
*             若发生Network error时，上传已经结束，则只会触发xhr.onerror）。
*             注意，只有发生了网络层级别的异常才会触发此事件，对于应用层级别的异常，如响应返回的xhr.statusCode是4xx时，
*             并不属于Network error，所以不会触发onerror事件，而是会触发onload事件。)
*
* 15.xhr事件触发顺序：
*   1.触发xhr.onreadystatechange(之后每次readyState变化时，都会触发一次)
*   2.触发xhr.onloadstart
*   //上传阶段开始：
*   3.触发xhr.upload.onloadstart
*   4.触发xhr.upload.onprogress
*   5.触发xhr.upload.onload
*   6.触发xhr.upload.onloadend
*   //上传结束，下载阶段开始：
*   7.触发xhr.onprogress
*   8.触发xhr.onload
*   9.触发xhr.onloadend
*
* 16.发生abort/timeout/error异常的处理:
*   **在请求的过程中，有可能发生 abort/timeout/error这3种异常。那么一旦发生这些异常，xhr后续会进行哪些处理呢？后续处理如下：
*       1.一旦发生abort或timeout或error异常，先立即中止当前请求;
*       2.将 readystate 置为4，并触发 xhr.onreadystatechange事件;
*       3.如果上传阶段还没有结束，则依次触发以下事件：
*           *xhr.upload.onprogress
*           *xhr.upload.[onabort或ontimeout或onerror]
*           *xhr.upload.onloadend
*       4.触发 xhr.onprogress事件
*       5.触发 xhr.[onabort或ontimeout或onerror]事件
*       6.触发xhr.onloadend 事件
*
* 17.在哪个xhr事件中注册成功回调？
*   *从上面介绍的事件中，可以知道若xhr请求成功，就会触发xhr.onreadystatechange和xhr.onload两个事件。
*   *那么我们到底要将成功回调注册在哪个事件中呢？
*   *我倾向于 xhr.onload事件，因为xhr.onreadystatechange是每次xhr.readyState变化时都会触发，而不是xhr.readyState=4时才触发。
*   xhr.onload = function () {
         //如果请求成功
         if(xhr.status == 200){
            //do successCallback
         }
     }
*
* */
