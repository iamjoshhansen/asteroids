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
    function Ship(p) {
        var _this = _super.call(this, new Point(p.x, p.y), new Vector(0, 0)) || this;
        _this.active = true;
        _this.lazer_cannon_cooldown = 0;
        return _this;
    }
    return Ship;
}(Thing));
Ship.lazer_cannon_distance = 50;
Ship.lazer_cannon_cooldown = 25;
//# sourceMappingURL=ship.js.map