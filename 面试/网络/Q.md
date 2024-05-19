1.session?jwt?cookie?
2.缓存
  强缓存：expries、cache-control的max-age
  协商缓存：If-None-Match/ETag、If-Modified-Since/Last-Modified
  cache-control的no-catch什么意思？no-store？
3.断点续传
  下载
  上传？
4.DNS和域名？
5.https
  https中间人攻击？
  https握手过程？
6.http1.0、1.1、2.0
7.WebSocket握手？

1.cookie、storage
2.get和post有什么区别？
3.加密
  对称加密 
  非对称加密： Rsa、D-H
  摘要/哈希/散列： MD4、MD5、SHA1
4.JWT
  一种认证手段 Json Web Token
  包含 header: {
    'alg': 'HS256' // HS256对称加密 RS256非对称加密
    type: 'jwt',
  } 、payload 加密后的信息
5.跨域
  CORS
    简单请求
      请求头
        content-type都有哪些？
        Origin是什么？
      响应头
        Access-Control-Allow-Origin
    需要预检的请求
      1.发送预检请求
        请求头带了什么？
        响应头会带什么？
      2.预检请求通过后发送真实请求
    附带身份认证的请求
      fetch的credentials、xhr的withCredentials
      请求头中有cookie
      响应头中Access-Control-Allow-Credentials: true
6.文件上传
7.文件下载