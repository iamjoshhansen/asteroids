class Point {
	
    x: number;
    y: number;
    z: number;
    
    constructor (x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static distance (a: Point, b: Point) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2));
    }

    static add (p: Point, v:Vector) {
        return new Point(
                p.x + v.x,
                p.y + v.y,
                p.z + v.z
            );
    }

    distanceTo (b: Point) {
        return Point.distance(this, b);
    }

    add (v: Vector) {
        let p = Point.add(this, v);
        this.moveTo(p);
    }

    moveTo (p: Point) {
        this.x = p.x;
        this.y = p.y;
        this.z = p.z;
    }

    moveToward (p: Point, s: number) {
        let d = this.distanceTo(p);
        console.log('d: ', d);
        if (d > 0) {
            let r = s / d,
                dx = p.x - this.x,
                dy = p.y - this.y,
                dz = p.z - this.z,
                np = new Point(
                        dx * r,
                        dy * r,
                        dz * r
                    );

            this.moveTo(np);
        } else {
            console.log(' ! moving toward same point');
        }
    }

}








class Vector extends Point {

    constructor (x: number, y: number, z: number) {         
        super(x,y,z);
        Vector.not = new Point(0,0,0);
    }

    static not: Point;

    magnitude () {
        return (Vector.not).distanceTo(this);
    }

}

var v = new Vector(3,4,7);

console.log(v.magnitude());




class Thing {
    
    mom: Vector;
    pos: Point;

    constructor (p: Point, v: Vector) {
        this.pos = p;
        this.mom = v;
    }

    applyMomentum () {
        this.pos.add(this.mom);
    }

}


class Ship extends Thing {

    rot: number;

    constructor (p: Point) {
        super(p, new Vector(0,0,0));
        this.rot = 0;
    }

}



class LazerBeam extends Thing {

    constructor (ship: Ship) {
        super(ship.pos, ship.mom);
    }

}




let a: Point = new Point(0, 0, 0),
    b: Point = new Point(30, 40, 0);

var ship: Ship = new Ship(a);

console.log(ship);

for (var i=0; i<5; i++) {
    ship.pos.moveToward(b, 5);
    console.log(ship.pos);
}