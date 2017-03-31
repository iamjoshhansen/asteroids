var Rotation = (function () {
    function Rotation(degrees) {
        this.angle = degrees;
    }
    Rotation.getNormalizedVector = function (degrees) {
        var x = Math.cos(degrees * Math.PI / 180), y = Math.sin(degrees * Math.PI / 180);
        return new Vector(x, y);
    };
    return Rotation;
}());
//# sourceMappingURL=rotation.js.map