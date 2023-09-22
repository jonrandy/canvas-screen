import * as s from 'canvas-screen'
import { sinT, cosT } from 'trigTable'
import {randomize, rnd} from 'random'
import runWithFrameRate from './js/fps.js'


const wd = 161, ht = 160

s.open({
	width: wd,
	height: ht,
	background: 8,
	zoom: 4,
	autoRefresh: false,
	indexedPalette: true,
	palette: s.PALETTES.pico8
})


let p, i, ang, mx, my, x, y

const mazeWidth = 20, mazeCellSize = 4

;(async ()=>{

	runWithFrameRate(60)(()=>{

		s.clear()
		randomize(0)
		for (i=0;i<mazeWidth*mazeWidth;i++) {
			ang = (p*1+rnd()*1024) & 1023
			mx = ~~s.clamp(cosT[ang] * 160, -4, 4)
			my = ~~s.clamp(sinT[ang] * 160, -4, 4)
			x=(i % mazeWidth) * mazeCellSize*2
			y=~~(i/mazeWidth) * mazeCellSize*2
			s.line(x+mazeCellSize-mx, y+mazeCellSize+my, x+mazeCellSize+mx, y+mazeCellSize-my, 7)
		}

		s.refresh()	
		p = (p+1) & 1023

	})

})()

