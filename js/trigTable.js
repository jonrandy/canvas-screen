const 
	steps = 1024,
	multiplier = 1,
	PI = 3.141592653589793238,
	step = 2 * PI / steps,
	sinI = [],
	cosI = []

let i
for (i = 0; i < steps; i++) {
	sinI[i] = Math.sin(i*step) * multiplier
	cosI[i] = Math.cos(i*step) * multiplier
}


export {
	sinI,
	cosI
}

