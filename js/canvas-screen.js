const
	IS_LITTLE_ENDIAN = isLittleEndian(),
	IS_FIREFOX = navigator.userAgent.toLowerCase().indexOf('firefox') >= 0

function init(
	[width, height] = [640, 480]
	{
		zoom = 1,
		blur = false
		parent = document.body,
		pages = 2,
		background = [0, 0, 0, 255]
	}
) {

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


export {
	init,
	pset,
	usePage,
	clear,
	setBackground,
	setZoom,
	setBlur
}
