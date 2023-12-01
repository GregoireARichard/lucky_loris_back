import WebSocket from 'ws'

export class IpController {
    public static connectToIp(ip: number, ws: WebSocket) {
        const completeIp = `ws://192.168.34.${ip}`
        this.ping(completeIp, ws)
        ws.on('open', () => {
            console.log(`sent ping ${completeIp}`)
            // must send json
            // call ping
            this.ping(completeIp, ws)
           // ws.send(JSON.stringify({ route: 'Ping', data: 'Ping' }))
        })

        ws.on('message', (data) => {
            this.ping(completeIp, ws)
            console.log(`pong ${completeIp}`)
        })

        ws.on('close', () => {
            console.log(`Disconnected from ${completeIp}`)
        })

        ws.on('error', (error) => {
            console.error(`WebSocket error: ${error.message}`)
        })
    }
    public static isPinged(message: string): boolean{
        if(message === "ping") {
            return true
        }
        return false
    }
    public static ping(completeIp: string, ws: WebSocket){
       
        ws.on('open', () => {
            console.log(`Connected to ${completeIp}`)
            ws.send(JSON.stringify({ route: 'Ping', data: 'Ping' }))
        })
        ws.on('error', (error) => {
            console.error(`WebSocket error: ${error.message}`)
        })
    }
}
