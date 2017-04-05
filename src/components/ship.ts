import { Thing } from './thing';
import { Vector } from './vector';
import { Point } from './point';
import { World } from './world';
import { GamePad } from './gamepad';
import { Rotation } from './rotation';
import { LazerBeam } from './lazer-beam';

export class Ship extends Thing {

	lazer_cannon_cooldown:number;
	thrust:number;
	reverse_thrust:number;
	bound_gamepad:GamePad;
	name:string;

	constructor (world:World, position:Point) {
		super(world, new Point(position.x, position.y), new Vector(0, 0));
		this.position_drag = 0.995;
		this.rotation_drag = 0.99;
		this.lazer_cannon_cooldown = 0;
		this.bound_gamepad = null;
		this.thrust = 0;
		this.reverse_thrust = 0;
		this.name = '?';
	}

	static lazer_cannon_distance:number = 50;
	static lazer_cannon_cooldown:number = 25;

	static img_loaded:boolean = false;
	static img:HTMLImageElement = new Image(100,100);

	static gamepad_handler = {

		strafe: function (ship:Ship) {
			let pm_ratio:number = 0.05;
			
			if (Math.abs(ship.bound_gamepad.left_x) > 0.1) {
				ship.pm.x += ship.bound_gamepad.left_x * pm_ratio;
			}
			if (Math.abs(ship.bound_gamepad.left_y) > 0.1) {
				ship.pm.y += ship.bound_gamepad.left_y * pm_ratio;
			}

			let max = 10;
			ship.pm.x = Math.min(max, ship.pm.x);
			ship.pm.x = Math.max(-max, ship.pm.x);

			ship.pm.y = Math.min(max, ship.pm.y);
			ship.pm.y = Math.max(-max, ship.pm.y);

			ship.r = new Vector(ship.bound_gamepad.right_x, ship.bound_gamepad.right_y).angle() + 180;

			if (ship.bound_gamepad.right_trigger > 0.25) {
				ship.fire();
			}
		},

		standard: function (ship:Ship) {
			let pm_ratio:number = 0.02;

			if (Math.abs(ship.bound_gamepad.left_x) > 0.1) {
				ship.rm += ship.bound_gamepad.left_x * pm_ratio;
			}

			let max = 2;
			ship.rm = Math.min(max, ship.rm);
			ship.rm = Math.max(-max, ship.rm);

			if (Math.abs(ship.bound_gamepad.left_y) > 0.1) {
				//ship.rm.y += ship.bound_gamepad.left_y * pm_ratio;
			}


			/*	Trhusting : Triggers
			------------------------------------------*/
				// if (ship.bound_gamepad.a) {
				// 	ship.fire();
				// }
				// ship.thrust = ship.bound_gamepad.right_trigger;
				// ship.reverse_thrust = ship.bound_gamepad.left_trigger;
			
			/*	Trhusting : Left Stick
			------------------------------------------*/
				if (ship.bound_gamepad.right_trigger > 0.25) {
					ship.fire();
				}
				if (Math.abs(ship.bound_gamepad.left_y) > 0.1) {
					ship.thrust = -Math.min(0, ship.bound_gamepad.left_y);
					ship.reverse_thrust = Math.max(0, ship.bound_gamepad.left_y);
				} else {
					ship.thrust = 0;
					ship.reverse_thrust = 0;
				}
		}

	};


	step () {
		super.step();
		if (this.lazer_cannon_cooldown > 0) {
			this.lazer_cannon_cooldown--;
		}

		/*	Thrust
		------------------------------------------*/
			let thrust_vector = Rotation.getNormalizedVector(this.r);
			thrust_vector.multiply(this.thrust * 0.03);
			this.pm.add(thrust_vector);

		/*	Reverse Thrust
		------------------------------------------*/
			let reverse_thrust_vector = Rotation.getNormalizedVector(this.r);
			reverse_thrust_vector.multiply(-this.reverse_thrust * 0.03 * 0.5);
			this.pm.add(reverse_thrust_vector);

		return this;
	}

	fire () {
		if (this.lazer_cannon_cooldown === 0) {
			this.world.beams.push(new LazerBeam(this));
			this.lazer_cannon_cooldown = Ship.lazer_cannon_cooldown;
			return true;
		}
		return false;
	}


	bindToGamepad (index:number) {
		this.bound_gamepad = new GamePad(index);
		this.name = 'Player ' + (index+1);
		
		return this;
	}

	pingControlls () {
		let has_gamepad = !! this.bound_gamepad;

		if (has_gamepad) {

			let is_gamepad_active:boolean = this.bound_gamepad.ping();

			if (is_gamepad_active) {
				Ship.gamepad_handler.standard(this);
				return true;
			}
		}

		return false;
	}

}

Ship.img.src = './images/spaceship.svg';
Ship.img.onload = function () {
	Ship.img_loaded = true;
	console.log('image loaded!');
}