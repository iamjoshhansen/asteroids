import { Thing } from './thing';
import { Ship } from './ship';
import { LazerBeam } from './lazer-beam';
import { Asteroid } from './asteroid';

export let render_handlers: {[key:string]:any;} = {

		ship: function (ctx:CanvasRenderingContext2D, ship:Ship) {
			ctx.save();
			ctx.translate(ship.p.x, ship.p.y);
			let scale = 25;
			ctx.scale(scale, scale);
			ctx.rotate(ship.r * Math.PI / 180);
			// draw below

			/*	Reverse Thrust :: Left
			------------------------------------------*/
				ctx.save();
				ctx.translate(0.75,-0.4);
				ctx.rotate(-5 * Math.PI / 6);

				ctx.beginPath();
				ctx.moveTo(0, ship.reverse_thrust / 2);
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
				ctx.moveTo(0, ship.reverse_thrust / 2);
				ctx.lineTo(-0.25, 0);
				ctx.lineTo(0.25, 0);
				ctx.closePath();

				ctx.fillStyle  = '#09f';
				ctx.fill();

				ctx.restore();


			/*	Body
			------------------------------------------*/
				// ctx.beginPath();
				// ctx.moveTo(2, 0);
				// ctx.lineTo(-0.5, 1);
				// ctx.lineTo(-0.5, -1);
				// ctx.closePath();
				// ctx.fillStyle  = 'rgba(0,0,255,0.15)'; '#f9f9f9';
				// ctx.fill();

				ctx.save();
				ctx.scale(1/scale, 1/scale);
				ctx.scale(0.5,0.5);
				ctx.translate(50,-50);
				ctx.rotate(Math.PI / 2);

				if (Ship.img_loaded) {
					ctx.drawImage(Ship.img, 0, 0);
				}

				ctx.restore();


			/*	Thrust
			------------------------------------------*/
				let rocket_width:number = 0.1;
				ctx.beginPath();
				ctx.moveTo(-ship.thrust - 1, 0);
				ctx.lineTo(-1, rocket_width);
				ctx.lineTo(-1, -rocket_width);
				ctx.closePath();
				ctx.fillStyle  = '#f90';
				ctx.fill();

			
			ctx.restore();

			/*	Player Name
			------------------------------------------*/
				ctx.save();
				ctx.translate(ship.p.x, ship.p.y);
				ctx.fillStyle = '#999';
				ctx.font = '24px "Exo 2"';
				ctx.fillText(ship.name, 2*scale, 0);
				ctx.restore();
		},


		beam: function (ctx:CanvasRenderingContext2D, beam:LazerBeam) {
			ctx.save();
			ctx.translate(beam.p.x, beam.p.y);
			ctx.rotate(beam.r * Math.PI / 180);
			// draw below

			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(-30, 0);

			ctx.strokeStyle = 'rgba(100,255,255,' + Math.min(1, 2 * beam.life / LazerBeam.lifespan) + ')';
			ctx.stroke();

			// keep last
			ctx.restore();
		},

		asteroid: function (ctx:CanvasRenderingContext2D, asteroid:Asteroid) {
			ctx.save();
			ctx.translate(asteroid.p.x, asteroid.p.y);
			ctx.rotate(asteroid.r * Math.PI / 180);
			// draw below

			ctx.beginPath();
			ctx.arc(0,0,asteroid.size, 0, Math.PI*2);

			ctx.strokeStyle = '#f90';
			ctx.fillStyle = 'rgba(200,100,0,0.25)';
			ctx.fill();
			ctx.stroke();

			// keep last
			ctx.restore();
		}

	};
