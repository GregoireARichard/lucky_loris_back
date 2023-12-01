import WebSocket from 'ws'

export class IpController {
    public static connectToIp(ip: number) {
        const completeIp = `192.168.34.${ip}`
        const ws = new WebSocket(completeIp)
        
        ws.on('open', () => {
            console.log(`Connected to ${completeIp}`)
            // must send json
            // call ping
            ws.send(JSON.stringify({ route: 'Ping', data: 'Ping' }))
        })

        ws.on('message', (data) => {
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
    public static ping(completeIp: string){
        const ws = new WebSocket(completeIp)
        ws.on('open', () => {
            console.log(`Connected to ${completeIp}`)
            ws.send(JSON.stringify({ route: 'Ping', data: 'Ping' }))
        })
        ws.on('error', (error) => {
            console.error(`WebSocket error: ${error.message}`)
        })
    }
}
