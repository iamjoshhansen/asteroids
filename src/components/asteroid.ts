import * as _ from "lodash";
import World from './world';
import { Thing } from './thing';
import { Point } from './point';
import { Vector } from './vector';

import ExplosionAsteroidUI from './ui/explosion-asteroid';

export class Asteroid extends Thing {

	active:boolean;
	size:number;
	age:number;
	sprite_offset:number;
	a_b:boolean;

	constructor (world:World, position:Point, pos_momentum:Vector, size:number) {
		super(world, position, pos_momentum);
		this.size = size;
		this.active = true;
		this.sprite_offset = _.random(0,Asteroid.sprite_count-1);
		this.a_b = Math.random() > 0.5;
	}

	static sprite_count:number = 64;
	static img:HTMLImageElement = new Image(1024,1024);
	static img_loaded:boolean = false;

	breakOrDie () {
		if (this.size > 20) {
			let v1 = new Vector(this.pm.x, this.pm.y);
			v1.rotate(10);
			this.world.addAsteroid(new Point(this.p.x, this.p.y), v1, this.size / 2);

			let v2 = new Vector(this.pm.x, this.pm.y);
			v2.rotate(-10);
			this.world.addAsteroid(new Point(this.p.x, this.p.y), v2, this.size / 2);
		} else {
			let explosion:ExplosionAsteroidUI = new ExplosionAsteroidUI(this.p);
			this.world.uis.push(explosion);
		}

		return this.die();
	}

	die () {
		super.die();
		return this;
	}

	step () {
		super.step();
		//this.sprite_offset = (this.sprite_offset + 1) % Asteroid.sprite_count;
		this.sprite_offset++;
		return this;
	}

}

Asteroid.img.src = './images/asteroid-sprite.png';
Asteroid.img.onload = function () {
	Asteroid.img_loaded = true;
	console.log('Asteroid image loaded!');
}
