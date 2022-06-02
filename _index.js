import Screen from './js/screen.js'

// let a=Screen.init()

// console.log(Screen)


// a.zoom = 2

// console.log(a)
let x,y,a=255,bl=0,c=0;
let S1, S2;


S1 = Screen.init([100,100], {
	zoom:4,
	doubleBuffer:false,
	blur:true
})

S2 = Screen.init([320,240], {
	zoom:2,
	doubleBuffer:true,
	background:[0,0,0,218]
})


document.onclick = function() {
	S1.parent = document.getElementById('jon')
	S1.doubleBuffer = true
	S1.refresh()
}

function d(){

	S2.clear()
	S2.background = [c=(c+1)%256,0,0,218]

	bl=(bl+1)%2


	for(let i=0;i<320;i++) {
		x=Math.random()*320
		y=Math.random()*240
		//a=i & 255
		S2.pset([x, y], [a,a,a,128])
		S2.pset([i, i*0.75], [0,0,255, 218])
		x=Math.random()*100
		y=Math.random()*100
		S1.pset([x, y], bl ?  [255,255,255] : [0,0,0])
	}

	S2.refresh()

}

window.setInterval(d,20)

