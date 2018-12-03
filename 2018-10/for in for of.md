# 研究下有关for in  for of相关内容

先来看下代码：

```javascript
let ary = [1, 2, 3, 4, 5]
let obj = {
  name: 'Ada',
  age: '18',
  city: 'Beijing'
}

// 1
for (const i in ary) {
  console.log(i, ary[i])
}
// 2
for (const i in obj) {
  console.log(i, obj[i])
}
// 3
for (const i of ary) {
  console.log(i, ary[i])
}
// 4
for (const i of obj) {
  console.log(i)
}
// 5
for (const i of Object.keys(obj)) {
  console.log(i, obj[i])
}
```

1结果：

```shell
0 1
1 2
2 3
3 4
4 5
```

for in 可以遍历数组，i为元素的索引，可以根据索引找到对应值。

2结果：

```shell
name Ada
age 18
city Beijing
```

for in 可以遍历对象，i为属性key，可以根据key找到对应的value值。

3结果：

```shell
1 2
2 3
3 4
4 5
5 undefined
```

for of 可以遍历数组，**但是此时的i为值而不是索引**，输出结果为数组每一项的值。

4结果：

```shell
TypeError: obj is not iterable
```

当使用for of进行对象属性遍历的时候，会报错。不会循环对象的key，如果一定要遍历对象，可以结合Object.keys使用。

更复杂点的情况：

```javascript
let ary = [1, 2, 3, 4, 5]
let ary2 = [1, 2, {name:'Tom', age:5}]

// 是否添加这句
ary2.value = 1
// 1
for (const i in ary2) {
  console.log(i, ary2[i])
}
// 2
for (const i of ary2) {
  console.log(i, ary2[i])
}
```

1 for in结果：

```shell
// 添加
0 1
1 2
2 { name: 'Tom', age: 5 }
value 1

// 不添加
0 1
1 2
2 { name: 'Tom', age: 5 }
```

2 for of结果：

```shel
// 添加
1 2
2 { name: 'Tom', age: 5 }
{ name: 'Tom', age: 5 } undefined

// 不添加
1 2
2 { name: 'Tom', age: 5 }
{ name: 'Tom', age: 5 } undefined
```

可以看到向数组中添加属性的时候，for in不仅能够遍历数组元素，还可以遍历出自定义属性。for of不会循环key，只能循环value。

> ## for...of 循环
>
> ES6 借鉴 C++、Java、C# 和 Python 语言，引入了`for...of`循环，作为遍历所有数据结构的统一的方法。
>
> 一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有 iterator 接口，就可以用`for...of`循环遍历它的成员。也就是说，`for...of`循环内部调用的是数据结构的`Symbol.iterator`方法。
>
> `for...of`循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如`arguments`对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。
>
> `for...in`循环读取键名，`for...of`循环读取键值。如果要通过`for...of`循环，获取数组的索引，可以借助数组实例的`entries`方法和`keys`方法（参见《数组的扩展》一章）。
>
> `for...of`循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。这一点跟`for...in`循环也不一样。
>
> [http://es6.ruanyifeng.com/#docs/iterator#for---of-%E5%BE%AA%E7%8E%AF](http://es6.ruanyifeng.com/#docs/iterator#for---of-%E5%BE%AA%E7%8E%AF)

另外，for of 支持break continue等，数组的foreach 方法则不支持。