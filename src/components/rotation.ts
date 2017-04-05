import { Vector } from './vector';

export class Rotation {

	angle: number;

	constructor (degrees:number) {
		this.angle = degrees;
	}

	static getNormalizedVector (degrees:number) {
		let x = Math.cos(degrees * Math.PI / 180),
			y = Math.sin(degrees * Math.PI / 180);
		return new Vector(x, y);
	}

	getVector (magnitude:number = 1) {
		return Rotation
			.getNormalizedVector(this.angle)
			.multiply(magnitude);
	}

}