var Thing = (function () {
    function Thing(world, position, pos_momentum, rotation, rotation_momentum) {
        this.world = world;
        this.p = position;
        this.pm = pos_momentum;
        this.r = rotation || 0;
        this.rm = rotation_momentum || 0;
        this.position_drag = 1;
        this.rotation_drag = 1;
        this.is_active = true;
    }
    Thing.prototype.applyMomentum = function () {
        this.p.add(this.pm);
        this.r += this.rm;
        return this;
    };
    Thing.prototype.step = function () {
        this.applyMomentum();
        this.applyPositionDrag();
        this.applyRotationDrag();
        this.applyBoundingBoxRepeat();
        return this;
    };
    Thing.prototype.die = function () {
        this.is_active = false;
        return this;
    };
    Thing.prototype.applyPositionDrag = function () {
        this.pm.multiply(this.position_drag);
        return this;
    };
    Thing.prototype.applyRotationDrag = function () {
        this.rm *= this.rotation_drag;
        return this;
    };
    Thing.prototype.applyBoundingBoxRepeat = function () {
        var box = this.world.box, width = box.width(), height = box.height();
        if (width < 0 || height < 0) {
            throw new Error("Invalid bounding box: [" + box.p1.x + "," + box.p1.y + "] to [" + box.p2.x + "," + box.p2.y + "]");
        }
        while (this.p.x < box.p1.x) {
            this.p.x += width;
        }
        while (this.p.x > box.p2.x) {
            this.p.x -= width;
        }
        while (this.p.y < box.p1.y) {
            this.p.y += height;
        }
        while (this.p.y > box.p2.y) {
            this.p.y -= height;
        }
        return this;
    };
    return Thing;
}());
//# sourceMappingURL=thing.js.map