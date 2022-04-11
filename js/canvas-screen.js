/// IMPORTANT - we can write straight to imageData (use buffers into imageData.data.buffer)


const
	IS_LITTLE_ENDIAN = isLittleEndian(),
	screenDataVal = IS_LITTLE_ENDIAN ? ([r, g, b, a=255]) => ((a<<24) | (b<<16) | (g<<8) | r) :	([r, g, b, a=255]) => ((r<<24) | (g<<16) | (b<<8) | a)
	IS_FIREFOX = navigator.userAgent.toLowerCase().indexOf('firefox') >= 0

function init(
	[width, height] = [640, 480],
	{
		zoom = 1,
		blur = false,
		parent = document.body,
		pageCount = 2,
		background = [0, 0, 0, 255]
	}
) {

	return {
		width,
		height,
		zoom,
		blur,
		parent,
		pageCount,
		background
	}

}


function pset(x, y, c, screen = lastScreen) {

}


function usePage(activePage, visiblePage = lastScreen.visiblePage, screen = lastScreen) {

}


function clear(screen = lastScreen) {

}


function setBackground(bg, screen = lastScreen) {

}


function setZoom(zoom, screen = lastScreen) {

}


function setBlur(blur, screen = lastScreen) {

}

function getBitBuffers(arrayBuffer) {
	return {
		raw: arrayBuffer,
		buf8: new Uint8ClampedArray(buf),
		buf32: new Uint32Array(buf)
	}	
}

function isLittleEndian() {
	// Determine whether Uint32 is little - or big-endian.
	let {raw, buf8, buf32} = getBitBuffers(new ArrayBuffer(8))
	buf32[1] = 0x0a0b0c0d
	return !(raw[4] === 0x0a && raw[5] === 0x0b && raw[6] === 0x0c &&
    raw[7] === 0x0d)
}


export {
	init,
	pset,
	usePage,
	clear,
	setBackground,
	setZoom,
	setBlur
}
