class Rotation {

	angle: number;

	constructor (degrees:number) {
		this.angle = degrees;
	}

	static getNormalizedVector (degrees:number) {
		let x = Math.cos(degrees * Math.PI / 180),
			y = Math.sin(degrees * Math.PI / 180);
		return new Vector(x, y);
	}

}