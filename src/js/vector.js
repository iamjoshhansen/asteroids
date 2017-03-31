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
    Vector.prototype.multiply = function (amount) {
        this.x *= amount;
        this.y *= amount;
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
//# sourceMappingURL=vector.js.map