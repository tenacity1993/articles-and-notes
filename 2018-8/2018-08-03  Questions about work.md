# 2018-08-03 Questions about work

这几天开发的时候遇到了个问题，如图1。

写了个demo [demo 地址](https://github.com/tenacity1993/articles-and-notes/blob/master/2018-8/demos/about-overflow.html)

由于页面并没有进行整体缩放，导致在小屏幕手机上显示会有异常。PM要求能够显示最后一个完整的标签。

当在iPhone5手机上查看页面的时候，由于设置了`height`以及`overflow:hidden`后面的标签被隐藏了。但是边框是用before伪元素实现的，并没有因为`overflow:hidden` 而一起隐藏（后面再探讨这种边框的不同实现方式）。

![图1](https://ws4.sinaimg.cn/large/006tNc79gy1ftwptv30vnj30hy0683z8.jpg)

搜索解决方式时一直关注的是`overflow:hidden`失效，而没有想过是因为使用了`transform`的影响。

网上搜到了一种解决方式：

> 在父元素上添加：transform-style:preserve-3d 

试了下，果然好了，然而。。。换个手机，换个浏览器就不行了。这个属性存在兼容性问题。

那既然跟`transform`有关，试一下`transform:translateZ(0)`，发现问题解决了，试了多个手机和浏览器，没有兼容性的问题。

在解决问题的过程中，发现了另一种解决办法，在父元素上添加`position:relative`。这也就是说，是因为`overflow:hidden`失效了导致了这样的问题，而与是否使用了`transform`没有直接的关系（我把`transform`去掉，仍然有图1的问题，只能说使用`transform`可以解决问题）。

原因可以看这个文章  [overflow:hidden失效](https://www.zhangxinxu.com/wordpress/2012/02/css-overflow-hidden-visibility-hidden-disabled-use/)

从这个角度进行分析的话，因为我们的`before`伪元素使用了`absolute`绝对定位，且外层没有定位，导致了这个`before`元素没有成功被隐藏，而相应的tag元素，由于没有设置定位，所以正常隐藏了。

那为什么使用了`transform:translateZ(0)`之后，问题也能够解决呢？

参考这个文章 [transform对元素的影响](https://www.zhangxinxu.com/wordpress/2015/05/css3-transform-affect/)

> absolute绝对定位元素，如果含有overflow不为visible的父级元素，同时，该父级元素以及到该绝对定位元素之间任何嵌套元素都没有position为非static属性的声明，则overflow对该absolute元素不起作用。

这里涉及到层叠上下文的问题  可以参考 [层叠上下文](https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)

![使用transform之后的层级关系](https://ws4.sinaimg.cn/large/0069RVTdgy1fu03ie7burj31kw0j5tbc.jpg)



当使用`transform:translateZ(0)`时，生成了新的层，覆盖在了上面。



## 补充

有的手机使用了transform之后仍然会出现上述问题，所以，更好的解决方式应该是设置position