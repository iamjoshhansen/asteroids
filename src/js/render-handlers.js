var render_handlers = {
    ship: function (ctx, ship) {
        ctx.save();
        ctx.translate(ship.p.x, ship.p.y);
        var scale = 20;
        ctx.scale(scale, scale);
        ctx.rotate(ship.r * Math.PI / 180);
        // draw below
        ctx.beginPath();
        ctx.moveTo(2, 0);
        ctx.lineTo(-0.5, 1);
        ctx.lineTo(-0.5, -1);
        ctx.closePath();
        ctx.fillStyle = '#f9f9f9';
        ctx.fill();
        // keep last
        ctx.restore();
    },
    beam: function (ctx, beam) {
        ctx.save();
        ctx.translate(beam.p.x, beam.p.y);
        ctx.rotate(beam.r * Math.PI / 180);
        // draw below
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-30, 0);
        ctx.strokeStyle = '#9ff';
        ctx.stroke();
        // keep last
        ctx.restore();
    }
};
//# sourceMappingURL=render-handlers.js.map