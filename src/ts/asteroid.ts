class Asteroid extends Thing {

	active:boolean;
	size:number;

	constructor (world:World, position:Point, pos_momentum:Vector, size:number) {
		super(world, position, pos_momentum);
		this.size = size;
		this.active = true;
	}

}