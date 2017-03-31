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
//# sourceMappingURL=point.js.map