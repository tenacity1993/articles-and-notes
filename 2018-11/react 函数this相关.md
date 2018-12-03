# react 函数this相关

在使用react的过程中，常常因为函数的this问题导致执行结果不如预期。现梳理下这块的问题，先看代码：

```jsx
import React from "react";

class MsgList extends React.PureComponent {
  render() {
    return (
      <ul>
        {this.props.list.map((item, index) => (<li key={index}>{item}</li>))}
      </ul>
    )
  }
}

export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputMsg: '',
      list: [123]
    }
  }
  
  handleInput = (val) => {
    this.setState({
      inputMsg: val.target.value
    })
  }

  handleSubmit = () => {
    const text = this.state.inputMsg
    if (text) {
      const msg = [...this.state.list, text]
      this.setState({
        inputMsg: '',
        list: msg
      })
    }
  }

  render() {
    return (
      <div>
        <MsgList list={this.state.list}/>
        <input type="text" value={this.state.inputMsg}
            onChange={this.handleInput}/>
        <button onClick={this.handleSubmit}>提交</button>
      </div>
    )
  }
}
```

示例代码实现了简单的元素添加和列表展示功能。

其中函数绑定和定义的方式如下：

```javascript
// 绑定
onChange={this.handleInput}
// 定义
handleInput = (val) => {
  this.setState({
    inputMsg: val.target.value
  })
}

```

定义函数的方式有很多种，比如：

```javascript
handleInput(val) {
  console.log(val.target)
  console.log(this)
  this.setState({
    inputMsg: val.target.value
  })
}
```

此时val.target为`<input>`元素，但是this为`undefined`，此时调用this.setState会报错。

![](https://ws1.sinaimg.cn/large/006tNbRwgy1fx9qh55lp6j314g0feqa5.jpg)

类的方法默认是不会绑定this的，所以这里丢失了函数执行的上下文。那么如果在绑定时候加上一对括号：

```jsx
<input type="text" value={this.state.inputMsg} onChange={this.handleInput()}/>

// 函数定义
handleInput(val) {
  console.log(val.target)
  console.log(this)
  this.setState({
      inputMsg: val.target.value
  })
}
```

此时添加括号，虽然绑定了上下文，但这样会导致函数在组件渲染的时候被触发，而不是等到渲染完成时通过点击触发，且无法响应onChange动作。组件在渲染过程中触发函数，函数中调用setState()会再次调用render，导致死循环。

如果在最开始使用`.bind()`为函数绑定上下文，去掉绑定函数时的括号，

```jsx
constructor(props) {
  super(props)
  this.state = {
    inputMsg: 'hello',
    list: [123]
  }
  this.handleInput = this.handleInput.bind(this)
}
```

这时功能正常。

而最开始我们定义函数时用箭头函数绑定了上下文，所以也能实现想要的功能。

除此之外，还有一种书写方式也可以正常工作，不过实际上与最开始的写法是一样的。

```jsx
<input type="text" value={this.state.inputMsg} onChange={(e)=>this.handleInput(e)}/>
```



### 小结

使用react的时候要注意this的指向，类默认是不会为方法绑定this，要么在开始的时候手动绑定this，要么可以使用箭头函数自动绑定上下文。如果不是希望在组件渲染时就触发的函数，那么绑定函数时不能加括号。



### 参考资料

[this 绑定](https://juejin.im/post/5afa6e2f6fb9a07aa2137f51)



