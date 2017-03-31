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

		for (var i = 0; i < players; i++) {
			this.addShip(new Point((i+1) * window.innerWidth / 5, (i+1) * window.innerHeight / 5));
		}

		for (var i = 0; i < asteroids; i++) {
			let starting_point = new Point(this.ships[0].p.x, this.ships[0].p.y),
				random_offset_vector = Rotation.getNormalizedVector(Math.random() * 360),
				random_movement_vector = Rotation.getNormalizedVector(Math.random() * 360);
			
			random_offset_vector.multiply(_.random(100, 300, true));
			random_movement_vector.multiply(_.random(1, 3, true));
			starting_point.add(random_offset_vector);
			
			let asteroid:Asteroid = new Asteroid(this, starting_point, random_movement_vector, _.random(5, 20)*2);
			
			this.asteroids.push(asteroid);
		}
	}


	step () {
		
		/*	ships
		---------------------------*/
			_.remove(this.ships, {is_active:false});

			_.each(this.ships, function (thing:Thing) {
				thing.step();
			});


		/*	asteroids
		---------------------------*/
			_.remove(this.asteroids, {is_active:false});

			_.each(this.asteroids, function (thing:Thing) {
				thing.step();
			});

		/*	beams
		---------------------------*/
			_.remove(this.beams, {is_active:false});

			_.each(this.beams, function (thing:Thing) {
				thing.step();
			});
		
		/*	Collision: Beams & Asteroids
		---------------------------*/
			let self = this;
			_.each(self.asteroids, function (asteroid) {
				_.each(self.beams, function (beam) {

					let distance:number = Point.distance(asteroid.p, beam.p);
					if (distance < 5 + asteroid.size) {
						beam.die();
						if (asteroid.size > 20) {
							let v1 = new Vector(asteroid.pm.x, asteroid.pm.y);
							v1.rotate(10);
							self.addAsteroid(new Point(asteroid.p.x, asteroid.p.y), v1, asteroid.size / 2);
							
							let v2 = new Vector(asteroid.pm.x, asteroid.pm.y);
							v2.rotate(-10);
							self.addAsteroid(new Point(asteroid.p.x, asteroid.p.y), v2, asteroid.size / 2);
						}
						asteroid.die();
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
