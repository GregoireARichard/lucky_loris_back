const { createSocket } = require("dgram");
const client = createSocket("udp4");

// Art-Net packet header
const header = Buffer.from("Art-Net\0");
const opCode = Buffer.from([0x00, 0x50]); // OpOutput / OpDmx
const protocolVersion = Buffer.from([0x00, 0x0e]);
const sequence = Buffer.from([0x00]); // or increment for each packet
const physical = Buffer.from([0x00]);
const universe = Buffer.from([0x00, 0x00]); // Subnet and Universe
const length = Buffer.from([0x00, 0x03]); // Length of DMX data

// RGB values
const rgbData = Buffer.from([200,0,0]); // Replace with actual RGB values

let intensityFactor = 1; // Range: 0 to 1 (0 = no intensity, 1 = full intensity)

// Reduce intensity based on the factor
const reducedIntensityRgbData = rgbData.map(value => Math.round(value * intensityFactor));

// Combine all parts of the packet
const packet = Buffer.concat([
  header,
  opCode,
  protocolVersion,
  sequence,
  physical,
  universe,
  length,
  Buffer.from(reducedIntensityRgbData),

]);

// Replace with the target IP address and port
const targetIP = "192.168.34.12";
const port = 6454;

client.send(packet, port, targetIP, (error) => {
  if (error) {
    console.error(error);
    client.close();
  } else {
    console.log("Data sent!");
    client.close()
  }
});