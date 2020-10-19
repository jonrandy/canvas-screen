export { Screen as default }

// Proxy??

// function wrap(f) {
// a={[f.name]:function() { console.log('dddde'); f(); }};

//     return this[f.name] = a[f.name];
// }

let latestManager

let Screen = {

	init (
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
		return latestManager

	}

}

function managerFactory(
	[width, height],
	{ zoom, blur, pages, parent, activePage, viewPage	}
) {


}