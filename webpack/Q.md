1.初始化、编译具体过程？1-8
2.静态资源为什么不能导入？怎么处理的？1-13、2-5
3.css-loader做了什么？3-2-16:40
4.最佳实践，为什么前端现在没？一个css类名冲突这么多解决方案？3-5
5.css-module、css in js、BEM？3-2～3-5
6.css-module是哪个loader转换的？:global？3-5-36:00
7.postCss: 
  自动厂商前缀，兼容老版本浏览器: .browserslistrc作用? 3-8-30

8.babel，加了.babelrc文件，为什么webpack可以用呢？4-4-6:40

<!-- webpack性能优化 -->
1.主要的方面？
`构建性能`
1.减少模块解析？
  怎么减少？什么情况下可以减少？5-2
2.优化loader性能
  排除一些文件进行loader解析，怎么排除？
  缓存loader，怎么缓存？loader执行是从后到前，缓存的loader怎么阻止后面loader的执行？5-3-24
  开启多线程。怎么开启？开启后限制了那些loder？限制了什么？5-3-30
3.热替换
  module.hot是谁加入的？默认刷新是什么？5-3-14
  module.hot.accept()有什么用处？怎么做到的？5-3-16
  style怎么hmr？
`传输性能`
1.分包
  为什么要分包？什么情况下要进行分包？
  手动分包？
    资源清单是什么？有什么作用？5-5-13
  自动分包？
    为什么import('')动态加载会分包？
2.单模块体积压缩
2.1.代码压缩
2.2.tree shaking
  为什么导入了lodash的一个方法，打包后所有的都打到包里了，不是自动开启tree shaking？
  用什么原则？
  css压缩
3.懒加载
  怎么做？
  有什么问题？

打包后分析 webpack-bundle-analyzer

不确定的动态依赖 require.context

打包多页应用，怎么公用公共组件？不用框架的组件？

打包vue、react

打包node应用
打包全栈应用