const 
	steps = 1024,
	multiplier = 1,
	PI = 3.141592653589793238,
	step = 2 * PI / steps,
	sinT = [],
	cosT = []

let i
for (i = 0; i < steps; i++) {
	sinT[i] = Math.sin(i*step) * multiplier
	cosT[i] = Math.cos(i*step) * multiplier
}


export {
	sinT,
	cosT
}

