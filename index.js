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
	zoom: 3,
	activePage: 1
})

const vsync = () => new Promise(window.requestAnimationFrame)

let a=0, b=1;

(async ()=>{

	for(let n=0; n<250; n++) {

		for (let i=0; i<10000; i++) {
			let x = 0 + ~~(Math.random()*320)
			let y = 0 + ~~(Math.random()*240)
			pset(x, y, [255, 255, 255])
		}


		await vsync()

		usePage(a,b);

		[a,b] = [b,a]

		clear()

	}

})()



