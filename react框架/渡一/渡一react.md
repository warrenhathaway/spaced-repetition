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
4.