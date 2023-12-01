import WebSocket from 'ws'

export class IpController {
    public static connectToIp(ip: number) {
        const completeIp = `ws://192.168.34.${ip}`
        this.ping(completeIp)
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
            console.log('Connected to the other WebSocket server')
    
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
