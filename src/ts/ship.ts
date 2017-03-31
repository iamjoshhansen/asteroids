class Ship extends Thing {

	lazer_cannon_cooldown:number;

	constructor (world:World, position:Point) {
		super(world, new Point(position.x, position.y), new Vector(0, 0));
		this.position_drag = 0.995;
		this.rotation_drag = 0.999;
		this.lazer_cannon_cooldown = 0;
	}

	static lazer_cannon_distance:number = 50;
	static lazer_cannon_cooldown:number = 25;

	step () {
		super.step();
		if (this.lazer_cannon_cooldown > 0) {
			this.lazer_cannon_cooldown--;
		}
	}

	fire () {
		if (this.lazer_cannon_cooldown === 0) {
			this.world.beams.push(new LazerBeam(this));
			this.lazer_cannon_cooldown = Ship.lazer_cannon_cooldown;
			return true;
		}
		return false;
	}

}