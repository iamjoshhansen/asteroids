var render_handlers = {
		
		ship: function (ctx:CanvasRenderingContext2D, ship:Ship) {
			ctx.save();
			ctx.translate(ship.p.x, ship.p.y);
			let scale = 20;
			ctx.scale(scale, scale);
			ctx.rotate(ship.r * Math.PI / 180);
			// draw below

			ctx.beginPath();
			ctx.moveTo(2, 0);
			ctx.lineTo(-0.5, 1);
			ctx.lineTo(-0.5, -1);
			ctx.closePath();

			ctx.fillStyle  = '#f9f9f9';
			ctx.fill();
			
			// keep last
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

			ctx.strokeStyle = '#9ff';
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
