var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Point = (function () {
    function Point(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Point.distance = function (a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2));
    };
    Point.add = function (p, v) {
        return new Point(p.x + v.x, p.y + v.y, p.z + v.z);
    };
    Point.prototype.distanceTo = function (b) {
        return Point.distance(this, b);
    };
    Point.prototype.add = function (v) {
        var p = Point.add(this, v);
        this.moveTo(p);
    };
    Point.prototype.moveTo = function (p) {
        this.x = p.x;
        this.y = p.y;
        this.z = p.z;
    };
    Point.prototype.moveToward = function (p, s) {
        var d = this.distanceTo(p);
        console.log('d: ', d);
        if (d > 0) {
            var r = s / d, dx = p.x - this.x, dy = p.y - this.y, dz = p.z - this.z, np = new Point(dx * r, dy * r, dz * r);
            this.moveTo(np);
        }
        else {
            console.log(' ! moving toward same point');
        }
    };
    return Point;
}());
var Vector = (function (_super) {
    __extends(Vector, _super);
    function Vector(x, y, z) {
        var _this = _super.call(this, x, y, z) || this;
        Vector.not = new Point(0, 0, 0);
        return _this;
    }
    Vector.prototype.magnitude = function () {
        return (Vector.not).distanceTo(this);
    };
    return Vector;
}(Point));
var v = new Vector(3, 4, 7);
console.log(v.magnitude());
var Thing = (function () {
    function Thing(p, v) {
        this.pos = p;
        this.mom = v;
    }
    Thing.prototype.applyMomentum = function () {
        this.pos.add(this.mom);
    };
    return Thing;
}());
var Ship = (function (_super) {
    __extends(Ship, _super);
    function Ship(p) {
        var _this = _super.call(this, p, new Vector(0, 0, 0)) || this;
        _this.rot = 0;
        return _this;
    }
    return Ship;
}(Thing));
var LazerBeam = (function (_super) {
    __extends(LazerBeam, _super);
    function LazerBeam(ship) {
        return _super.call(this, ship.pos, ship.mom) || this;
    }
    return LazerBeam;
}(Thing));
var a = new Point(0, 0, 0), b = new Point(30, 40, 0);
var ship = new Ship(a);
console.log(ship);
for (var i = 0; i < 5; i++) {
    ship.pos.moveToward(b, 5);
    console.log(ship.pos);
}
//# sourceMappingURL=point.js.map