import { conf } from "../types/conf.types"
import WebSocket from 'ws'



export class ReadinessController {
    public static setReadiness(isReady: boolean, config: conf){
        config.isSelfReady = isReady
        // call the other for say ready
        const completeIp = `ws://192.168.34.${config.ip}`
        const pairWs = new WebSocket(`${completeIp}:4000`)

        pairWs.on('open', () => {
            pairWs.send(JSON.stringify({ route: 'other-ready', data: true }))
           
        })
        
        pairWs.on('message', (data: any) => {
            console.log(`Received message from other server: ${data}`)
        })
    
        pairWs.on('close', () => {
            console.log('Connection to the other WebSocket server closed')
        })
    
        pairWs.on('error', (error: { message: any; }) => {
            console.error('WebSocket error:', error.message)
        })

    }
    public static setOtherReady(isOtherReady: boolean, config: conf){
        config.isOtherReady = isOtherReady 
    }
}