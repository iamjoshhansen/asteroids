import { Point } from '../point';
import { Rotation } from '../rotation';
import { Thing } from '../thing';

export default class UI {

	p:Point;
	r:Rotation;
	scale:number;
	is_active:boolean;

	constructor (position:Point, rotation:Rotation, scale:number) {
		this.p = new Point(position.x, position.y);
		this.r = new Rotation(rotation.angle);
		this.scale = scale;
		this.is_active = true;
	}

	render (ctx:CanvasRenderingContext2D) {
		console.warn('UI does not render anything.');
		return this;
	}

	updateAndRender (ctx:CanvasRenderingContext2D) {
		return this.render(ctx);
	}

}
