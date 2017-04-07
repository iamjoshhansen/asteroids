import * as _ from "lodash";
import SpriteUI from './sprite';
import { Asteroid } from '../asteroid';
import { Rotation } from '../rotation';


export default class AsteroidUI extends SpriteUI {

	asteroid:Asteroid;

	constructor (asteroid:Asteroid) {
		super(asteroid.p, new Rotation(asteroid.r), 1, './images/asteroid-' + _.random(1,2) + '-sprite.png', 1024, 512, 8, 4);
		this.asteroid = asteroid;
	}

	updateAndRender (ctx:CanvasRenderingContext2D) {
		this.scale = this.asteroid.size / 128;
		this.p.moveTo(this.asteroid.p);
		this.r.angle = this.asteroid.r;
		this.frame += 0.5;
		return super.updateAndRender(ctx);
	}

}
