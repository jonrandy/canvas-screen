import * as s from './canvas-screen.js'

const wd = 320, ht = 240

s.open({
	width: wd,
	height: ht,
	background: [0, 0, 0],
	zoom: 3,
	autoRefresh: false
})

let line = new Uint32Array(wd)

const bar = [], barb=[], pi = 3.142
for (let j=1;j<=8;j++) {
	bar.push(s.pixelValue([j*4, j*0, j*11]))
	barb.push(s.pixelValue([j*0, j*11, j*4]))
}
let black = s.pixelValue([0,0,0])
let white = [255,255,255]



let buffer = s.pixelBuffer()
let x,x2, ang, ang2, ang3, mul
let mx, my
let n = 0

;(async ()=>{


	for(let i=0; i<2500; i++) {

		line.fill(black)

		for (let i=0; i<ht; i++) {
			ang = n*2+i
			ang2 = n*2 - i
			ang3 = (n+180)*4-i*3
			mul = 40 + (Math.sin((ang2+ang3)/180*pi)*40)
			x = ~~(160 + (Math.sin(ang/180*pi)*mul) + (Math.sin(ang3/180*pi)*40))
			x2 = ~~(160 + (Math.sin((ang2+x)/180*pi)*40) + (Math.sin(ang2*2/180*pi)*40))

			line.set(bar, x)
			line.set(barb, x2)
			buffer.set(line, (wd*i))

		}

		[mx, my] = s.getMouse()
		s.line(x, x2, mx, my, white)

		n = (n+1)%360

		await s.vsync()
		s.refresh()	

	}

})()


// import rn from "https://cdn.skypack.dev/seedrandom"

// let rnd = new rn.alea('poop')
// console.log(rnd())