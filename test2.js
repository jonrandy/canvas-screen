import * as s from 'canvas-screen'
import { sinT, cosT } from 'trigTable'
import * as rand from 'random'

window.rr = rand

const wd = 256, ht = 192

s.open({
	width: wd,
	height: ht,
	background: [0, 0, 0],
	zoom: 2,
	autoRefresh: false,
})

const
	mapCompressed = "QVBRADU2OTo7PD0+P0BBQkNERUZHSElKS0xNTk9SU1RVADQ2OD0+QVRVADQ2Nzo7PD0+U4eIiQAzNDg5PT4/QFKDhIWGiouMjQAjJCUmKi0uMDE0NjdBUYGCjo+QkZSVACEiJygpKi0uLzAxMjQ2Nzh7fH5/gJKTlpecnZ6foAAODxAREhMUFRYeISIqLjIzOTpCUGVmZ2hpan2YmZqboaKjpKWmp60ACgsMDRcYGRobHB0fICEiJCcoKSosLTAyMzQ1NkJOT2Nka2xtbnF0dXZ3eHl6qKmqq6yur7CxsgAKJCcoKSorMTM7QUpLTE1ib3Jzs7S1trcABwgJCi8wMTI0NTY6O0dISVBRUlNhZm1wtri5AActLi8wMTQ1RlNgZWZtt7i5AAcrLC8wMTM0NjlFUFFSXl9ktgAMDSkqMjU3OEFEZK2ur7W2AAkKCw4PECgxNzhCQ6qys7QACCg2WF5fYGSmp6ipq6yyAAcpKjBfY7MAESssLi9VVldZYGFiY2RlsAA5OldaXmFipqeoqaqxAC06XF2qq7IAERI0NTY3ODlVVldZWluqq6yzABESMjQ5V1hZWqusrQARJSYnMjQ4OlgAJSYoKTQ1ODk6WGxvcHd4ea0AECYnMjVtdnh5q64ADyUmKCkwMTM0VVZXWFxeX2NrbnF2eK+wACUoL11fYGNkbW5vcnd5eqmqr7AADigtLlRaW19hYmRlaWtscHFyeq6wACxbX2h6o6SlpgArWVtfYmRmaGp4o6Slp6mvAFRVVldYWltcXV5fYGJjZ2hrbG1veXqlqq6xACpWV1hZY2lqqKqsrbEADg8oKVRVY2lqbqWprq+wACdTYWJjZmdorQARJmRlaWprbG1ub6asAB0eHyAhIiMkJnkAERIcUVJvegAQG1BvcHl7fH0AEyZxen1+f4CBgoOEqAAREholT3B7fH6FpqcAEhQjJCUmJ3J/pKWoABofICMkJSYoTnGGiJKTlJ+goqOnAB4nKCorTnN/h5GVoQAVGxwdICYpLnJ0fpCWoagAFhcmKSorLnx9j5+hqQAYGRobHCAhIk5zdXuJjpeYoAAddHl6maiqAB4fTnV2d3iKm6GqACAoKSsseXqcoaipqqwAJyotLi8wT3Z3eIudoKeoACEjJCUmMVCNjpuen6erACIjJCUyeoyPmpyqADM0NTZRUlpbXI6Pm52mp6usADdTVFVWV1hZXV55mZqlAF94mZucpKcAJXeanJ2io6epqqyuACQ4X3adqqusADg5Ojt1m56nqKqrrrCxADg8PT5fdJ+usLK0tba9AD9gnKKjpKWmqa6xs7e4vb4AQEFznaqys7m6vL2+vwAkQmGeoKGio6i0vL3AAHOfoKGkpaeprLm7v8DBwgAlQn6io6Slp6ipq6y1tre4urzBwwBBfqiru7zCACZ5sLGyt8MAQHqvtrgAJ2F4q6ytrgAoKXN2d3qqs8cAKnFyqbS1xwArYXmoucQAP3ClpqcAYnB1pLrExQA8PT6jxQA7cHV4uwBvdncAADpjbgBkbbsAOWysACxoamuiqKmqq625ugA2NzhlZmdppaanrq+4ADaio6Swt8YAADQ1NrGytLW2xccAs8TGxwAtM7KzwsTFALGzwMHCAC6xsr6/wQAuvcAALjO9vr8AAC8zAAAwMTIzNAA1Ng==",
	worldMap = [],
	mapWidth = 256,
	mapHeight = 128,
	bit = new Uint8ClampedArray(mapWidth)

let p, x, y, rx, ry, bx, by, gx, gy, mx=0, my=0
let r, g, b
let ix, iy, ox, oy, ex, ey
let ang, ang2, ang3

atob(mapCompressed).split(String.fromCharCode(0)).forEach(([...c])=>{ c.forEach(i=>bit[p=i.charCodeAt(0)]=1-bit[p]), worldMap.push([...bit]) })
for(y=0;y<mapHeight;y++) worldMap.push(Array(mapWidth).fill(0))

s.usePalette([
	[0, 0, 0],
	[0, 0, 255],
	[0,255,0],
	[0,255,255],
	[255, 0, 0],
	[255, 0, 255],
	[255,255,0],
	[255,255,255],
].map(s.rgbaValue))



;(async ()=>{

	for(p=0;p<1000000;p++) { 

		ang = (p*15) & 1023
		ang2 = (p*1) & 1023
		ang3 = (p*-3) & 1023

		mx = (cosT[ang] * 60)
		my = (sinT[ang] * 60)

		ix = cosT[ang2]
		iy = sinT[ang2]

		ex = cosT[ang3]
		ey = sinT[ang3]

		for(y=0;y<ht;y++) {
			for(x=0;x<wd;x++) {

				rx = x+wd*2
				ry = y+ht*2

				ox = (rx*ix + ry*-iy) 
				oy = (rx*iy + ry*ix)

				r = worldMap[(~~oy) &127][(~~ox) &255]

				gx = x
				gy = y

				ox = (gx*ex + gy*-ey) 
				oy = (gx*ey + gy*ex)

				g = worldMap[(~~oy) &127][(~~ox) &255]

				bx = x+wd*2-mx//*1.2
				by = y+ht*2-my //*1.2
				b = worldMap[(~~by) &127][(~~bx) &255]

				s.pset(x, y, r<<2 | g<<1 | b)
			}
		}

		s.refresh()	
		await s.vsync()
		

	}

})()

