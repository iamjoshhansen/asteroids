var cnv = document.getElementById('canvas');
var w = window.innerWidth, h = window.innerHeight;
cnv.style.width = w + 'px';
cnv.style.height = h + 'px';
cnv.setAttribute('width', (w * 2) + 'px');
cnv.setAttribute('height', (h * 2) + 'px');
var ctx = cnv.getContext('2d');
var button = {
    w: false,
    a: false,
    s: false,
    d: false,
    lt: false,
    rt: false,
    dn: false,
    up: false,
    sp: false
};
var button_map = {
    87: 'w',
    65: 'a',
    83: 's',
    68: 'd',
    32: 'sp',
    38: 'up',
    39: 'rt',
    40: 'dn',
    37: 'lt'
};
$(window)
    .on('keydown', function (ev) {
    var kc = ev.keyCode;
    console.log(kc);
    if (kc in button_map) {
        button[button_map[kc]] = true;
    }
})
    .on('keyup', function (ev) {
    var kc = ev.keyCode;
    if (kc in button_map) {
        button[button_map[kc]] = false;
    }
});
setInterval(function () {
    // Server Game logic -- NOT rendering
    world.step();
}, 60 / 1000);
var gp0 = new GamePad(0);
setInterval(function () {
    // Local game logic -- NOT rendering or server game logic
    /*	Player 1
    --------------------------*/
    (function (gp) {
        var my_ship = world.ships[0]; // todo: fix when it matters
        var pm_ratio = 0.05;
        gp.ping();
        my_ship.pm.x += gp.left_x * pm_ratio;
        my_ship.pm.y += gp.left_y * pm_ratio;
        var max = 10;
        my_ship.pm.x = Math.min(max, my_ship.pm.x);
        my_ship.pm.x = Math.max(-max, my_ship.pm.x);
        my_ship.pm.y = Math.min(max, my_ship.pm.y);
        my_ship.pm.y = Math.max(-max, my_ship.pm.y);
        my_ship.r = new Vector(gp.right_x, gp.right_y).angle() + 180;
        if (gp.right_trigger > 0.25) {
            my_ship.fire();
        }
    })(gp0);
    /*	Player 2
    --------------------------*/
    (function () {
        var my_ship = world.ships[1]; // todo: fix when it matters
        var pm_ratio = 0.01;
        if (button.w) {
            my_ship.pm.y -= pm_ratio;
        }
        if (button.s) {
            my_ship.pm.y += pm_ratio;
        }
        if (button.a) {
            my_ship.pm.x -= pm_ratio;
        }
        if (button.d) {
            my_ship.pm.x += pm_ratio;
        }
        if (button.sp) {
            var did_fire = my_ship.fire();
            if (did_fire) {
                console.log('Player 2 fire!');
            }
        }
        var arrow_val = (button.up ? '1' : '0') +
            (button.rt ? '1' : '0') +
            (button.dn ? '1' : '0') +
            (button.lt ? '1' : '0');
        var direction_map = {
            '1000': -90,
            '0100': 0,
            '0010': 90,
            '0001': 180
        };
        if (arrow_val in direction_map) {
            var r = direction_map[arrow_val];
            my_ship.r = r;
        }
    })();
}, 60 / 1000);
function step() {
    ctx.fillStyle = '#101010';
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    /*	Ships
    ---------------------------*/
    _.each(world.ships, function (ship) {
        render_handlers.ship(ctx, ship);
    });
    /*	LazerBeams
    ---------------------------*/
    _.each(world.beams, function (beam) {
        render_handlers.beam(ctx, beam);
    });
    /*	Asteroids
    ---------------------------*/
    _.each(world.asteroids, function (asteroid) {
        render_handlers.asteroid(ctx, asteroid);
    });
    window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);
//# sourceMappingURL=animation.js.map