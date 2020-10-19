export { Screen as default }


// function wrap(f) {
// a={[f.name]:function() { console.log('dddde'); f(); }};

//     return this[f.name] = a[f.name];
// }

let latestManager

let _init = function(
		[width, height] = [640, 480],
		{
			zoom = 1,
			blur = false,
			pages = 2,
			parent = document.body,
			activePage = 0,
			viewPage = 0
		} = {}
) {

	latestManager = managerFactory( [width, height], { zoom, blur, pages, parent, activePage, viewPage })
	Screen = add_init(new Proxy(latestManager, {}))
	return latestManager

}


let Screen = add_init({})


function add_init(obj) {
	obj.init = _init
	return obj
}

function managerFactory(
	[width, height],
	{ zoom, blur, pages, parent, activePage, viewPage	}
) {

	const _pw=function() { alert(this.width)}

	return {
		get width() { return width }, set width(_) {},
		get height() { return height },	set height(_) {},
		get pages() { return pages },	set pages(_) {},
		zoom,
		pw:_pw
	}

}