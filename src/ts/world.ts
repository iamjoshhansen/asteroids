class World {
	
	ships:Ship[];
	asteroids:Asteroid[];
	beams:LazerBeam[];
	box:BoundingBox;

	constructor (players:number, width:number, height:number, asteroids:number) {
		this.box = new BoundingBox(new Point(0,0), new Point(width,height));

		this.ships = [];
		this.asteroids = [];
		this.beams = [];


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
				random_movement_vector.multiply(_.random(1, 2, true));
				starting_point.add(random_offset_vector);
				
				let asteroid:Asteroid = new Asteroid(this, starting_point, random_movement_vector, _.random(5, 20)*2);
				
				this.asteroids.push(asteroid);
			}
			console.log('Asteroids: ' + _.padLeft('', asteroids, '.'));
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

			_.each(this.asteroids, function (thing:Thing) {
				thing.step();
			});


		/*	beams
		------------------------------------------*/
			_.remove(this.beams, {is_active:false});

			_.each(this.beams, function (thing:Thing) {
				thing.step();
			});
		

		/*	Collision: Beams & Asteroids
		------------------------------------------*/
			_.each(self.asteroids, function (asteroid:Asteroid) {
				_.each(self.beams, function (beam) {
					let distance:number = Point.distance(asteroid.p, beam.p);
					if (distance < 5 + asteroid.size) {
						beam.die();
						asteroid.breakOrDie();
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
