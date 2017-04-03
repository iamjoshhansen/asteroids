class Thing {
	
	world:World;
	p:Point;
	pm:Vector;
	is_active:boolean;
	
	r:number;
	rm:number;

	position_drag:number;
	rotation_drag:number;

	constructor (world:World, position:Point, pos_momentum:Vector, rotation?:number, rotation_momentum?:number) {
		this.world = world;
		this.p = position;
		this.pm = pos_momentum;
		this.r = rotation || 0;
		this.rm = rotation_momentum || 0;

		this.position_drag = 1;
		this.rotation_drag = 1;

		this.is_active = true;
	}

	applyMomentum () {
		this.p.add(this.pm);
		this.r += this.rm;

		return this;
	}

	step () {
		this.applyMomentum();
		this.applyPositionDrag();
		this.applyRotationDrag();
		this.applyBoundingBoxRepeat();

		return this;
	}

	die () {
		this.is_active = false;
		
		return this;
	}

	applyPositionDrag () {
		this.pm.multiply(this.position_drag);

		return this;
	}

	applyRotationDrag () {
		this.rm *= this.rotation_drag;

		return this;
	}

	applyBoundingBoxRepeat () {
		let box = this.world.box,
			width:number = box.width(),
			height:number = box.height();

		if (width < 0 || height < 0) {
			throw new Error(`Invalid bounding box: [${box.p1.x},${box.p1.y}] to [${box.p2.x},${box.p2.y}]`);
		}

		while (this.p.x < box.p1.x) {
			this.p.x += width;
		}

		while (this.p.x > box.p2.x) {
			this.p.x -= width;
		}

		while (this.p.y < box.p1.y) {
			this.p.y += height;
		}

		while (this.p.y > box.p2.y) {
			this.p.y -= height;
		}

		return this;
	}

}