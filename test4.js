import * as s from 'canvas-screen'
import {randomize, rnd} from 'random'
import runWithFrameRate from './js/fps.js'


const wd = 320, ht = 240

s.open({
	width: wd,
	height: ht,
	background: 1,
	zoom: 3,
	autoRefresh: false,
	indexedPalette: true,
	palette: s.PALETTES.pico8
})

let p = 0, q=0, stitchSize = 8
let col = 4

let offset

let keydown = false
window.onkeydown = () => keydown = true

// sashiko


;(async ()=>{

	runWithFrameRate(1)(()=>{

		s.clear()
		randomize(rnd()*1000)


		for (p=0; p<=wd-stitchSize; p+=stitchSize) {
			offset = ~~(rnd()*2)
			for (q=offset*stitchSize; q<=ht-stitchSize; q+=stitchSize*2) {
				s.line(p, q, p, q+stitchSize, col)
			}
		}

		for (p=0; p<=ht-stitchSize; p+=stitchSize) {
			offset = ~~(rnd()*2)
			for (q=offset*stitchSize; q<=wd-stitchSize; q+=stitchSize*2) {
				s.line(q, p, q+stitchSize, p, col)
			}
		}

		s.refresh()

		return keydown


	})

})()




