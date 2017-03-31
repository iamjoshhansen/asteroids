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
var Ship = (function (_super) {
    __extends(Ship, _super);
    function Ship(world, position) {
        var _this = _super.call(this, world, new Point(position.x, position.y), new Vector(0, 0)) || this;
        _this.position_drag = 0.995;
        _this.rotation_drag = 0.999;
        _this.lazer_cannon_cooldown = 0;
        return _this;
    }
    Ship.prototype.step = function () {
        _super.prototype.step.call(this);
        if (this.lazer_cannon_cooldown > 0) {
            this.lazer_cannon_cooldown--;
        }
    };
    Ship.prototype.fire = function () {
        if (this.lazer_cannon_cooldown === 0) {
            this.world.beams.push(new LazerBeam(this));
            this.lazer_cannon_cooldown = Ship.lazer_cannon_cooldown;
            return true;
        }
        return false;
    };
    return Ship;
}(Thing));
Ship.lazer_cannon_distance = 50;
Ship.lazer_cannon_cooldown = 25;
//# sourceMappingURL=ship.js.map