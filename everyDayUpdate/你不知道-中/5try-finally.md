### 关于 javascript 中的 try...finally 使用

---

finally 中的代码块总是会在 try 之后执行，如果有 catch 的话则在 catch 之后执行。也可以将 finally 中的代码块看做是一个回调函数，即无论什么情况最后一定会被调用。

如果，try 中有 return 语句会出现什么情况？return 会返回一个值，那么调用该函数并得到返回值的代码是在 finally 之前还是之后执行？

```js
function foo() {
  try {
    return 42;
    // throw error finally同理会执行
  } finally {
    console.log('hello finally');
  }
  console.log('never use');
}

console.log(foo());

// hello finally
// 42
```

如果 finally 中抛出异常，函数就会在此处终止，如果此前 try 中已经 return 返回值，则该值会被丢弃

```js
function foo() {
  try {
    return 42;
  } finally {
    throw 'throw';
  }
  console.log('never use');
}

console.log(foo());

// Uncaught Exception: throw
```

finally 中的 return 会覆盖 try 和 catch 中的 return 的返回值

```js
function foo() {
  try {
    return 42;
  } finally {
    return 'undefined';
  }
  console.log('never use');
}

foo(); // undefined
```
