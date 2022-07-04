import { getBitBuffers } from './main.js'

const
	IS_LITTLE_ENDIAN = isLittleEndian(),
	rgbaValue = IS_LITTLE_ENDIAN ? ([r, g, b, a=255]) => ((a<<24) | (b<<16) | (g<<8) | r) :	([r, g, b, a=255]) => ((r<<24) | (g<<16) | (b<<8) | a),
	rgbaSplit = IS_LITTLE_ENDIAN ? pv => [pv & 255, pv>>8 & 255, pv>>16 & 255, pv>>24 & 255] : pv => [pv>>24 & 255, pv>>16 & 255, pv>>8 & 255, pv & 255]


function isLittleEndian() {
	// Determine whether Uint32 is little - or big-endian.
	let {raw, buf32} = getBitBuffers(new ArrayBuffer(8))
	buf32[1] = 0x0a0b0c0d
	return !(raw[4] === 0x0a && raw[5] === 0x0b && raw[6] === 0x0c &&
		raw[7] === 0x0d)
}


export {
	rgbaValue,
	rgbaSplit
}