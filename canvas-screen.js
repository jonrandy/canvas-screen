/// IMPORTANT - we can write straight to imageData (use buffers into imageData.data.buffer)


const
	IS_LITTLE_ENDIAN = isLittleEndian(),
	pixelValue = IS_LITTLE_ENDIAN ? ([r, g, b, a=255]) => ((a<<24) | (b<<16) | (g<<8) | r) :	([r, g, b, a=255]) => ((r<<24) | (g<<16) | (b<<8) | a),
	IS_FIREFOX = navigator.userAgent.toLowerCase().indexOf('firefox') >= 0

let
	lastScreen = {}

function open(
	[width, height] = [640, 480],
	{
		zoom = 1,
		blur = false,
		parent = document.body,
		pageCount = 1,
		activePage = 0,
		visiblePage = 0,
		background = [0, 0, 0, 255],
		autoRefresh = true
	} = {}
) {

	const { canvas, context } = buildCanvas(width, height)
	parent.appendChild(canvas)

	const rawPageData = []
	for (let i=0; i<pageCount; i++) {
		const imageData = context.getImageData(0, 0, width, height)
		rawPageData[i] = { imageData, ...getBitBuffers(imageData.data.buffer) }
	}

	const screen = {
		width,
		height,
		parent,
		pageCount,
		canvas,
		context,
		rawPageData,
		autoRefresh
	}

	setBackground(background, screen)
	setZoom(zoom, screen)
	setBlur(blur, screen)
	usePage(activePage, visiblePage, screen)
	clear(screen)

	lastScreen = screen

	return screen

}

function refresh(screen = lastScreen) {
	if (screen.activePage == screen.visiblePage) dumpPageToScreen(screen.activePage, screen)
}


function pset(x, y, c, screen = lastScreen) {
	screen.rawPageData[screen.activePage].buf32[x+y*screen.width] = pixelValue(c)
	screen.autoRefresh && refresh(screen)
}


function usePage(activePage, visiblePage = lastScreen.visiblePage, screen = lastScreen) {
	if (screen.visiblePage != visiblePage) dumpPageToScreen(visiblePage, screen)
	screen.activePage = activePage
	screen.visiblePage = visiblePage
}


function clear(screen = lastScreen) {
	screen.rawPageData[screen.activePage].buf32.set(screen.background)
	screen.autoRefresh && refresh(screen)
}


function setBackground(bg, screen = lastScreen) {
	const background = new Uint32Array(screen.width * screen.height).fill(pixelValue(bg))
	screen.background = background
}


function setZoom(zoomLevel, screen = lastScreen) {
	screen.zoom = zoomLevel
	screen.canvas.style.width = screen.width * zoomLevel + 'px'
}


function setBlur(blurState, screen = lastScreen) {
	screen.blur = blurState
	screen.canvas.style['image-rendering'] = blurState ? 'unset' : (IS_FIREFOX ? 'optimizespeed' : 'pixelated')
}

function getBitBuffers(arrayBuffer) {
	return {
		raw: arrayBuffer,
		buf8: new Uint8ClampedArray(arrayBuffer),
		buf32: new Uint32Array(arrayBuffer)
	}	
}

function isLittleEndian() {
	// Determine whether Uint32 is little - or big-endian.
	let {raw, buf8, buf32} = getBitBuffers(new ArrayBuffer(8))
	buf32[1] = 0x0a0b0c0d
	return !(raw[4] === 0x0a && raw[5] === 0x0b && raw[6] === 0x0c &&
		raw[7] === 0x0d)
}

function buildCanvas(width, height) {
	const canvas = document.createElement('canvas')
	canvas.width = width
	canvas.height = height
	const	context = canvas.getContext('2d')
	return { canvas, context }
}

function dumpPageToScreen(pageIndex, { context, rawPageData } = lastScreen) {
	context.putImageData(rawPageData[pageIndex].imageData, 0, 0)
}

function pixelBuffer({rawPageData, activePage} = lastScreen) {
	return rawPageData[activePage].buf32
}

const vsync = () => new Promise(window.requestAnimationFrame)


export {
	open,
	pset,
	usePage,
	clear,
	setBackground,
	setZoom,
	setBlur,
	vsync,
	refresh,
	pixelBuffer,
	pixelValue
}
