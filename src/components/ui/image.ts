import { Point } from '../point';
import { Rotation } from '../rotation';
import UI from './index';

export default class ImageUI extends UI {

	src:string;
	is_loaded:boolean;
	img:HTMLImageElement;
	width:number;
	height:number;
	is_centered:boolean;

	constructor (position:Point, rotation:Rotation, scale:number, src:string, width:number, height:number, is_centered?:boolean) {
		super(position, rotation, scale);

		let self = this;

		self.width = width;
		self.height = height;

		self.is_loaded = false;
		self.img = new Image(width, height);
		self.img.onload = function () {
			self.is_loaded = true;
		};
		self.img.src = src;
		this.is_centered = is_centered || false;
	}

	render (ctx:CanvasRenderingContext2D) {
		ctx.save();
		ctx.translate(this.p.x,this.p.y);
		ctx.scale(this.scale,this.scale);
		ctx.rotate(this.r.angle * Math.PI / 180);
		if (this.is_centered) {
			ctx.translate(-this.width/2, -this.height/2);
		}
		ctx.drawImage(this.img, 0, 0);
		ctx.restore();

		return this;
	}

}
