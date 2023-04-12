# 常用正则

> 收集开发中的一些常用正则

[JS 正则表达式完整教程](https://juejin.cn/post/6844903501034684430)

## 验证相关

### 是否是身份证号码

```js
/^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/
```
### 是否是手机号

```js
/^1\d{10}$/

/^1[3-9]\d{9}$/
```

### 是否是金额（精确到分）

```js
/^(0|([1-9]\d*))(\.\d{1,2})?$/

/(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0){1}$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/
```



### 是否是邮箱号

```js
/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

/**
 * 参考 MDN
 * https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/email#basic_validation
 */
/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
```

### 是否是链接地址

```js
/^(https|http):\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
```

