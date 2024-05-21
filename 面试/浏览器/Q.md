1.渲染流程？什么时候到合成线程？什么时候交给gpu？
  渲染主线程
  预解析线程？
  script的async、defer、prefetch、proload
2.回流、重绘？
3.transform效率为什么高？

4.渲染阻塞？
  遇到script会怎样？为什么？
  遇到css有会怎样？
  Flash of Unstyled Content（FOUC）

  why？什么时候会出现画面？如果要等到js加载并执行完，那阻塞不阻塞又有什么区别？

---网页指标
  核心网页指标-Core Web Vitals
    三个方面：加载、互动、视觉稳定性
    https://web.dev/articles/vitals?hl=zh-cn
1.LCP
2.INP
3.CLS


---web worker
1.是什么？为什么出现？
2.有哪些类型？
