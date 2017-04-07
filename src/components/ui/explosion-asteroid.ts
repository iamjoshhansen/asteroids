import SpriteUI from './sprite';
import { Rotation } from '../rotation';
import { Point } from '../point';


export default class ExplosionAsteroidUI extends SpriteUI {

	constructor (position:Point) {
		super(position, new Rotation(0), 1, './images/explosion-cartoon-sprite_590x118.png', 590, 118, 5, 1);
	}

	updateAndRender (ctx:CanvasRenderingContext2D) {
		this.frame += 0.2;
		if (this.frame > this.maxFrame()) {
			this.is_active = false;
		}
		if (this.is_active) {
			super.updateAndRender(ctx);
		}
		return this;
	}

}
