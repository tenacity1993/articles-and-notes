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
