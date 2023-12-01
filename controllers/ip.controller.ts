import WebSocket from 'ws'
import { conf } from '../types/conf.types'


export class IpController {
    public static connectToIp(ip: number, config: conf) {
        const completeIp = `ws://192.168.34.${ip}`
        try {
            this.ping(completeIp)
            config.connected = true
            console.log(config)
        } catch (error) {
            console.log(error)
        }
        
        console.log("i pinged:", completeIp)
    }
    public static isPinged(message: string): boolean{
        if(message === "ping") {
            return true
        }
        return false
    }
    public static ping(completeIp: string){
        const pairWs = new WebSocket(`${completeIp}:4000`)

        pairWs.on('open', () => {
            pairWs.send(JSON.stringify({ route: 'ping', data: '🎅🏻' }))
           
        })
        
        pairWs.on('message', (data) => {
            console.log(`Received message from other server: ${data}`)
        })
    
        pairWs.on('close', () => {
            console.log('Connection to the other WebSocket server closed')
        })
    
        pairWs.on('error', (error) => {
            console.error('WebSocket error:', error.message)
        })
    }
}
