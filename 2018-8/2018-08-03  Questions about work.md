# 2018-08-03 Questions about work

这几天开发的时候遇到了个问题，如图1。

由于页面并没有进行整体缩放，导致在小屏幕手机上显示会有异常。PM要求能够显示最后一个完整的标签。

当在iPhone5手机上查看页面的时候，由于设置了`height`以及`overflow:hidden`后面的标签被隐藏了。但是边框是用before伪元素实现的，并没有因为`overflow:hidden` 而一起隐藏（后面再探讨这种边框的不同实现方式）。

![图1](https://ws4.sinaimg.cn/large/006tNc79gy1ftwptv30vnj30hy0683z8.jpg)

搜索解决方式时一直关注的是`overflow:hidden`失效，而没有想过是因为使用了`transform`的影响。

网上搜到了一种解决方式：

> 在父元素上添加：transform-style:preserve-3d 

试了下，果然好了，然而。。。换个手机，换个浏览器就不行了。这个属性存在兼容性问题。

那既然跟`transform`有关，试一下`transform:translateZ(0)`，发现问题解决了，试了多个手机和浏览器，没有兼容性的问题。

下面我们来看下这几个属性并探究一下原因～



1. 关于overflow的问题 还有border的问题

