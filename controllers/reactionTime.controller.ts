import { conf } from "../types/conf.types"
import { times } from "../types/timer.types"
import { winner } from "../types/winner.types"
import WebSocket from 'ws'

export class ReactionTimeController {
    public static computeWinner(userShotTime: number, config: conf): winner{
        const completeIp = `ws://192.168.34.${config.ip}`
        const pairWs = new WebSocket(`${completeIp}:4000`)
        const results: winner = {
            self: false,
            adversary: false
        }
        pairWs.on('open', () => {
            pairWs.send(JSON.stringify({ route: 'get-shot-time', data: '' }))
           
        })
        
        pairWs.on('message', (message) => {
            console.log(`Received message from other server: ${message}`)
            const parsedMessage = JSON.parse(message.toString())
            userShotTime < parsedMessage.shotTime ? 
            results.self = true : results.adversary = true
        })
    
        pairWs.on('error', (error) => {
            console.error('WebSocket error:', error.message)
        })

        return results
        // send to front ws
    }
    public static getShotTime(timer: times, config: conf){
        const completeIp = `ws://192.168.34.${config.ip}`
        const pairWs = new WebSocket(`${completeIp}:4000`)
        const results: winner = {
            self: false,
            adversary: false
        }
        pairWs.on('open', () => {
            pairWs.send(JSON.stringify({ route: 'get-shot-time', data: '' }))
           
        })
        
        pairWs.on('message', (message) => {
            console.log(`Received message from other server: ${message}`)
        })
    
        pairWs.on('error', (error) => {
            console.error('WebSocket error:', error.message)
        })
    }
}