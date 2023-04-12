---
description: 记录开发中的一些常用方法：环境判断、验证url是否有效、提取身份证信息
---

# 常用方法

> 收集开发中的一些常用方法

## 提取身份证信息

- #### 参数

  - **idCard:** 身份证号码
  - **separator:** 出生年月日的分割字符，默认为 `-`

- #### 返回值

  - **age:** 年龄（实岁）
  - **birthday:** 出生年月日
  - **gender:** 性别（0 女 1 男）

```js
export function extractInfoFromIDCard(idCard, separator = '-') {
  if (!isIDCard(idCard)) {
    throw Error(`${idCard}不是一个身份证号码`)
  }
  // 获取出生年月日和性别（0 女 1 男）
  const birthday = idCard.length === 18 ?
    idCard.substr(6, 4) + separator + idCard.substr(10, 2) + separator + idCard.substr(12, 2) :
    '19' + idCard.substr(6, 2) + separator + idCard.substr(8, 2) + separator + idCard.substr(10, 2)
  const gender = idCard.substr(-2, 1) & 1
  // 获取年龄（实岁）
  const birthDate = new Date(birthday)
  const newDate = new Date()
  const year = newDate.getFullYear()
  let age = year - birthDate.getFullYear()
  if (newDate < new Date(year + separator + birthday.substring(5))) {
    age--
  }
  return {
    age,
    birthday,
    gender
  }
}

function isIDCard(idCard) {
  const regExp18 = /^[\d]{17}[X\d]$/;
  const regExp15 = /^[\d]{15}$/;
  if (regExp18.test(idCard)) {
    const code = idCard.split("");
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      sum += parseInt(code[i]) * factor[i];
    }
    return parity[sum % 11] === code[17].toUpperCase();
  } else if (regExp15.test(idCard)) {
    return true;
  }
  return false;
}
```

:::

## 根据出生日期和死亡日期计算年龄

- #### 参数

  - **birthDate:** 出生日期
  - **deathDate:** 死亡日期

- #### 返回值

  - **age:** 年龄

```js
function calculateAge(birthDate, deathDate) {
  if (!birthDate) {
    console.log('出生日期不能为空！');
    return ''
  }

  if (deathDate && deathDate < birthDate) {
    console.log('死亡日期不能早于出生日期！');
    return ''
  }

  let now = new Date();
  let birth = new Date(birthDate);
  let death = deathDate ? new Date(deathDate) : now;
  let age = death.getFullYear() - birth.getFullYear();
  let month = death.getMonth() - birth.getMonth();

  if (month < 0 || (month === 0 && death.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}
```

:::

## 获取当前时间

- #### 参数

  - **type:** 类型 arr time 默认string

- #### 返回值

  - **arr:** ['2023','04','01']
  - **time:** 2023-04-01 13:14
  - **default:** 2023-04-01

```js
function getNowDate(type) {
  let now = new Date();
  let year = now.getFullYear(); //得到年份
  let month = now.getMonth(); //得到月份
  let date = now.getDate(); //得到日期
  let hour = now.getHours()
  let minute = now.getMinutes()
  month = month + 1;
  year = year.toString();
  month = month.toString().padStart(2, "0");
  date = date.toString().padStart(2, "0");
  hour = hour.toString().padStart(2, "0");
  minute = minute.toString().padStart(2, "0");
  if (type === 'arr') {
    return [year, month, date]
  } else if (type === 'time') {
    return `${year}-${month}-${date} ${hour}:${minute}`
  } else {
    return `${year}-${month}-${date}`
  }
}
```