# 2018-08-14 learning about work

begin：2018-08-13

step 1 熟悉react 写法

step 2 mobx 了解&使用

step 3 thrift接口调用过程



## React&JavaScript

#### propsType

[propsType官方文档](https://www.npmjs.com/package/prop-types)

react可以在引入`prop-types`，配置propsTypes属性之后进行类型检查。

可以将属性声明为JS原生类型、React元素、某个类的实例，指定类型的对象等，也可以自定义，可以加上isRequired后缀，如果没有提供该信息，会打印警告。

还可以通过配置`defaultProps`，为props定义默认值。

#### props.children

[react children](https://github.com/ybning/blog/issues/19)

```jsx
class Grid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      // 可以在这里控制子元素是否显示
       <div>{this.props.children}</div>
      // 只显示hello文本，并不显示子元素
      // <div>hello</div>
    )
  }
}
const Row = ({ name }) => {
  return (
    <div>{name}</div>
  )
}

ReactDom.render(
  <Grid>
    <Row name={1} />
    <Row name={2} />
    <Row name={3} />
  </Grid>,
  document.getElementById('root')
)
```

#### es6 static methods



## React & MobX

#### 介绍&功能

mobx是一个状态管理器，下图是官网的原理图，看上去感觉跟Vue的双向数据绑定很相似。

![mobx](https://ws4.sinaimg.cn/large/0069RVTdly1fu8bh5aepsj31330df0uv.jpg)

通过action来修改组件状态，由于数据与视图双向绑定，一旦数据改变，会触发视图的更新，从而引起组件或者页面的重新渲染。

mobx的computed与vue的计算属性也有类似，都设置了缓存，依赖项没有发生变化的时候，该属性不会重新运行计算，只有在真正需要更新的时候才会更新。设置了computed的方法与普通方法的区别，也类似于vue的computed与method的区别。

感觉简单而言，从视图更新的过程来看，可以抽象成三个部分：action、state、views，mobx单项数据流，可以有下图的描述：

![简单描述](https://ws2.sinaimg.cn/large/006tNbRwgy1fu8bu8jtjzj30gc020t8o.jpg)

我觉得，State如果类比于MVVM的话，可以理解为ViewModel。

从开发者的角度来看：

![开发者角度](https://ws2.sinaimg.cn/large/006tNbRwgy1fu8byg2aetj30gc01udft.jpg)

#### 本地搭建环境

本地需要搭建一个react-app环境并添加mobx等相关依赖。

step:

1. `create-react-app  my-react-app ` 使用命令行工具创建新的react-app，并进入项目目录

   （本地需先使用`npm install -g create-react-app` 命令安装工具）

2.  安装babel等

   `npm install --save-dev babel-core babel-cli babel-preset-env babel-preset-react`

3. 创建&编写`.babelrc`文件

   （这里的`plugins`如果不写也可以，关于支持ES7装饰器的配置问题，后面会再讲）

   ```json
   {
       "presets": [
           "env",
           "react",
           "stage-1",
           "es2015"
       ],
       "plugins": [
           "transform-decorators-legacy",
           "transform-decorators"
       ]
   }
   ```

4. 安装其他依赖，包括`style-loader`、`babel-loader`、`css-loader`等等。

   这里我开始手动安装了`webpack`，然后安装`webpack`的时候，没有指定版本号，默认会安装最新版本Webpack4，运行时会报下面错误：

   `Cannot read property 'thisCompilation' of undefined during npm run build`

   参考这里的[解决方式](https://github.com/facebook/create-react-app/issues/4076#issuecomment-374945938)

   > To solve this problem:
   >
   > - Delete `node_modules`
   > - Delete `package-lock.json` if present
   > - If you have `react-scripts` in `package.json`, make sure you *don't* have `webpack` in it
   > - Run `yarn` (or `npm install`)
   > - Also make sure you don't have `package.json` or `node_modules` in the parent folders of your project

   另一种方式是webpack降级到3。可以理解成webpack4与react-scripts不能同时在package.json中存在。

   查找资料的时候发现，如果使用`Create React App`的话，其实是不需要手动再去安装Webpack的。

   最后我删除了`node_modules`，然后`package.json`中删除了`webpack`，重新`npm install`或者`yarn`一下，问题解决了。

5. 配置装饰器语法支持。

   安装`babel-plugin-transform-decorators`、 ` babel-plugin-transform-decorators-legacy`等相关依赖。

   实际情况是，依赖装完，`.babelrc`文件中也配置了插件，webpack也配置完成之后，仍然无法识别装饰器语法，最后按照[参考](https://segmentfault.com/q/1010000010491983)中的方法2解决了。但是这种方法需要在`node_modules`中修改，个人觉得不大好，暂时先这样处理下，后续再查看下。具体位置如下：

   ![image-20180911195011223](/var/folders/bl/mgxkhnjn1qx03zk2rrw3r96w0000gn/T/abnerworks.Typora/image-20180911195011223.png)

6. 通过`npm run start`启动项目，进行后续操作。

#### 核心概念 & 使用

[参考文档](https://cn.mobx.js.org/) 

参考学习了 [egghead.io课程](https://egghead.io/courses/manage-complex-state-in-react-apps-with-mobx)

入门demo：

```jsx
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Component } from 'react';
import React from "react";
import ReactDOM from "react-dom";

const appState = observable({
  count: 0
})
// 这里不能写成剪头函数 否则数据绑定会失效
appState.increment = function () {
  this.count++;
}
appState.decrement = function () {
  this.count--;
}

@observer class Counter extends Component {
  render() {
    return (
      <div>
        Counter {this.props.store.count} <br />
        <button onClick={this.handleInc}> + </button>
        <button onClick={this.handleDec}> - </button>
      </div>
    )
  }

  handleInc = () => {
    this.props.store.increment()
  }

  handleDec = () => {
    this.props.store.decrement()
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Counter store={appState} />, rootElement);
```

##### Observable state(可观察的状态)

mobx使用ES7装饰器语法（可选使用）通过给现有属性增加`@observable `注解，就可以将属性设定为可观察的属性。使用装饰器属性可以使得书写代码更加简洁.

也可以写成这样

```jsx
 class appState {
   @observable count = 0;
   increment = function () {
     this.count++;
   }
   decrement = function () {
     this.count--;
   }
 }
 ......
 ReactDOM.render(<Counter store={new appState()} />, rootElement);

```

不过有个疑惑，下图方法1使用const定义是出于什么目的，官方文档的demo中也有很多是使用const定义的。

如果像下图方法二这样书写，是否有意义？count值也会改变，appState定义为const，其中内容是可以被改变的，如何控制不被改变？实际中是否会有这种情况？

```jsx
//1. 这里写成const是什么意义？
const appState = observable({
  count: 0
}) 

//2. 这样写是否有意义？const？
 const appState =  {
   @observable count: 0
 }
```

#####  Computed values

使用@computed 修饰getter方法，计算值延迟更新，只有依赖改变，需要重新计算的时候才会更新。

#####  Reactions(反应)

1. 可以通过@observer将无状态组件变成响应式组件， MobX 会确保组件总是在需要的时重新渲染。

   只要需要在状态发生改变时需要更新视图的view上使用@observer修饰，就可以实现自动更新。

2.  自定义 reactions

##### Actions

actions执行状态的改变。

[文档](https://cn.mobx.js.org/intro/concepts.html)中有这么一段，个人觉得所有衍生同步更新，计算值延迟更新，这两句似乎有些矛盾，这里的所有衍生是否指的是reactions或者action后出发的事件？意思是说不能用计算值来改变状态，而是状态改变之后计算值一定已经变化？有点拗口。。。这里的同步更新和延迟更新到底指的是什么，感觉只能后面有时间看下源码才能了解了

>  当**状态**改变时，所有**衍生**（**任何** 源自**状态**并且不会再有任何进一步的相互作用的东西就是衍生 ）都会进行**原子级的自动**更新。因此永远不可能观察到中间值。
>
> 所有**衍生**默认都是**同步**更新。这意味着例如**动作**可以在改变**状态**之后直接可以安全地检查计算值。
>
> **计算值** 是**延迟**更新的。任何不在使用状态的计算值将不会更新，直到需要它进行副作用（I / O）操作时。 如果视图不再使用，那么它会自动被垃圾回收。
>
> 所有的**计算值**都应该是**纯净**的。它们不应该用来改变**状态**。

#### 其他注意

##### observable 相关

1.   通过 `observable` 传递对象时，后添加到对象的属性无法自动变成可观察的状态

   这点有点类似于Vue中的对象数据绑定，如果在最开始定义的时候没有定义某个属性，后面再添加时将无法监控到这个属性的变化，可以使用`vue.set`来使得操作生效。

> 当使对象转变成 observable 时，需要记住一些事情:
>
> - 当通过 `observable` 传递对象时，只有在把对象转变 observable 时存在的属性才会是可观察的。 稍后添加到对象的属性不会变为可观察的，除非使用 [`set`](https://cn.mobx.js.org/refguide/object-api.html) 或 [`extendObservable`](https://cn.mobx.js.org/refguide/extend-observable.html)。

2. `Array.isArray(observable([]))`返回值为`false`

>  `observable.array` 会创建一个人造数组(类数组对象)来代替真正的数组。 实际上，这些数组能像原生数组一样很好的工作，并且支持所有的原生方法，包括从索引的分配到包含数组长度。
>
> 请记住无论如何 `Array.isArray(observable([]))` 都将返回 `false` ，所以无论何时当你需要传递 observable 数组到外部库时，通过使用 `array.slice()` **在 observable 数组传递给外部库或者内置方法前创建一份浅拷贝**(无论如何这都是最佳实践)总会是一个好主意。 换句话说，`Array.isArray(observable([]).slice())` 会返回 `true`。

3. Array的sort&reverse方法会修改原数组，observableArray则不会

> 不同于 `sort` 和 `reverse` 函数的内置实现，observableArray.sort 和 observableArray.reverse 不会改变数组本身，而只是返回一个排序过/反转过的拷贝。

##### computed

1. computed&autorun并不一样。

   二者都是响应式调用的衍生，但是computed可以理解为一个纯函数（即调用时刻的输出只由该时刻的输入决定，而不依赖于系统状态），如果使用过程中依赖没有被修改，则不会重新计算。autorun的使用场景更像是产生效果，例如对数据进行过滤操作（而不是产生数据），或者数据监控到数据变化之后的通知等副作用操作（这点与vue中的method并不一样，不要混淆）。

   > 如果你想响应式的产生一个可以被其它 observer 使用的**值**，请使用 `@computed`，如果你不想产生一个新值，而想要达到一个**效果**，请使用 `autorun`。 举例来说，效果是像打印日志、发起网络请求等这样命令式的副作用。

2. 可以通过将computed作为一个函数，来获取在box中的计算值（即基本数据类型值）

3. 错误处理

   > 如果计算值在其计算期间抛出异常，则此异常将捕获并在读取其值时重新抛出。 强烈建议始终抛出“错误”，以便保留原始堆栈跟踪。抛出异常不会中断跟踪，所有计算值可以从异常中恢复。

   ```jsx
   const x = observable(3)
   const y = observable(1)
   const divided = computed(() => {
       if (y.get() === 0)
           throw new Error("Division by zero")
       return x.get() / y.get()
   })
   
   divided.get() // 返回 3
   
   y.set(0) // OK
   divided.get() // 报错: Division by zero
   divided.get() // 报错: Division by zero
   
   y.set(2)
   divided.get() // 已恢复; 返回 1.5
   ```

##### autorun

1. autorun函数具有响应式功能，但是该函数不具有观察者。
2. autorun函数会立即触发，然后每次依赖关系发生改变时会再次触发。computed创建的函数，只有当它有自己的观察者时才会重新计算。

##### observer

1. 简单来说: *所有渲染 observable 数据的组件*都需要使用@observer

2. 在 reaction 中使用的特定 props 一定要间接引用(例如 `const myProp = props.myProp`)。不然，如果你在 reaction 中引用了 `props.myProp`，那么 props 的**任何**改变都会导致 reaction 的重新运行。

3. MobX 追踪属性访问，而不是值，可以理解为追踪的是引用，当引用的内存空间发生变化时触发响应行为，如果只是内存空间中的值发生变化，是不会被追踪的。

4. 陷阱

   ```jsx
   const message = observable({ title: "hello" })
   autorun(() => {
       // 错误
       console.log(message)
       // 正确
       console.log(message.title)
   })
   
   // 不会触发重新运行
   message.title = "Hello world"
   ```

   其他解决方案：

   ```jsx
   autorun(() => {
       console.log(message.title) // 很显然， 使用了 `.title` observable
   })
   autorun(() => {
       console.log(mobx.toJS(message)) // toJS 创建了深克隆，从而读取消息
   })
   autorun(() => {
       console.log({...message}) // 创建了浅克隆，在此过程中也使用了 `.title`
   })
   autorun(() => {
       console.log(JSON.stringify(message)) // 读取整个结构
   })
   ```

##### action

1. 对于修改状态的函数使用@action

2. `runInAction` 是个简单的工具函数，它接收代码块并在(异步的)动作中执行。

3. 仔细了解了异步[Action这一部分](https://cn.mobx.js.org/best/actions.html)，注意书写方式。


#### 练习Demo

今天使用react+mobx 写了个todolist的demo，目前实现了添加和删除的功能。熟悉一下开发方式和书写方式。

[地址](https://github.com/tenacity1993/articles-and-notes/tree/master/2018-8/demos/my-react-app)

![demo](https://ws4.sinaimg.cn/large/0069RVTdgy1fubcp0osi5j30kq0myjsm.jpg)

主要代码：

```jsx
import React, { Component } from 'react'
import { observable, computed, observe, action } from 'mobx';
import ReactDOM from 'react-dom';
import { inject, Provider, observer } from 'mobx-react'
import './index.css';
import { debug } from 'util';


class Todo {
  constructor(content) {
    this.content = content
  }
  id = Math.random()
  @observable content
  @observable completed = false
}

class TodoListStore {
  @observable todos = []

  @computed get todosLength() {
    return this.todos.length
  }

  @computed get completedLength() {
    return this.todos.filter(item => item.completed).length
  }

  @computed get uncompletedLength() {
    return this.todosLength - this.completedLength
  }

  @action
  addTodo(todo) {
    this.todos.push(todo)
  }

  @action
  deleteTodo(index) {
    this.todos.splice(index, 1)
    // console.log(e)
  }
}

// const TodoItem = observer(({ todo }) => (
//   <li>
//     <input
//       type="checkbox"
//       checked={todo.completed}
//       onClick={() => (todo.completed = !todo.completed)}
//     />
//     {todo.content}
//     <button onClick={}>X</button>
//   </li>
// ));

@observer
class TodoItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {todo, index} = this.props
    return (
      <li>
        <input
          type="checkbox"
          checked={todo.completed}
          onClick={() => (todo.completed = !todo.completed)}
        />
        {todo.content}
        <button onClick={this.props.del.bind(this)}>X</button>
      </li>
    )
  }
}


@observer
class TodoInput extends Component {
  constructor(props) {
    super(props)
    this.state = new Todo()
  }

  addTodo() {
    let content = this.refs.content.value
    let item = new Todo(content)
    this.props.store.addTodo(item)
    console.log(this.props.store.todos)
    this.refs.content.value = ''
  }

  render() {
    return (
      <div>
        新增todo：
        <input className="todo-input-box" type="text" ref="content" placeholder="add something"></input>
        <button onClick={this.addTodo.bind(this)}>Add</button>
      </div>
    )
  }
}

@observer
class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: this.props.store.todos,
      index: -1
    }
  }

  delete(index) {
    this.props.store.deleteTodo(index)
  }
  
  render() {
    // let todos = [...this.props.store.todos]
    return (
      <div>
        事项清单：
        <ul>
          {this.state.todos.map((todo, index) => (
            <TodoItem todo={todo} key={todo.id} index={index} del={()=>this.delete(index)}/>
          )
          )}
        </ul>
      </div>
    )
  }
}

@observer
class TodoArchive extends Component {
  render() {
    let store = this.props.store
    return (
      <div className="archieve">
        <span className="archieve-item">总计：{store.todosLength}项</span>
        <span className="archieve-item">已完成：{store.completedLength}项</span>
        <span className="archieve-item">未完成：{store.uncompletedLength}项</span>
      </div>
    )
  }
}

class TodoListView extends Component {
  render() {
    let store = this.props.store
    return (
      <div className="list-view">
        <TodoInput store={store} />
        <TodoList store={store} />
        <TodoArchive store={store} />
      </div>
    )
  }
}

let todolist = new TodoListStore()

ReactDOM.render(<TodoListView  store={todolist} />, document.getElementById('root'));

```

