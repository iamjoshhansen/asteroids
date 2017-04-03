import { Point } from './point';
import { Rotation } from './rotation';

export class Vector extends Point {

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

	multiply (amount:number) {
		this.x *= amount;
		this.y *= amount;
		return this;
	}

	add (v:Vector) {
		let p = Vector.add(this, v);
		this.moveTo(p);
		return this;
	}

	rotate (degrees:number) {
		let new_angle = Rotation.getNormalizedVector(degrees + this.angle() + 180); // why +180 again?? why?1?
		new_angle.multiply(this.magnitude());
		this.moveTo(new_angle);
		return this;
	}

	angle () {
		return Math.atan2(this.y, this.x) * (180 / Math.PI) + 180;
	}

}