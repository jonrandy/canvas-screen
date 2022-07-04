import * as s from 'canvas-screen'
import { sinT, cosT } from 'trigTable'
import {randomize, rnd} from 'random'


const wd = 161, ht = 160, blue = [0, 0, 205]

s.open({
	width: wd,
	height: ht,
	background: [0, 0, 0],
	zoom: 4,
	autoRefresh: false
})

let p, i, ang, mx, my, x, y

const mazeWidth = 20, mazeCellSize = 4

;(async ()=>{

	for(p=0;p<1000000;p++) { 

		s.clear()

		randomize(0)
		for (i=0;i<mazeWidth*mazeWidth;i++) {

			ang = (p*1+rnd()*1024) & 1023

			mx = ~~s.clamp(cosT[ang] * 200, -4, 4)
			my = ~~s.clamp(sinT[ang] * 200, -4, 4)

			x=(i % mazeWidth) * mazeCellSize*2
			y=~~(i/mazeWidth) * mazeCellSize*2


			s.line(x+mazeCellSize-mx, y+mazeCellSize+my, x+mazeCellSize+mx, y+mazeCellSize-my, blue)

		}

		ang = (p*2) & 1023


		s.refresh()	
		await s.vsync()
		
	}

})()

