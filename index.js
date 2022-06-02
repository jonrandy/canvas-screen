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

for (let i=0; i<30; i++) {
	let x = 155 + ~~(Math.random()*10)
	let y = 115 + ~~(Math.random()*10)
	pset(x, y, [255, 255, 255])
}
