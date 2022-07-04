export function randomizer(seed = +(new Date())) {

	let
		mash = makeMash(),
		c = 1,
		s = [...'   '].map(mash)

	s.forEach((_,i,a)=>{
		a[i] -= mash(seed)
		if (a[i]<0) a[i] += 1
	})
	mash = null

	return () => {
		const t = 2091639 * s[0] + c * 2.3283064365386963e-10
		s[0] = s[1]
		s[1] = s[2];
		return s[2] = t - (c = t | 0)
  }

}

export let rnd = randomizer()

export const randomize = (seed=undefined) => rnd = randomizer(seed)

function makeMash() {
	let n = 0xefc8249d
	const mash = function (data) {
		data = String(data);
		for (let i = 0; i < data.length; i++) {
			n += data.charCodeAt(i)
			let h = 0.02519603282416938 * n
			n = h >>> 0
			h -= n
			h *= n
			n = h >>> 0
			h -= n
			n += h * 0x100000000
		}
		return (n >>> 0) * 2.3283064365386963e-10
	}
	return mash
}