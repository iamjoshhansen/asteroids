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
var LazerBeam = (function (_super) {
    __extends(LazerBeam, _super);
    function LazerBeam(ship) {
        var _this = this;
        var v = Rotation.getNormalizedVector(ship.r), starting_offset_vector = new Vector(v.x, v.y);
        v.multiply(LazerBeam.speed);
        starting_offset_vector.multiply(Ship.lazer_cannon_distance);
        var p = new Point(ship.p.x, ship.p.y);
        p.add(starting_offset_vector);
        _this = _super.call(this, p, v) || this;
        _this.r = ship.r;
        _this.life = LazerBeam.lifespan;
        _this.active = true;
        return _this;
    }
    return LazerBeam;
}(Thing));
LazerBeam.lifespan = 200;
LazerBeam.speed = 5;
//# sourceMappingURL=lazer-beam.js.map