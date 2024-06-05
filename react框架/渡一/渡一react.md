1.setState同步异步？开发时始终当作异步 2-9-10
2.如果要同步调用多次呢？最佳实践？2-9-20

--生命周期 旧版
3.把 <A />一个类组件当作new A()，生命周期是这个实例对象而不是类本身
4.componentWillMount会运行多次的bug？后来就没有这个了。
5.render？componentDidMount？ajax请求在哪？
6.componentWillReceiveProps？不推荐
7.shouldComponentUpdate？性能优化？
8.componentWillUpdate?componentDidUpdate?
9.componentWillUnmount?
    --新版
加了getSnapshotBeforeUpdate、
去掉componentWillReceiveProps等

1.高阶组件-练习
2.ref？ref转发？高阶组件中ref问题？
3.context？会让组件不纯粹，因为之前只依赖props？用了上下文不会执行shouldComponentUpdate，是直接渲染？怎么性能优化？3-8-60
4.PureComponent优化重新渲染
5.renderProps复用？
6.react的事件？事件冒泡和真实的冒泡？合成事件对象？

**卸载更新**
更新子节点3-15(2)-1:38、
切换一个节点的显示隐藏优化1:52

**动画**
基础-动画1
css transition动画 两个元素同时淡入淡出可以使用-动画2
SwitchTransition 有秩序的切换（不同时）-动画3

**react全家桶**
1.react：处理ui变化
2.react-router：根据地址匹配路由，展示不同组件
3.redux：处理数据以及数据的变化（主要是处理共享数据）