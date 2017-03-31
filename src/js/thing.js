var Thing = (function () {
    function Thing(p, v) {
        this.p = p;
        this.pm = v;
        this.r = 0;
        this.rm = 0;
    }
    Thing.prototype.applyMomentum = function () {
        this.p.add(this.pm);
        this.r += this.rm;
    };
    Thing.prototype.applyPositionDrag = function (amount) {
        this.pm.multiply(amount);
    };
    Thing.prototype.applyRotationalDrag = function (amount) {
        this.rm *= amount;
    };
    return Thing;
}());
//# sourceMappingURL=thing.js.map