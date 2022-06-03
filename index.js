import {
	setScreen,
	pset,
	usePage,
	clear,
	setBackground,
	setZoom,
	setBlur,
	vsync
} from './canvas-screen.js'


setScreen([320,200], {
	background: [0, 0, 255],
	zoom: 4,
	activePage: 1
})

let a=0, b=1;

(async ()=>{

	for(let n=0; n<250; n++) {

		for (let i=0; i<5000; i++) {
			let x = 0 + ~~(Math.random()*320)
			let y = 0 + ~~(Math.random()*200)
			pset(x, y, [255, 255, 255])
		}

		await vsync()
		usePage(a,b);
		[a,b] = [b,a]
		clear()

	}

})()
