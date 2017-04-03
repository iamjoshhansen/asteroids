import * as _ from "lodash";
import { World } from './world';
import { Thing } from './thing';
import { Point } from './point';
import { Vector } from './vector';

export class Asteroid extends Thing {

	active:boolean;
	size:number;

	constructor (world:World, position:Point, pos_momentum:Vector, size:number) {
		super(world, position, pos_momentum);
		this.size = size;
		this.active = true;
	}

	breakOrDie () {
		if (this.size > 20) {
			let v1 = new Vector(this.pm.x, this.pm.y);
			v1.rotate(10);
			this.world.addAsteroid(new Point(this.p.x, this.p.y), v1, this.size / 2);
			
			let v2 = new Vector(this.pm.x, this.pm.y);
			v2.rotate(-10);
			this.world.addAsteroid(new Point(this.p.x, this.p.y), v2, this.size / 2);
		}

		return this.die();
	}

}