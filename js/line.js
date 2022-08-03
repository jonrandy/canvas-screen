import { pset } from './main.js'

export function linePoints(x1, y1, x2, y2) {
	const
		dx = Math.abs(x2 - x1),
		dy = Math.abs(y2 - y1),
		sx = (x1 < x2) ? 1 : -1,
		sy = (y1 < y2) ? 1 : -1,
		points = []

	let
		err = dx - dy,
		e2

	while(true) {
		points.push([x1, y1])
		if ((x1 === x2) && (y1 === y2)) break
		e2 = 2*err
		if (e2 > -dy) { err -= dy, x1 += sx }
		if (e2 < dx) { err += dx, y1 += sy }
	}
	return points
}

export function line(x1, y1, x2, y2, c, {screen=undefined, useIndexedPalette=undefined} = {}) {
	linePoints(x1, y1, x2, y2).forEach(([x,y]) => pset(x, y, c, {screen, useIndexedPalette}))
}