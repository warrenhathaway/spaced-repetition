let res = ''

onconnect = function (e) {
  const port = e.ports[0];

  port.onmessage = function (e) {
    if(e.data === 'get') {
      port.postMessage(res)
      res = "";
    } else {
      res = e.data
    }
  };
}