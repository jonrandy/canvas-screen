const runWithFrameRate = (fps=60) => {
	const fpsInterval = 1000/fps
	return async func => {
		do {
			let then = Date.now()
			if (func()) return
			do {
				await vsync()
			} while(Date.now() - then < fpsInterval)
		} while(true)
	}
}

const vsync = () => new Promise(window.requestAnimationFrame)

export default runWithFrameRate
