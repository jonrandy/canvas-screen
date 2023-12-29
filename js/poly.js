import { line, linePoints, hLine } from "./line.js"
import { pset, refresh, defaultScreen } from "./main.js"

export function fillPoly(points, c, { screen = defaultScreen, useIndexedPalette = undefined, forceNoRefresh = false } = {}) {
	const edgePixels = []
	points.forEach((p, i) => edgePixels.push(...linePoints(...p, ...points[(i + 1) % points.length])))
	const linePixels = edgePixels.reduce((lines, [x, y]) => ( (lines[y] = lines[y] || []).push(x), lines), {})

	Object.entries(linePixels).forEach(([y, xs]) => {
		hLine(y, Math.min(...xs), Math.max(...xs), c, {screen, useIndexedPalette, forceNoRefresh: true})
	})

	screen.autoRefresh && !forceNoRefresh && refresh(screen)

}
