import * as s from 'canvas-screen'
import {randomize, rnd} from 'random'
import runWithFrameRate from './js/fps.js'


const wd = 320, ht = 240

s.open({
	width: wd,
	height: ht,
	background: 0,
	zoom: 2,
	autoRefresh: false,
	indexedPalette: true,
	palette: s.PALETTES.pico8
})

let p = 0, q=0, stitchSize = 8
let col = 7

let offset

let keydown = false
window.onkeydown = () => keydown = true



randomize(rnd()*1000)



;(async ()=>{

	runWithFrameRate(12000)(()=>{

		const myPoints = [
			[rnd(wd-1), rnd(ht-1)],
			[rnd(wd-1), rnd(ht-1)],
			[rnd(wd-1), rnd(ht-1)]
		]

		s.fillPoly(myPoints, rnd(15))
		s.refresh()

		return keydown

	})

})()
