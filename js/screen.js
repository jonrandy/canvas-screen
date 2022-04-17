
const
	IS_LITTLE_ENDIAN = isLittleEndian(),
	CANVAS_ID_PREFIX = 'Screen_',
	CANVAS_CLASS = "canvas-screen",
	IS_FIREFOX = navigator.userAgent.toLowerCase().indexOf('firefox') >= 0


let
	latestManager,
	canvasCount = 0

let _init = function(
		[width, height] = [640, 480],
		{
			zoom = 1,
			blur = false,
			parent = document.body,
			doubleBuffer = false,
			background = [0,0,0,255]
		} = {}
) {

	latestManager = managerFactory( [width, height], { zoom, blur, parent, doubleBuffer, background })
	Screen = add_init(new Proxy(latestManager, {}))
	return latestManager

}



let Screen = add_init({})
export { Screen as default }


function add_init(obj) {
	obj.init = _init
	return obj
}




function managerFactory(
	[width, height],
	{ zoom, blur, parent, doubleBuffer, background	}
) {

	let
		{canvas, context, imageData} = buildCanvas(width, height),
		{buf32:screenData, buf8} = getBuffers(imageData.data.length)

	_start()

	function _start() {
		let oldDoubleBuffer = doubleBuffer
		doubleBuffer = false
		parent.appendChild(canvas)
		background && clear(background)
		zoom && setZoom(zoom)
		setBlur(blur)
		doubleBuffer = oldDoubleBuffer
	}

	function pset([x, y], c) {
		screenData[~~y*width+~~x] = screenDataVal(c)
		if (!doubleBuffer) refresh()
	}

	function setZoom(level) {
		canvas.style.width = width*level + 'px'
	}

	function setBlur(state) {
		canvas.style['image-rendering'] = state ? 'unset' : (IS_FIREFOX ? 'optimizespeed' : 'pixelated')
	}

	function setDoubleBuffer(state) {
		doubleBuffer = state
	}

	function setParent(newParent) {
		newParent.appendChild(canvas)
		parent = newParent
	}

	function clear(bg=this.background) {
		let v = screenDataVal(bg)
		screenData.fill(v)
		for(let i=0; i < screenData.length; i++) screenData[i] = v
		if (!doubleBuffer) refresh()
	}

	function refresh() {
		imageData.data.set(buf8)
		context.putImageData(imageData, 0, 0)
	}



	return {
		get id() { return canvas.id }, set id(_) {},
		get width() { return width }, set width(_) {},
		get height() { return height },	set height(_) {},

		get zoom() { return zoom }, set zoom(z) { setZoom(z) },
		get blur() { return blur }, set blur(s) { setBlur(s) },
		get parent() { return parent }, set parent(p) { setParent(p) },
		get doubleBuffer() { return doubleBuffer }, set doubleBuffer(p) { setDoubleBuffer(p) },

		background,
		clear,
		refresh,
		pset
	}

}

const screenDataVal = ([r, g, b, a=255]) => IS_LITTLE_ENDIAN ? ((a<<24) | (b<<16) | (g<<8) | r) :	((r<<24) | (g<<16) | (b<<8) | a)



function buildCanvas(width, height) {
	let canvas = document.createElement('canvas')
	canvas.width = width
	canvas.height = height
	canvas.id = CANVAS_ID_PREFIX + canvasCount++
	canvas.className = CANVAS_CLASS
	let 
		context = canvas.getContext('2d'),
		imageData = context.getImageData(0, 0, width, height)

	return { canvas, context, imageData }
}


function getBuffers(byteCount) {
	let buf = new ArrayBuffer(byteCount)
	return {
		raw: buf,
		buf8: new Uint8ClampedArray(buf),
		buf32: new Uint32Array(buf)
	}	
}

function isLittleEndian() {
	// Determine whether Uint32 is little - or big-endian.
	let {raw, buf8, buf32} = getBuffers(8)
	buf32[1] = 0x0a0b0c0d
	return !(raw[4] === 0x0a && raw[5] === 0x0b && raw[6] === 0x0c &&
		raw[7] === 0x0d)
}