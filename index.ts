import WebSocket from 'ws'
import { IpController } from './controllers/ip.controller'
import { ReadinessController } from './controllers/readiness.controller'
import { conf } from './types/conf.types'
import { LightController } from './controllers/light.controller'
import { times } from './types/timer.types'
import { ReactionTimeController } from './controllers/reactionTime.controller'

const PORT = 4000

const wss = new WebSocket.Server({ host: process.env.IP, port: PORT })

const config: conf = {
    ip: 0,
    connected: false,
    isSelfReady: false,
    isOtherReady: false

}
const timer: times = {
  self: 0,
  adversary: 0
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
                //set is connected
                IpController.connectToIp(config.ip, config)
                console.log(`receiving: ${parsedMessage.data}`)
            }
            else{
              console.log("couldn't parse data")
            }
          
          break
        case 'ping':
          console.log("pinged!")
            if(!config.connected && IpController.isPinged(parsedMessage.data)){
               const isPinged = IpController.ping(`192.168.34.${config.ip}`)
               console.log(isPinged)
            }
            // IpController.ping
            break
        case 'readiness':
          ReadinessController.setReadiness(parsedMessage.data, config)
          console.log(config)

          break
        case 'other-ready':
          ReadinessController.setOtherReady(parsedMessage.data, config)
          console.log(config)
          config.isSelfReady && config.isOtherReady ? LightController.switchLight([0, 100, 0]) : ""
          break
        case 'reaction-time':
          const winner = ReactionTimeController.computeWinner(parsedMessage.data, config)
          timer.self = parsedMessage.data
          winner.self ? ws.send("winner") : ws.send("loser")
          
            break
        case 'get-shot-time':
            ReactionTimeController.getShotTime(timer, config)
            ws.send(timer.self)
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
