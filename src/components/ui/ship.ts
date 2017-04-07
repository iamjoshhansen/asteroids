import ImageUI from './image';
import { Ship } from '../ship';
import { Rotation } from '../rotation';

export default class ShipUI extends ImageUI {

	ship:Ship;

	constructor (ship:Ship) {
		super(ship.p, new Rotation(ship.r), 0.5, './images/spaceship.svg', 100, 100, true);
		this.ship = ship;
	}

	render (ctx:CanvasRenderingContext2D) {
		super.render(ctx);
		ctx.save();
		ctx.translate(this.ship.p.x, this.ship.p.y);
		ctx.fillStyle = '#999';
		ctx.font = '24px "Exo 2"';

		/*	Name & Score
		------------------------------------------*/
			let left:number = 75 * this.scale;
			ctx.fillText(this.ship.name, left, 0);
			ctx.fillText(this.ship.score.toString(), left, 25);
			ctx.restore();


		/*	Thrust
		------------------------------------------*/
			ctx.save();
			ctx.scale(25,25);

			let rocket_width:number = 0.1;
			ctx.beginPath();
			ctx.moveTo(-this.ship.thrust - 1, 0);
			ctx.lineTo(-1, rocket_width);
			ctx.lineTo(-1, -rocket_width);
			ctx.closePath();
			ctx.fillStyle  = '#f90';
			ctx.fill();

			ctx.restore();

		/*	Reverse Thrust :: Left
		------------------------------------------*/
			ctx.save();
			ctx.translate(0.75,-0.4);
			ctx.rotate(-5 * Math.PI / 6);

			ctx.beginPath();
			ctx.moveTo(0, this.ship.reverse_thrust / 2);
			ctx.lineTo(-0.25, 0);
			ctx.lineTo(0.25, 0);
			ctx.closePath();

			ctx.fillStyle  = '#09f';
			ctx.fill();

			ctx.restore();


		/*	Reverse Thrust :: Right
		------------------------------------------*/
			ctx.save();
			ctx.translate(0.75,0.4);
			ctx.rotate(11 * Math.PI / 6);

			ctx.beginPath();
			ctx.moveTo(0, this.ship.reverse_thrust / 2);
			ctx.lineTo(-0.25, 0);
			ctx.lineTo(0.25, 0);
			ctx.closePath();

			ctx.fillStyle  = '#09f';
			ctx.fill();

			ctx.restore();


		return this;
	}

	updateAndRender (ctx:CanvasRenderingContext2D) {
		this.p.moveTo(this.ship.p);
		this.r.angle = this.ship.r + 90;
		return this.render(ctx);
	}

}
