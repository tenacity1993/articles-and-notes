# 2018-08-07 Question about work

开发过程中遇到问题，简单写个[demo](https://github.com/tenacity1993/articles-and-notes/blob/master/2018-8/demos/about-a-click-invalid.html)   运行环境为Chrome 68

描述一下这个问题，当`<a>`标签内部存在嵌套时， 父元素`<a>`标签的`href`默认行为以及子元素绑定的click事件的响应之间存在影响。页面结构：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>a标签内部点击事件失效</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .father {
            display: block;
            width: 500px;
            height: 200px;
            background-color: rgb(210, 111, 30);
        }

        .child-one {
            display: block;
            width: 200px;
            height: 50px;
            background-color: rgb(174, 43, 226);
        }

        .child-two {
            display: block;
            width: 200px;
            height: 50px;
            background-color: rgb(43, 226, 67);
        }

        .child-three {
            display: block;
            width: 200px;
            height: 50px;
            background-color: rgb(43, 137, 226);
        }
    </style>
</head>

<body>
    <a class="father" href="father" onclick="alert(111)">父标签
        <span class="child-one">
            子标签1
        </span>
        <object>
            <a class="child-two" href="child-two">
                子标签2
            </a>
        </object>
        <object>
            <a class="child-three" href="javascript:alert('href:child-three')">
                子标签3
            </a>
        </object>
    </a>
    <script>    
        let father = document.querySelector('.father');
        let ele1 = document.querySelector('.child-one');
        let ele2 = document.querySelector('.child-two');
        let ele3 = document.querySelector('.child-three');

        ele1.addEventListener('click', function (e) {
            e.stopPropagation();
            // e.preventDefault();
            alert('click child-one')
            window.location.href = 'child-one'
        }, false)

        ele2.addEventListener('click', function (e) {
            e.stopPropagation();
            alert('click child-two')
            // window.location.href='child-two'
        }, false)

        ele3.addEventListener('click', function (e) {
            alert('click child-three')
            window.location.href = 'child-three'
        }, false)

        father.addEventListener('click', function (e) {
            alert('click father')
            window.location.href = 'father'
        }, false)

    </script>
</body>

</html>
```

示例如下图(如果a标签嵌套，浏览器解析错误，所以用object标签包裹了一层)。

![图1](https://ws1.sinaimg.cn/large/0069RVTdgy1fu1bhd9p2lj30l40di0th.jpg)

### 执行操作：

1. 当点击父标签时，先弹出111，然后跳转父标签的href链接。

   说明onclick执行先于href

2. 当点击child-one时，执行元素绑定的click事件，会弹出alert，但是location仍然跳转到了father。

   阻止冒泡后，执行结果仍然不符合预期。添加`preventDefault`之后，执行了子元素自己的跳转。

3. 当点击child-two时，弹出响应信息，然后会跳转href的链接。

4. 当点击child-three时，先弹出`click child-three`，然后是`href child-three`，说明click事件先于href执行。

上面4个操作除了2之外都很好理解，2中，为什么已经在阻止了事件冒泡之后，仍然执行了父元素中`href`的跳转。

### 思考：

首先可以肯定的是，事件冒泡确实被阻止了，因为父元素的`onclick`并没有执行，所以猜测，`<a>`标签的默认行为是无法通过取消冒泡来阻止的，就算事件没有冒泡到父元素，子元素在父元素`<a>`标签内部，仍然会执行`<a>`标签默认行为。

解决方法：

- 在子元素中添加`e.preventDefault()`阻止默认行为
- 父元素不使用`<a>`标签，使用其他标签绑定click事件且子元素阻止冒泡
- 父元素不使用href属性，直接在`<a>`标签上绑定click事件