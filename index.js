import Screen from './js/screen.js'

let a=Screen.init()

console.log(Screen)


a.zoom = 2

console.log(a)

Screen.init([100,100])
Screen.width = 55
console.log(Screen.zoom)
console.log(Screen.width)
console.log(Screen.height)

Screen.pw()
a.pw()


