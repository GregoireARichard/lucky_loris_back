import { createSocket, Socket } from "dgram"

export class LightController {
    public static switchLight(colors: number[]){
        if(colors.length > 3){
            console.log("to many values")
            return
        }
        const client: Socket = createSocket("udp4")

        // Art-Net packet header
        const header: Buffer = Buffer.from("Art-Net\0")
        const opCode: Buffer = Buffer.from([0x00, 0x50]) // OpOutput / OpDmx
        const protocolVersion: Buffer = Buffer.from([0x00, 0x0e])
        const sequence: Buffer = Buffer.from([0x00]) // or increment for each packet
        const physical: Buffer = Buffer.from([0x00])
        const universe: Buffer = Buffer.from([0x00, 0x00]) // Subnet and Universe
        const length: Buffer = Buffer.from([0x00, 0x03]) // Length of DMX data

        // RGB values
        const rgbData: Uint8Array = new Uint8Array(colors)
        let intensityFactor: number = 1 // Replace with actual RGB values


        // Reduce intensity based on the factor
        const reducedIntensityRgbData: Uint8Array = new Uint8Array(
            Array.from(rgbData).map(value => Math.round(value * intensityFactor))
        )
        const reducedIntensityBuffer: Buffer = Buffer.from(reducedIntensityRgbData)

        // Combine all parts of the packet
        const packet: Buffer = Buffer.concat([
        header,
        opCode,
        protocolVersion,
        sequence,
        physical,
        universe,
        length,
        reducedIntensityBuffer,
        ])

        // Replace with the target IP address and port
        const targetIP: string = "192.168.34.12"
        const port: number = 6454

        client.send(packet, port, targetIP, (error: Error | null) => {
        if (error) {
            console.error(error)
            client.close()
        } else {
            console.log("Data sent!")
            client.close()
        }
        })

    }
}
