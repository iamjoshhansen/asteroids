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
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.distance = function (a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    };
    Point.add = function (p, v) {
        return new Point(p.x + v.x, p.y + v.y);
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
    };
    Point.prototype.moveToward = function (p, s) {
        var d = this.distanceTo(p);
        if (d > 0) {
            var r = s / d, dx = p.x - this.x, dy = p.y - this.y, v = new Vector(dx * r, dy * r);
            this.add(v);
        }
        else {
            console.log(' ! moving toward same point');
        }
    };
    return Point;
}());
var Vector = (function (_super) {
    __extends(Vector, _super);
    function Vector(x, y) {
        var _this = _super.call(this, x, y) || this;
        Vector.not = new Point(0, 0);
        return _this;
    }
    Vector.add = function (a, b) {
        return new Vector(a.x + b.x, a.y + b.y);
    };
    Vector.prototype.magnitude = function () {
        return (Vector.not).distanceTo(this);
    };
    Vector.prototype.add = function (v) {
        var p = Vector.add(this, v);
        this.moveTo(p);
    };
    Vector.prototype.angle = function () {
        return Math.atan2(this.y, this.x) * 180 / Math.PI + 180;
    };
    return Vector;
}(Point));
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
        var _this = _super.call(this, new Point(p.x, p.y), new Vector(0, 0)) || this;
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
console.log('==============');
var a = new Point(0, 0);
var b = new Point(30, 40);
var ship = new Ship(a);
console.log(ship);
console.log('------------');
console.log('ship.pos: ', ship.pos);
for (var i = 0; i < 20; i++) {
    var d = Point.distance(ship.pos, b);
    ship.pos.moveToward(b, Math.min(3, d));
    console.log('ship.pos: ', ship.pos);
}
//# sourceMappingURL=point.js.map