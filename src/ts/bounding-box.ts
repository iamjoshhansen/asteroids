class BoundingBox {
	
	p1:Point;
	p2:Point;

	constructor (p1:Point, p2:Point) {
		this.p1 = p1;
		this.p2 = p2;
	}

	width () {
		return this.p2.x - this.p1.x;
	}

	height () {
		return this.p2.y - this.p1.y;
	}

}