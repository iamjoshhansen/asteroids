class Ship extends Thing {

	active:boolean;
	lazer_cannon_cooldown:number;

	constructor (p:Point) {
		super(new Point(p.x, p.y), new Vector(0, 0));
		this.active = true;
		this.lazer_cannon_cooldown = 0;
	}

	static lazer_cannon_distance:number = 50;
	static lazer_cannon_cooldown:number = 25;

}