class LazerBeam extends Thing {

	life:number;

	constructor (ship:Ship) {
		let v = Rotation.getNormalizedVector(ship.r),
			starting_offset_vector = new Vector(v.x, v.y);
		
		v.multiply(LazerBeam.speed);
		starting_offset_vector.multiply(Ship.lazer_cannon_distance);

		let p = new Point(ship.p.x, ship.p.y);
		p.add(starting_offset_vector);

		super(ship.world, p, v);

		this.r = ship.r;

		this.life = LazerBeam.lifespan;
	}

	step () {
		super.step();

		//console.log(`Lazer has lived life ${this.life} : ${this.is_active}`);

		this.life--;
		if (this.life < 0) {
			this.die();
		}
	}

	static lifespan:number = 200;
	static speed:number = 5;

}