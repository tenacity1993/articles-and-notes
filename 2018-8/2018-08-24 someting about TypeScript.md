# TpyeScript

[官网](https://www.tslang.cn/)

[手册](http://www.typescriptlang.org/docs/handbook/interfaces.html)

#### 介绍

TypeScript是JavaScript类型的超集，它可以编译成JavaScript。

#### 功能

- 基于静态类型，开发时声明变量的类型，编译器保证赋值时不会发生错误，有错则会中断执行
- 能够在编译阶段对JavaScript进行检查，捕获所有类型的错误

#### 使用

##### 基本类型

Boolean、Number、String、Array、Tuple、Enum、Any、

Void、Null、Undefined、Never、Object、Type assertions

- 其中Tuple可以定义一个类型的元祖，允许赋值为一个数组，且数组中的元素类型与所给声明一一对应即可。

```typescript
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error
```

注意：

```typescript
// 访问已有元素时，需要类型正确
console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'

// 当使用index 向数组中新增元素时，只要元素符合类型即可添加，不会报错
x[3] = "world"; // OK, 'string' can be assigned to 'string | number'
console.log(x[5].toString()); // OK, 'string' and 'number' both have 'toString'
x[6] = true; // Error, 'boolean' isn't 'string | number'
```

- 数组定义有两种方式

```typescript
let list: num[] = [1, 2, 3]

let list: Array<number> = [1, 2, 3]
```

- 关于enum类型

```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

生成的js代码：（consoel.log是为了看清过程后加的）

```javascript
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    console.log(Color)
    Color[Color["Green"] = 1] = "Green";
    console.log(Color)
    Color[Color["Blue"] = 2] = "Blue";
    console.log(Color)
})(Color || (Color = {}));
var c = Color.Green;
```

运行结果为：

```javascript
{ '0': 'Red', Red: 0 }
{ '0': 'Red', '1': 'Green', Red: 0, Green: 1 }
{ '0': 'Red', '1': 'Green', '2': 'Blue', Red: 0, Green: 1, Blue: 2 }
```

其中`Color["Red"] = 0` 返回值为0。这个是之前没有注意过的问题。

- 关于Any类型，可以用来接收动态的内容，允许退出类型检查。

- Never 用于永远都不会返回的函数或者抛出异常的函数返回值类型。

- Type assertions类型：可以理解成类型转换，提供给编译器使用，并不会对运行造成影响。

  有两种使用方式：

```typescript
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```

```typescript
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```

编译之后的结果:

```javascript
var someValue = "this is a string";
var strLength = someValue.length;
```

##### Interface

个人理解interface可以定义一个具有某种特定结构的对象类型。

demo：

```typescript
interface LabelledValue {
    label: string;
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```

编译结果：

```javascript
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
var myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

```

可以看到，`myObj`中存在两个属性，而interface中只定义了需要的那一个，编译能够正常进行，无报错。

另一个demo，将size的类型也加以限定，而在printLabel 中并不使用`labelledObj.size`

```typescript
interface LabelledValue {
    size: number;
    label: string;
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
  //  console.log(labelledObj.size);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);

```

编译结果与上面的一致，如果将interface中的size去掉，将printLabel第二行取消注释则会报错。

```shell
greeter.ts:7:29 - error TS2339: Property 'size' does not exist on type 'LabelledValue'.
console.log(labelledObj.size)
```

- interface 可以配置Optional、Readonly属性，还可以使用对象结构传参以及变量属性名。















