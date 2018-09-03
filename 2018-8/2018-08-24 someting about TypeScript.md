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

**其中`Color["Red"] = 0` 返回值为0。这个是之前没有注意过的问题**。

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

可以看到，我们传入的对象其实可以包含很多属性，但是编译器只会检查必要的属性，而忽略其他。

```shell
greeter.ts:7:29 - error TS2339: Property 'size' does not exist on type 'LabelledValue'.
console.log(labelledObj.size)
```

- interface 可以配置Optional、Readonly属性，还可以使用对象结构传参以及变量属性名。

  ```typescript
  interface SquareConfig {
    color?: string;
    width?: number;
  }
  
  interface Point {
      readonly x: number;
      readonly y: number;
  }
  ```

  其中只读属性赋值一次之后不会再被修改。

  - TS具有`ReadonlyArray<T>`类型，可以确保数组被创建后，再也不能被修改。

- interface除了可以描述带有属性的普通对象，也可以描述函数类型。

  下面这个示例，interface定义了函数参数的类型&函数返回值的类型。

  ```typescript
  interface SearchFunc {
    (source: string, subString: string): boolean;
  }
  
  let mySearch: SearchFunc;
  mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
  }
  ```

  函数参数名不需要与接口里定义的名字相匹配，TS会逐个对参数进行检查，要求对应位置上的参数类型是兼容的。

- 接口实现

  可以在接口中描述一个方法，然后在类里实现。这种方法是实例方法，编译之后是挂在prototype上的。

  接口描述了类的公共部分，不会检查类是否具有某些私有成员

  ```typescript
  interface ClockInterface {
      currentTime: Date;
      setTime(d: Date);
  }
  
  class Clock implements ClockInterface {
      currentTime: Date;
      setTime(d: Date) {
          this.currentTime = d;
      }
      constructor(h: number, m: number) { }
  }
  ```

  编译之后代码

  ```javascript
  var Clock = /** @class */ (function () {
      function Clock(h, m) {
      }
      Clock.prototype.setTime = function (d) {
          this.currentTime = d;
      };
      return Clock;
  }());
  
  ```

- interface 存在继承

##### 类

- 在构造函数里访问this属性，要先调用super()

- public&private&protected 类的成员默认是public  当被标记成private时，就不能在声明的类之外进行访问。

  protected成员在派生类中仍然可以访问。

- readonly修饰符

  使用readonly将关键字设置为只读，该属性必须在声明或者构造函数中被初始化

  ```typescript
  class Octopus {
      readonly name: string;
      readonly numberOfLegs: number = 8;
      constructor (theName: string) {
          this.name = theName;  // 要在构造函数中初始化
      }
  }
  let dad = new Octopus("Man with the 8 strong legs");
  dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.
  ```

  可以把声明和赋值合并在一处。

  ```typescript
  class Animal {
      constructor(private name: string) { }
      move(distanceInMeters: number) {
          console.log(`${this.name} moved ${distanceInMeters}m.`);
      }
  }
  ```

- 静态属性

  ```typescript
  class Grid {
      static origin = {x: 0, y: 0};
      calculateDistanceFromOrigin(point: {x: number; y: number;}) {
          let xDist = (point.x - Grid.origin.x);  //Grid.origin.x 使用Grid. 来访问静态属性
          let yDist = (point.y - Grid.origin.y);
          return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
      }
      constructor (public scale: number) { }
  }
  ```

- 抽象类

  抽象类中的抽象方法不包含具体实现，并且必须在派生类中实现。

  ```typescript
  abstract class Department {
  
      constructor(public name: string) {
      }
  
      printName(): void {
          console.log('Department name: ' + this.name);
      }
  
      abstract printMeeting(): void; // 必须在派生类中实现
  }
  class AccountingDepartment extends Department {
  
      constructor() {
          super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
      }
  
      printMeeting(): void {
          console.log('The Accounting Department meets each Monday at 10am.');
      }
  
      generateReports(): void {
          console.log('Generating accounting reports...');
      }
  }
  
  let department: Department; // 允许创建一个对抽象类型的引用
  department = new Department(); // 错误: 不能创建一个抽象类的实例
  department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
  department.printName();
  department.printMeeting();
  department.generateReports(); // 错误: 方法在声明的抽象类中不存在
  ```

  在抽象类中声明该方法，且添加abstract修饰，不会报错

##### 函数

- 可选参数必须在必须参数的后面，可以通过设置默认值，避免参数个数不一致报错。

  ```typescript
  function buildName(firstName: string, lastName?: string) {
      if (lastName)
          return firstName + " " + lastName;
      else
          return firstName;
  }
  
  let result1 = buildName("Bob");  // works correctly now
  let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
  let result3 = buildName("Bob", "Adams");  // ah, just right
  
  
  function buildName(firstName: string, lastName = "Smith") {
      return firstName + " " + lastName;
  }
  
  let result1 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
  let result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
  let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
  let result4 = buildName("Bob", "Adams");         // ah, just right
  ```

- 剩余参数

  可以把剩余参数收集到一个变量里

  ```typescript
  function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
  }
  
  let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
  ```

##### 泛型

- 实现返回值类型与传入参数的类型是相同的，不同于使用any，它不会丢失类型的信息。

  ```typescript
  function identity<T>(arg: T): T {
      return arg;
  }
  
  // 使用
  // 方式1
  let output = identity<string>("myString");  // type of output will be 'string'
  
  // 方式2  更为普遍
  let output = identity("myString");  // type of output will be 'string'
  
  ```



##### 类型兼容性

- TypeScript的类型兼容是基于结构子类型的。

  下面这个例子并不会报错，TypeScript结构化类型系统的基本规则是，如果`x`要兼容`y`，那么`y`至少具有与`x`相同的属性。这里要检查`y`是否能赋值给`x`，编译器检查`x`中的每个属性，看是否能在`y`中也找到对应属性。 在这个例子中，`y`必须包含名字是`name`的`string`类型成员。`y`满足条件，因此赋值正确。

  ```typescript
  interface Named {
      name: string;
  }
  
  let x: Named;
  // y's inferred type is { name: string; location: string; }
  let y = { name: 'Alice', location: 'Seattle' };
  x = y;
  
  // 换成 y=x 则会报错  x中并没有location属性
  ```
