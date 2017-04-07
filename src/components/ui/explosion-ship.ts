import SpriteUI from './sprite';
import { Rotation } from '../rotation';
import { Point } from '../point';


export default class ExplosionShipUI extends SpriteUI {

	constructor (position:Point) {
		super(position, new Rotation(0), 0.5, './images/explosion-ship-sprite-fade_8_easeinout.png', 2048, 1024, 8, 4);
	}

	updateAndRender (ctx:CanvasRenderingContext2D) {
		this.frame++;
		if (this.frame == this.maxFrame()) {
			this.is_active = false;
		}
		if (this.is_active) {
			super.updateAndRender(ctx);
		}
		return this;
	}

}
