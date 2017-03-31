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








class Vector extends Point {

	constructor (x:number, y:number) {
		super(x,y);
		Vector.not = new Point(0,0);
	}

	static not:Point;

	static add (a:Vector, b:Vector) {
		return new Vector(
				a.x + b.x,
				a.y + b.y
			);
	}

	magnitude () {
		return (Vector.not).distanceTo(this);
	}

	add (v:Vector) {
		let p = Vector.add(this, v);
		this.moveTo(p);
	}

	angle () {
		return Math.atan2(this.y, this.x) * 180 / Math.PI + 180;
	}

}





class Thing {
	
	pos:Point;
	mom:Vector;

	constructor (p:Point, v:Vector) {
		this.pos = p;
		this.mom = v;
	}

	applyMomentum () {
		this.pos.add(this.mom);
	}

}





class Ship extends Thing {

	rot:number;

	constructor (p:Point) {
		super(new Point(p.x, p.y), new Vector(0, 0));
		this.rot = 0;
	}

}





class LazerBeam extends Thing {

	constructor (ship: Ship) {
		super(ship.pos, ship.mom);
	}

}





console.log('==============');




let a:Point = new Point(0, 0);
let b:Point = new Point(30, 40);

let ship:Ship = new Ship(a);

console.log(ship);

console.log('------------');
console.log('ship.pos: ', ship.pos);

for (var i=0; i<20; i++) {
	var d = Point.distance(ship.pos, b);
	ship.pos.moveToward(b, Math.min(3, d));
	console.log('ship.pos: ', ship.pos);
}
