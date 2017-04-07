import ImageUI from './image';
import { Point } from '../point';
import { Rotation } from '../rotation';

export default class SpriteUI extends ImageUI {

	frame:number;
	rows:number;
	cols:number;

	constructor (position:Point, rotation:Rotation, scale:number, src:string, width:number, height:number, cols:number, rows:number) {
		super(position, rotation, scale, src, width, height);

		this.frame = 0;
		this.rows = rows;
		this.cols = cols;
	}

	render (ctx:CanvasRenderingContext2D) {
		ctx.save();
		ctx.translate(this.p.x,this.p.y);
		ctx.scale(this.scale,this.scale);
		ctx.rotate(this.r.angle * Math.PI / 180);
		if (this.is_centered) {
			ctx.translate(-this.width/2, -this.height/2);
		}

		let frame_mod:number = Math.floor(this.frame) % this.maxFrame(),
			frame_width:number = this.width / this.cols,
			frame_height:number = this.height / this.rows,
			col:number = frame_mod % this.cols,
			row:number = Math.floor(frame_mod / this.cols);

		//console.log(`[${col} of ${this.cols}, ${row} of ${this.rows}]`);

		ctx.drawImage(
			this.img, // img
			col * frame_width, row * frame_height, // sx, sy
			frame_width, frame_height, // sw, sh
			-frame_width, -frame_height, // dx, dy
			frame_width * 2, frame_height * 2 // dw, dh
		);

		ctx.restore();

		return this;
	}

	updateAndRender (ctx:CanvasRenderingContext2D) {
		super.updateAndRender(ctx);
		return this;
	}

	maxFrame ():number {
		return (this.rows * this.cols);
	}

}
