import { pset, refresh, defaultScreen, dumpDataToPixelBuffer } from './main.js'
import { getColour } from './colour.js'

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

export function line(x1, y1, x2, y2, c, {screen=defaultScreen, useIndexedPalette=undefined, forceNoRefresh=false} = {}) {
	if (y1==y2) {
		hLine(y1, x1, x2, c, {screen, useIndexedPalette, forceNoRefresh})
	} else {
		linePoints(x1, y1, x2, y2).forEach(([x,y]) => pset(x, y, c, {screen, useIndexedPalette, forceNoRefresh: true}))
	}
	screen.autoRefresh && !forceNoRefresh && refresh(screen)
}

export function hLine(y, x1, x2, c, {screen=defaultScreen, useIndexedPalette=undefined, forceNoRefresh=false} = {}) {
	const wd = 1 + Math.abs(x2-x1),
		cv = getColour(c, {screen, useIndexedPalette}),
		lineData = (new Uint32Array(wd)).fill(cv),
		offset = y*screen.width + Math.min(x1,x2)
	dumpDataToPixelBuffer(lineData, offset, {screen, forceNoRefresh})
}
