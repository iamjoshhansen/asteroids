import { Thing } from './thing';
import { Point } from './point';
import { Vector } from './vector';
import World from './world';
import { Ship } from './ship';
import { Rotation } from './rotation';

export class LazerBeam extends Thing {

	life:number;
	owner:Ship;

	constructor (world:World, position:Point, degrees:number, owner:Ship) {
		let pos_momentum = Rotation
				.getNormalizedVector(degrees)
				.multiply(LazerBeam.speed);

		let pos = new Point(position.x, position.y);

		super(world, pos, pos_momentum);

		this.owner = owner;
		this.r = pos_momentum.angle();

		this.life = LazerBeam.lifespan;
	}

	step () {
		super.step();

		//console.log(`Lazer has lived life ${this.life} : ${this.is_active}`);

		this.life--;
		if (this.life < 0) {
			this.die();
		}

		return this;
	}

	static lifespan:number = 400;
	static speed:number = 5;

}
