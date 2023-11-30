import WebSocket from 'ws'

const PORT = 4000

const wss = new WebSocket.Server({ port: PORT })

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected')

  ws.on('message', (message: string) => {
    console.log(`Received: ${message}`)
    // Send a response back to the client
    ws.send('Received your message. Thanks!')
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })

  ws.on('error', (err: Error) => {
    console.error(`WebSocket error: ${err.message}`)
  })
})

console.log(`WebSocket server started on port ${PORT}`)
