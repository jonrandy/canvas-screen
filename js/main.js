import { rgbaValue, rgbaSplit, PALETTES, usePalette, getColour } from './colour.js'

const
	IS_FIREFOX = navigator.userAgent.toLowerCase().indexOf('firefox') >= 0

let
	lastScreen = {}

function open(
	{
		width = 640,
		height = 480,
		zoom = 1,
		blur = false,
		parent = document.body,
		pageCount = 1,
		activePage = 0,
		visiblePage = 0,
		background = [0, 0, 0, 255],
		autoRefresh = true,
		indexedPalette = true,
		palette = PALETTES['default']  
	} = {}
) {

	const { canvas, context } = buildCanvas(width, height)
	parent.appendChild(canvas)

	const rawPageData = []
	for (let i=0; i<pageCount; i++) {
		const imageData = context.createImageData(width, height)
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
		autoRefresh,
		indexedPalette,
		mouseX: 0,
		mouseY: 0
	}

	setDefaultScreen(screen)


	setupInputEvents(canvas, screen)
	usePalette(palette, {screen})
	setBackground(background, {screen})
	setZoom(zoom, {screen})
	setBlur(blur, {screen})
	usePage(activePage, visiblePage, {screen})
	clear({screen})


	return screen

}


function setupInputEvents(canvas, screen) {
	canvas.addEventListener("mousemove", e => [screen.mouseX, screen.mouseY] = [~~(e.offsetX/screen.zoom), ~~(e.offsetY/screen.zoom)])
}

const getMouse = ({screen=lastScreen} = {}) => [screen.mouseX, screen.mouseY]

function setDefaultScreen(screen) {
	lastScreen = screen
}


function refresh({screen=lastScreen} = {}) {
	if (screen.activePage == screen.visiblePage) dumpPageToScreen(screen.activePage, screen)
}


function pset(x, y, c, {screen=lastScreen, useIndexedPalette = undefined, forceNoRefresh = false} = {}) {
	screen.rawPageData[screen.activePage].buf32[x+y*screen.width] = getColour(c, {screen, useIndexedPalette})
	screen.autoRefresh && !forceNoRefresh && refresh(screen)
}


function pget(x, y, {screen=lastScreen} = {}) {
	return screen.rawPageData[screen.activePage].buf32[x+y*screen.width]
}

function dumpDataToPixelBuffer(Uint32DataArr, offset, {screen = lastScreen, forceNoRefresh = false} = {}) {
	pixelBuffer(screen).set(Uint32DataArr, offset)
	screen.autoRefresh && !forceNoRefresh && refresh(screen)
}



function usePage(activePage, visiblePage = lastScreen.visiblePage, {screen=lastScreen} = {}) {
	if (screen.visiblePage != visiblePage) dumpPageToScreen(visiblePage, screen)
	screen.activePage = activePage
	screen.visiblePage = visiblePage
}


function clear({screen=lastScreen} = {}) {
	screen.rawPageData[screen.activePage].buf32.set(screen.background)
	screen.autoRefresh && refresh(screen)
}


function setBackground(bg, {screen=lastScreen} = {}) {
	const background = new Uint32Array(screen.width * screen.height).fill(screen.indexedPalette ? screen.palette[bg] : bg)
	screen.background = background
}


function setZoom(zoomLevel, {screen=lastScreen} = {}) {
	screen.zoom = zoomLevel
	screen.canvas.style.width = screen.width * zoomLevel + 'px'
}


function setBlur(blurState, {screen=lastScreen} = {}) {
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

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)


export {
	setDefaultScreen,
	open,
	usePage,
	clear,
	setBackground,
	setZoom,
	setBlur,
	vsync,
	refresh,
	pixelBuffer,
	rgbaValue,
	rgbaSplit,
	pset,
	pget,
	getMouse,
	clamp,
	getBitBuffers,
	dumpDataToPixelBuffer,
	lastScreen as defaultScreen,
}
