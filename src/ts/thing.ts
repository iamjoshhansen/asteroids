class Thing {
	
	p:Point;
	pm:Vector;
	
	r:number;
	rm:number;

	constructor (p:Point, v:Vector) {
		this.p = p;
		this.pm = v;
		this.r = 0;
		this.rm = 0;
	}

	applyMomentum () {
		this.p.add(this.pm);
		this.r += this.rm;
	}

	applyPositionDrag (amount:number) {
		this.pm.multiply(amount);
	}

	applyRotationalDrag (amount:number) {
		this.rm *= amount;
	}

}