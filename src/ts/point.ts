class Point {
	
	x:number;
	y:number;
	
	constructor (x:number, y:number) {
		this.x = x;
		this.y = y;
	}

	static distance (a:Point, b:Point) {
		return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
	}

	static add (p:Point, v:Vector) {
		return new Point(
				p.x + v.x,
				p.y + v.y
			);
	}

	distanceTo (b:Point) {
		return Point.distance(this, b);
	}

	add (v:Vector) {
		let p = Point.add(this, v);
		this.moveTo(p);
	}

	moveTo (p:Point) {
		this.x = p.x;
		this.y = p.y;
	}

	moveToward (p:Point, s:number) {
		let d = this.distanceTo(p);

		if (d > 0) {
			let r = s / d,
				dx = p.x - this.x,
				dy = p.y - this.y,
				v = new Vector(
					dx * r,
					dy * r
				);

			this.add(v);
		} else {
			console.log(' ! moving toward same point');
		}
	}

}