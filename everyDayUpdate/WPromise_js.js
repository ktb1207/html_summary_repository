/**
 * 手写Promise - 实现一个基础的Promise
 *
 * */

// promise基本用法：
const statusTag = true;
const promise = new Promise(function (resolve, reject) {
  setTimeout(() => {
    if (statusTag) {
      resolve('true');
    } else {
      reject('false');
    }
  }, 1000);
});
promise.then(
  function (value) {
    // success
    console.log(value);
  },
  function (error) {
    // error
    console.log(error);
  }
);

// Promise 基本描述
// 1.promise是一个类，它的构造函数接受一个函数，函数的两个参数也都是函数
// 2.在传入的函数中执行resolve表示成功，执行reject表示失败，传入的值会传给then方法的回调函数
// 3.promise有一个叫做then的方法，该方法有两个参数，第一个参数是成功之后执行的回调函数，
// 第二个参数是失败之后执行的回调函数。then方法在resolve或者reject执行之后才会执行，
// 并且then方法中的值是传给resolve或reject的参数
// 4.promise支持链式调用

/**
 *
 * 重难点：链式调用
 * 采用方案：每次then方法都将返回一个新的Promise
 * 简单说一下，then函数中返回的Promise的value值来源于当前then函数的onFulfilled函数（第一个参数）的执行结果
 *
 */

/**
 *
 * 开始实现手写promise
 */

// promise是一个类
class WPromise {
  /**
   * 需要注意的一点是，这三个状态之间只存在两个变换关系：
   * pending转换为fulfilled，只能由resolve方法完成转换
   * pending转换为rejected，只能由reject方法完成转换
   */

  // pending 初始状态，既不是成功，也不是失败状态。等待resolve或者reject调用更新状态。
  static pending = 'pending';
  // fulfilled 意味着操作成功完成。
  static fulfilled = 'fulfilled';
  // rejected 意味着操作失败。
  static rejected = 'rejected';

  constructor(fun) {
    // 初始化状态为pending
    this.status = WPromise.pending;
    // 存储 this._resolve 即操作成功 返回的值
    this.value = undefined;
    // 存储 this._reject 即操作失败 返回的值
    this.reason = undefined;

    // 存储then中传入的参数
    // 至于为什么是数组呢？因为同一个Promise的then方法可以调用多次
    this.callbacks = [];

    // 这里绑定this是为了防止执行时this的指向改变，this的指向问题，这里不过多赘述 class中this默认指向实例
    fun(this._resolve.bind(this), this._reject.bind(this));
  }

  // onFulfilled 是成功时执行的函数
  // onRejected 是失败时执行的函数
  // then(onFulfilled, onRejected) {
  //   // 这里可以理解为在注册事件
  //   // 也就是将需要执行的回调函数存储起来
  //   this.callbacks.push({
  //     onFulfilled,
  //     onRejected,
  //   });
  // }

  then(onFulfilled, onRejected) {
    // 返回一个新的Promise
    return new WPromise((nextResolve, nextReject) => {
      // 这里之所以把下一个Promsie的resolve函数和reject函数也存在callback中
      // 是为了将onFulfilled的执行结果通过nextResolve传入到下一个Promise作为它的value值
      this._handler({
        nextResolve,
        nextReject,
        onFulfilled,
        onRejected,
      });
    });
  }

  _resolve(value) {
    // 处理onFulfilled执行结果是一个Promise时的情况
    // 这里可能理解起来有点困难
    // 当value instanof WPromise时，说明当前Promise肯定不会是第一个Promise
    // 而是后续then方法返回的Promise（第二个Promise）
    // 我们要获取的是value中的value值（有点绕，value是个promise时，那么内部存有个value的变量）
    // 怎样将value的value值获取到呢，可以将传递一个函数作为value.then的onFulfilled参数
    // 那么在value的内部则会执行这个函数，我们只需要将当前Promise的value值赋值为value的value即可

    if (value instanceof WPromise) {
      value.then(this._resolve.bind(this), this._reject.bind(this));
      return;
    }

    // 保存resolve value
    this.value = value;
    // 将状态设置为成功
    this.status = WPromise.fulfilled;

    // 通知事件执行
    this.callbacks.forEach((cb) => this._handler(cb));
  }

  _reject(reason) {
    if (reason instanceof WPromise) {
      reason.then(this._resolve.bind(this), this._reject.bind(this));
      return;
    }
    // 保存reject error
    this.reason = reason;
    // 将状态设置为失败
    this.status = WPromise.rejected;

    // 通知事件执行
    this.callbacks.forEach((cb) => this._handler(cb));
  }

  // _handler(callback) {
  //   const { onFulfilled, onRejected } = callback;

  //   if (this.status === WPromise.fulfilled && onFulfilled) {
  //     // 传入存储的值
  //     onFulfilled(this.value);
  //   }

  //   if (this.status === WPromise.rejected && onRejected) {
  //     // 传入存储的错误信息
  //     onRejected(this.reason);
  //   }
  // }

  _handler(callback) {
    const { onFulfilled, onRejected, nextResolve, nextReject } = callback;

    if (this.status === WPromise.pending) {
      this.callbacks.push(callback);
      return;
    }

    if (this.status === WPromise.fulfilled) {
      // 传入存储的值
      // 未传入onFulfilled时，value传入
      const nextValue = onFulfilled ? onFulfilled(this.value) : this.value;
      nextResolve(nextValue);
      return;
    }

    if (this.status === WPromise.rejected) {
      // 传入存储的错误信息
      // 同样的处理
      const nextReason = onRejected ? onRejected(this.reason) : this.reason;
      nextReject(nextReason);
    }
  }
}

export default WPromise;
