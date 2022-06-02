import {
	setScreen,
	pset,
	usePage,
	clear,
	setBackground,
	setZoom,
	setBlur
} from './canvas-screen.js'

setScreen([320,240], {
	background: [0, 0, 255],
	activePage: 0,
	visiblePage: 0,
	zoom: 3
})

for (let i=0; i<6000; i++) {
	let x = 0 + ~~(Math.random()*320)
	let y = 0 + ~~(Math.random()*240)
	pset(x, y, [255, 255, 255])
}
