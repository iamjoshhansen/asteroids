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
        _this.rotation_drag = 0.99;
        _this.lazer_cannon_cooldown = 0;
        _this.bound_gamepad = null;
        _this.thrust = 0;
        _this.reverse_thrust = 0;
        _this.name = '?';
        return _this;
    }
    Ship.prototype.step = function () {
        _super.prototype.step.call(this);
        if (this.lazer_cannon_cooldown > 0) {
            this.lazer_cannon_cooldown--;
        }
        /*	Thrust
        ------------------------------------------*/
        var thrust_vector = Rotation.getNormalizedVector(this.r);
        thrust_vector.multiply(this.thrust * 0.03);
        this.pm.add(thrust_vector);
        /*	Reverse Thrust
        ------------------------------------------*/
        var reverse_thrust_vector = Rotation.getNormalizedVector(this.r);
        reverse_thrust_vector.multiply(-this.reverse_thrust * 0.03 * 0.5);
        this.pm.add(reverse_thrust_vector);
        return this;
    };
    Ship.prototype.fire = function () {
        if (this.lazer_cannon_cooldown === 0) {
            this.world.beams.push(new LazerBeam(this));
            this.lazer_cannon_cooldown = Ship.lazer_cannon_cooldown;
            return true;
        }
        return false;
    };
    Ship.prototype.bindToGamepad = function (index) {
        this.bound_gamepad = new GamePad(index);
        this.name = 'Player ' + (index + 1);
        return this;
    };
    Ship.prototype.pingControlls = function () {
        var has_gamepad = !!this.bound_gamepad;
        if (has_gamepad) {
            var is_gamepad_active = this.bound_gamepad.ping();
            if (is_gamepad_active) {
                Ship.gamepad_handler.standard(this);
                return true;
            }
        }
        return false;
    };
    return Ship;
}(Thing));
Ship.lazer_cannon_distance = 50;
Ship.lazer_cannon_cooldown = 25;
Ship.gamepad_handler = {
    strafe: function (ship) {
        var pm_ratio = 0.05;
        if (Math.abs(ship.bound_gamepad.left_x) > 0.1) {
            ship.pm.x += ship.bound_gamepad.left_x * pm_ratio;
        }
        if (Math.abs(ship.bound_gamepad.left_y) > 0.1) {
            ship.pm.y += ship.bound_gamepad.left_y * pm_ratio;
        }
        var max = 10;
        ship.pm.x = Math.min(max, ship.pm.x);
        ship.pm.x = Math.max(-max, ship.pm.x);
        ship.pm.y = Math.min(max, ship.pm.y);
        ship.pm.y = Math.max(-max, ship.pm.y);
        ship.r = new Vector(ship.bound_gamepad.right_x, ship.bound_gamepad.right_y).angle() + 180;
        if (ship.bound_gamepad.right_trigger > 0.25) {
            ship.fire();
        }
    },
    standard: function (ship) {
        var pm_ratio = 0.02;
        if (Math.abs(ship.bound_gamepad.left_x) > 0.1) {
            ship.rm += ship.bound_gamepad.left_x * pm_ratio;
        }
        var max = 2;
        ship.rm = Math.min(max, ship.rm);
        ship.rm = Math.max(-max, ship.rm);
        if (Math.abs(ship.bound_gamepad.left_y) > 0.1) {
            //ship.rm.y += ship.bound_gamepad.left_y * pm_ratio;
        }
        /*	Trhusting : Triggers
        ------------------------------------------*/
        // if (ship.bound_gamepad.a) {
        // 	ship.fire();
        // }
        // ship.thrust = ship.bound_gamepad.right_trigger;
        // ship.reverse_thrust = ship.bound_gamepad.left_trigger;
        /*	Trhusting : Left Stick
        ------------------------------------------*/
        if (ship.bound_gamepad.right_trigger > 0.25) {
            ship.fire();
        }
        if (Math.abs(ship.bound_gamepad.left_y) > 0.1) {
            ship.thrust = -Math.min(0, ship.bound_gamepad.left_y);
            ship.reverse_thrust = Math.max(0, ship.bound_gamepad.left_y);
        }
        else {
            ship.thrust = 0;
            ship.reverse_thrust = 0;
        }
    }
};
//# sourceMappingURL=ship.js.map