import WebSocket from 'ws'
import { IpController } from './controllers/ip.controller'

const PORT = 4000

const wss = new WebSocket.Server({ port: PORT })
type conf = {
    ip: number
    connected: boolean
}
const config: conf = {
    ip: 0,
    connected: false

}
wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected')
  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message.toString())
    // router
    try {
      switch (parsedMessage.route) {
        case 'ip':
            if(!isNaN(parsedMessage.data)) {
                config.ip = parsedMessage.data
                IpController.connectToIp(config.ip)
            }
            // ipcontroller
          console.log(`Sending message: ${parsedMessage.data}`)
          break
        case 'ping':
            if(!config.connected && IpController.isPinged(parsedMessage.data)){
                IpController.ping(`192.168.34.${config.ip}`)
                config.connected = true
            }
            // IpController.ping
            break
        case 'shot':
            // shot controller
            break
        case 'reaction-time':
            break
        default:
          console.log('Unknown route')
      }
    } catch (error) {
      console.error('Error parsing message:', error)
    }
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })

  ws.on('error', (err: Error) => {
    console.error(`WebSocket error: ${err.message}`)
  })
})

console.log(`WebSocket server started on port ${PORT}`)
