import * as s from './canvas-screen.js'

const wd = 320, ht = 240

s.open({
	width: wd,
	height: ht,
	background: [0, 0, 0],
	zoom: 2,
	autoRefresh: false
})

const
	mapCompressed = "QVBRADU2OTo7PD0+P0BBQkNERUZHSElKS0xNTk9SU1RVADQ2OD0+QVRVADQ2Nzo7PD0+U4eIiQAzNDg5PT4/QFKDhIWGiouMjQAjJCUmKi0uMDE0NjdBUYGCjo+QkZSVACEiJygpKi0uLzAxMjQ2Nzh7fH5/gJKTlpecnZ6foAAODxAREhMUFRYeISIqLjIzOTpCUGVmZ2hpan2YmZqboaKjpKWmp60ACgsMDRcYGRobHB0fICEiJCcoKSosLTAyMzQ1NkJOT2Nka2xtbnF0dXZ3eHl6qKmqq6yur7CxsgAKJCcoKSorMTM7QUpLTE1ib3Jzs7S1trcABwgJCi8wMTI0NTY6O0dISVBRUlNhZm1wtri5AActLi8wMTQ1RlNgZWZtt7i5AAcrLC8wMTM0NjlFUFFSXl9ktgAMDSkqMjU3OEFEZK2ur7W2AAkKCw4PECgxNzhCQ6qys7QACCg2WF5fYGSmp6ipq6yyAAcpKjBfY7MAESssLi9VVldZYGFiY2RlsAA5OldaXmFipqeoqaqxAC06XF2qq7IAERI0NTY3ODlVVldZWluqq6yzABESMjQ5V1hZWqusrQARJSYnMjQ4OlgAJSYoKTQ1ODk6WGxvcHd4ea0AECYnMjVtdnh5q64ADyUmKCkwMTM0VVZXWFxeX2NrbnF2eK+wACUoL11fYGNkbW5vcnd5eqmqr7AADigtLlRaW19hYmRlaWtscHFyeq6wACxbX2h6o6SlpgArWVtfYmRmaGp4o6Slp6mvAFRVVldYWltcXV5fYGJjZ2hrbG1veXqlqq6xACpWV1hZY2lqqKqsrbEADg8oKVRVY2lqbqWprq+wACdTYWJjZmdorQARJmRlaWprbG1ub6asAB0eHyAhIiMkJnkAERIcUVJvegAQG1BvcHl7fH0AEyZxen1+f4CBgoOEqAAREholT3B7fH6FpqcAEhQjJCUmJ3J/pKWoABofICMkJSYoTnGGiJKTlJ+goqOnAB4nKCorTnN/h5GVoQAVGxwdICYpLnJ0fpCWoagAFhcmKSorLnx9j5+hqQAYGRobHCAhIk5zdXuJjpeYoAAddHl6maiqAB4fTnV2d3iKm6GqACAoKSsseXqcoaipqqwAJyotLi8wT3Z3eIudoKeoACEjJCUmMVCNjpuen6erACIjJCUyeoyPmpyqADM0NTZRUlpbXI6Pm52mp6usADdTVFVWV1hZXV55mZqlAF94mZucpKcAJXeanJ2io6epqqyuACQ4X3adqqusADg5Ojt1m56nqKqrrrCxADg8PT5fdJ+usLK0tba9AD9gnKKjpKWmqa6xs7e4vb4AQEFznaqys7m6vL2+vwAkQmGeoKGio6i0vL3AAHOfoKGkpaeprLm7v8DBwgAlQn6io6Slp6ipq6y1tre4urzBwwBBfqiru7zCACZ5sLGyt8MAQHqvtrgAJ2F4q6ytrgAoKXN2d3qqs8cAKnFyqbS1xwArYXmoucQAP3ClpqcAYnB1pLrExQA8PT6jxQA7cHV4uwBvdncAADpjbgBkbbsAOWysACxoamuiqKmqq625ugA2NzhlZmdppaanrq+4ADaio6Swt8YAADQ1NrGytLW2xccAs8TGxwAtM7KzwsTFALGzwMHCAC6xsr6/wQAuvcAALjO9vr8AAC8zAAAwMTIzNAA1Ng==",
	worldMap = [],
	mapWidth = 256,
	mapHeight = 128,
	bit = new Uint8ClampedArray(mapWidth)

let p, x, y, rx, ry, bx, by, gx, gy, mx=0, my=0
let r, g, b
let ang

atob(mapCompressed).split(String.fromCharCode(0)).forEach(([...c])=>{ c.forEach(i=>bit[p=i.charCodeAt(0)]=1-bit[p]), worldMap.push([...bit]) })
for(y=0;y<124;y++) worldMap.push(Array(mapWidth).fill(0))



;(async ()=>{

	for(p=0;p<1000000;p++) { 

		ang = p*6

		mx = Math.cos(~~ang/64) * 60
		my = Math.sin(~~ang/64) * 30

		for(y=0;y<ht;y++) {
			for(x=0;x<wd;x++) {

				rx = x+wd*2-mx 
				ry = y+ht*2-my 
				r = worldMap[(~~ry) &127][(~~rx) &255] * 255

				gx = x+wd*2-mx*1.1 
				gy = y+ht*2-my*1.1 
				g = worldMap[(~~gy) &127][(~~gx) &255] * 255

				bx = x+wd*2-mx*1.2
				by = y+ht*2-my *1.2
				b = worldMap[(~~by) &127][(~~bx) &255] * 255

				s.pset(x, y, [r, g, b])
			}
		}

		await s.vsync()
		s.refresh()	

	}

})()

