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
      inputMsg: 'hello',
      list: [123]
    }
    // this.handleInput = this.handleInput.bind(this)
  }

  // handleInput = (val) => {
  //   console.log(this)
  //   this.setState({
  //     inputMsg: val.target.value
  //   })
  // }

  handleInput = function (val){
    console.log(this)
    // this.setState({
    //   inputMsg: val.target.value
    // })
  }
  
  // handleInput(val) {
  //   console.log(val.target)
  //   console.log(this)
  //   this.setState({
  //     inputMsg: val.target.value
  //   })
  // }

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
        <input type="text" value={this.state.inputMsg} onChange={this.handleInput}/>
        <button onClick={this.handleSubmit}>提交</button>
      </div>
    )
  }
}

