import * as _ from "lodash";
import World from './components/world';
import UI from './components/ui/index';

import { Ship } from './components/ship';
import ShipUI from './components/ui/ship';

import { Asteroid } from './components/asteroid';
import AsteroidUI from './components/ui/asteroid';

import { LazerBeam } from './components/lazer-beam';
import LazerBeamUI from './components/ui/lazer-beam';

import { render_handlers } from './components/render-handlers';

import ExplosionShipUI from './components/ui/explosion-ship';


let player_count:number = _.filter(navigator.getGamepads()).length;
console.log('player_count: ', player_count);

let world = new World(player_count, window.innerWidth*2, window.innerHeight*2, 10);

Object.defineProperty(window, 'world', {
	value: world
});

let cnv = <HTMLCanvasElement> document.getElementById('canvas');

let w:number = window.innerWidth,
	h:number = window.innerHeight;

cnv.style.width = w + 'px';
cnv.style.height = h + 'px';

cnv.setAttribute('width',  (w*2) + 'px');
cnv.setAttribute('height', (h*2) + 'px');

let ctx: CanvasRenderingContext2D = cnv.getContext('2d');

let button: { [key:string]: boolean; } = {
		w: false,
		a: false,
		s: false,
		d: false,
		lt: false,
		rt: false,
		dn: false,
		up: false,
		sp: false
	};

let button_map: { [key:number]: string; } = {
		87: 'w',
		65: 'a',
		83: 's',
		68: 'd',
		32: 'sp',
		38: 'up',
		39: 'rt',
		40: 'dn',
		37: 'lt'
	};


$(window)
	.on('keydown', function (ev:JQueryEventObject) {
		let kc:number = ev.keyCode;
		//console.log(kc);

		if (kc in button_map) {
			button[button_map[kc]] = true;
		}
	})
	.on('keyup', function (ev:JQueryEventObject) {
		let kc:number = ev.keyCode;
		if (kc in button_map) {
			button[button_map[kc]] = false;
		}
	});


setInterval(function () {
	// Server Game logic -- NOT rendering
	world.step();
}, 60 / 1000);


setInterval(function () {

	// Local game logic -- NOT rendering or server game logic


	_.each(world.ships, function (ship) {
		ship.pingControlls();
	});

	// /*	Player 2
	// --------------------------*/

	// 	(function (my_ship:Ship) {

	// 		if (my_ship) {
	// 			let pm_ratio = 0.01;

	// 			if (button.w) {
	// 				my_ship.pm.y -= pm_ratio;
	// 			}

	// 			if (button.s) {
	// 				my_ship.pm.y += pm_ratio;
	// 			}

	// 			if (button.a) {
	// 				my_ship.pm.x -= pm_ratio;
	// 			}

	// 			if (button.d) {
	// 				my_ship.pm.x += pm_ratio;
	// 			}

	// 			if (button.sp) {
	// 				let did_fire:boolean = my_ship.fire();
	// 			}


	// 			var arrow_val =
	// 					(button.up ? '1' : '0') +
	// 					(button.rt ? '1' : '0') +
	// 					(button.dn ? '1' : '0') +
	// 					(button.lt ? '1' : '0');


	// 			var direction_map = {
	// 					'1000': -90,
	// 					'0100': 0,
	// 					'0010': 90,
	// 					'0001': 180
	// 				};


	// 			if (arrow_val in direction_map) {
	// 				var r = direction_map[arrow_val];
	// 				my_ship.r = r;
	// 			}
	// 		}
	// 	})(world.ships[1]);



}, 60 / 1000);



function step() {

	ctx.fillStyle  = '#101010';
	ctx.fillRect(0, 0, cnv.width, cnv.height);

	/*	Ships
	---------------------------*/
		_.each(world.ships, function (ship:Ship) {
			//render_handlers.ship(ctx, ship);

			if ( ! ship.ui) {
				ship.ui = new ShipUI(ship);
			}

			ship.ui.updateAndRender(ctx);
		});

	/*	LazerBeams
	---------------------------*/
		_.each(world.beams, function (beam:LazerBeam) {
			if ( ! beam.ui) {
				beam.ui = new LazerBeamUI(beam);
			}

			beam.ui.updateAndRender(ctx);

			// render_handlers.beam(ctx, beam);
		});

	/*	Asteroids
	---------------------------*/
		_.each(world.asteroids, function (asteroid:Asteroid) {
			if ( ! asteroid.ui) {
				asteroid.ui = new AsteroidUI(asteroid);
			}

			asteroid.ui.updateAndRender(ctx);

			//render_handlers.asteroid(ctx, asteroid);
		});


	/*	Explosions
	------------------------------------------*/
		_.each(world.uis, function (ui:UI) {
			ui.updateAndRender(ctx);
		});

	window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
