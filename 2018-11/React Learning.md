##### pure component

```jsx
class ele extends React.PureComponent{
    render() {
        //return<div>hello</div>
        return <div>{this.props.message}</div>
    }
}
```

