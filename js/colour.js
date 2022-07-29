import { getBitBuffers, defaultScreen } from './main.js'

const
	IS_LITTLE_ENDIAN = isLittleEndian(),
	rgbaValue = IS_LITTLE_ENDIAN ? ([r, g, b, a=255]) => ((a<<24) | (b<<16) | (g<<8) | r) :	([r, g, b, a=255]) => ((r<<24) | (g<<16) | (b<<8) | a),
	rgbaSplit = IS_LITTLE_ENDIAN ? pv => [pv & 255, pv>>8 & 255, pv>>16 & 255, pv>>24 & 255] : pv => [pv>>24 & 255, pv>>16 & 255, pv>>8 & 255, pv & 255]

const PALETTES = {
	'default': [
		[0, 0, 0],
		[0, 0, 0xaa],
		[0, 0xaa, 0],
		[0, 0xaa, 0xaa],
		[0xaa, 0, 0],
		[0xaa, 0, 0xaa],
		[0xaa, 0x55, 0],
		[0xaa, 0xaa, 0xaa],
		[0x55, 0x55, 0x55],
		[0x55, 0x55, 0xff],
		[0x55, 0xff, 0x55],
		[0x55, 0xff, 0xff],
		[0xff, 0x55, 0x55],
		[0xff, 0x55, 0xff],
		[0xff, 0xff, 0x55],
		[0xff, 0xff, 0xff],
	],
	'pico8': [
		[0x00,0x00,0x00],
		[0x1D,0x2B,0x53],
		[0x7E,0x25,0x53],
		[0x00,0x87,0x51],
		[0xAB,0x52,0x36],
		[0x5F,0x57,0x4F],
		[0xC2,0xC3,0xC7],
		[0xFF,0xF1,0xE8],
		[0xFF,0x00,0x4D],
		[0xFF,0xA3,0x00],
		[0xFF,0xEC,0x27],
		[0x00,0xE4,0x36],
		[0x29,0xAD,0xFF],
		[0x83,0x76,0x9C],
		[0xFF,0x77,0xA8],
		[0xFF,0xCC,0xAA],
	]
}
Object.entries(PALETTES).forEach(([name, palette]) => PALETTES[name] = palette.map(rgbaValue))


function isLittleEndian() {
	// Determine whether Uint32 is little - or big-endian.
	let {raw, buf32} = getBitBuffers(new ArrayBuffer(8))
	buf32[1] = 0x0a0b0c0d
	return !(raw[4] === 0x0a && raw[5] === 0x0b && raw[6] === 0x0c &&
		raw[7] === 0x0d)
}

function palette(index, rgbaVal, {screen=defaultScreen} = {}) {
	screen.palette[index] = rgbaVal
}

function usePalette(palette, {screen=defaultScreen} = {}) {
	screen.palette = palette
}

function useIndexedPalette(state, {screen=defaultScreen}) {
	screen.indexedPalette = state
}


export {
	rgbaValue,
	rgbaSplit,
	PALETTES,
	palette,
	useIndexedPalette,
	usePalette
}