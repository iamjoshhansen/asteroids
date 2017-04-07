import * as _ from "lodash";

import { Ship } from './ship';
import { Asteroid } from './asteroid';
import { LazerBeam } from './lazer-beam';
import { BoundingBox } from './bounding-box'
import { Point } from './point';
import { Vector } from './vector';
import { Thing } from './thing';
import { Rotation } from './rotation';
import UI from './ui/index';

export default class World {

	ships:Ship[];
	asteroids:Asteroid[];
	beams:LazerBeam[];
	box:BoundingBox;
	uis:Array<UI>;

	constructor (players:number, width:number, height:number, asteroids:number) {
		this.box = new BoundingBox(new Point(0,0), new Point(width,height));

		this.ships = [];
		this.asteroids = [];
		this.beams = [];
		this.uis = [];


		/*	Ships
		------------------------------------------*/
			console.group('Generating Ships');
			for (var i = 0; i < players; i++) {
				let ship:Ship = this.addShip(new Point(window.innerWidth + _.random(-window.innerWidth,window.innerWidth) / 5, window.innerHeight + _.random(-window.innerHeight,window.innerHeight) / 5));
				ship.bindToGamepad(i);
				console.log('Added `' + ship.name + '`');
			}
			console.groupEnd();


		/*	Asteroids
		------------------------------------------*/
			console.group('Generating Asteroids');
			for (var i = 0; i < asteroids; i++) {
				let starting_point = new Point(this.ships[0].p.x, this.ships[0].p.y),
					random_offset_vector = Rotation.getNormalizedVector(Math.random() * 360),
					random_movement_vector = Rotation.getNormalizedVector(Math.random() * 360);

				random_offset_vector.multiply(_.random(300, 400, true));
				random_movement_vector.multiply(_.random(0.5, 1, true));
				//random_movement_vector.multiply(0);
				starting_point.add(random_offset_vector);

				let asteroid:Asteroid = new Asteroid(this, starting_point, random_movement_vector, _.random(20, 100));
				asteroid.rm = _.random(-0.25, 0.25, true);

				this.asteroids.push(asteroid);
			}
			console.log('Asteroids: ' + _.padStart('', asteroids, '.'));
			console.groupEnd();
	}


	step () {
		let self = this;

		/*	ships
		------------------------------------------*/
			_.remove(this.ships, {is_active:false});

			_.each(this.ships, function (thing:Thing) {
				thing.step();
			});



		/*	asteroids
		------------------------------------------*/
			_.remove(this.asteroids, {is_active:false});

			if (this.asteroids.length < 20 && _.random(0,100) === 0) {
				let starting_point = new Point(this.ships[0].p.x, this.ships[0].p.y),
					random_offset_vector = Rotation.getNormalizedVector(Math.random() * 360),
					movement_vector = Rotation.getNormalizedVector(Math.random() * 360);

				random_offset_vector.multiply(_.random(500, 600));
				movement_vector.multiply(_.random(0.5, 1, true));
				//movement_vector.multiply(0);
				starting_point.add(random_offset_vector);

				this.addAsteroid(starting_point, movement_vector, _.random(50,100));
			}

			_.each(this.asteroids, function (asteroid:Asteroid) {
				asteroid.step();
			});


		/*	beams
		------------------------------------------*/
			_.remove(this.beams, {is_active:false});

			_.each(this.beams, function (thing:Thing) {
				thing.step();
			});


		/*	UIs
		------------------------------------------*/
			_.remove(this.uis, {is_active:false});


		/*	Collision: Beams & Asteroids
		------------------------------------------*/
			_.each(self.asteroids, function (asteroid:Asteroid) {
				_.each(self.beams, function (beam) {
					let distance:number = Point.distance(asteroid.p, beam.p);
					if (distance < 5 + asteroid.size) {
						beam.die();
						asteroid.breakOrDie();
						beam.owner.score++;
					}
				});
			});


		/*	Collision: Ships and Asteroids
		------------------------------------------*/
			_.each(self.asteroids, function (asteroid) {
				_.each(self.ships, function (ship) {
					let distance:number = Point.distance(asteroid.p, ship.p);
					if (distance < 20 + asteroid.size) {
						ship.die();
						asteroid.breakOrDie();
					}
				});
			});
	}


	addShip (position:Point) {
		this.ships.push(new Ship(this, position));
		return _.last(this.ships);
	}


	addAsteroid (position:Point, pos_momentum:Vector, size:number) {
		this.asteroids.push(new Asteroid(this, position, pos_momentum, size));
		return _.last(this.asteroids);
	}

}
