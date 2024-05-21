
self.addEventListener('message', async function(e) {
  console.log('message', self);
  const clients = await self.clients.matchAll()
  clients.forEach((client) => {
    client.postMessage(e.data)
  })
})

self.addEventListener('activate', function(e) {
  console.log('activate', e);
})