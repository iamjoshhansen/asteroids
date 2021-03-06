"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var world_1 = require("./components/world");
var render_handlers_1 = require("./components/render-handlers");
var player_count = _.filter(navigator.getGamepads()).length;
console.log('player_count: ', player_count);
var world = new world_1.World(player_count, window.innerWidth * 2, window.innerHeight * 2, 10);
Object.defineProperty(window, 'world', {
    value: world
});
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
    //console.log(kc);
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
setInterval(function () {
    // Local game logic -- NOT rendering or server game logic
    _.each(world.ships, function (ship) {
        ship.pingControlls();
    });
    // /*	Player 2
    // --------------------------*/
    // 	(function (my_ship:Ship) {
    // 		if (my_ship) {
    // 			let pm_ratio = 0.01;
    // 			if (button.w) {
    // 				my_ship.pm.y -= pm_ratio;
    // 			}
    // 			if (button.s) {
    // 				my_ship.pm.y += pm_ratio;
    // 			}
    // 			if (button.a) {
    // 				my_ship.pm.x -= pm_ratio;
    // 			}
    // 			if (button.d) {
    // 				my_ship.pm.x += pm_ratio;
    // 			}
    // 			if (button.sp) {
    // 				let did_fire:boolean = my_ship.fire();
    // 			}
    // 			var arrow_val = 
    // 					(button.up ? '1' : '0') + 
    // 					(button.rt ? '1' : '0') + 
    // 					(button.dn ? '1' : '0') + 
    // 					(button.lt ? '1' : '0');
    // 			var direction_map = {
    // 					'1000': -90,
    // 					'0100': 0,
    // 					'0010': 90,
    // 					'0001': 180
    // 				};
    // 			if (arrow_val in direction_map) {
    // 				var r = direction_map[arrow_val];
    // 				my_ship.r = r;
    // 			}
    // 		}
    // 	})(world.ships[1]);
}, 60 / 1000);
function step() {
    ctx.fillStyle = '#101010';
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    /*	Ships
    ---------------------------*/
    _.each(world.ships, function (ship) {
        render_handlers_1.render_handlers.ship(ctx, ship);
    });
    /*	LazerBeams
    ---------------------------*/
    _.each(world.beams, function (beam) {
        render_handlers_1.render_handlers.beam(ctx, beam);
    });
    /*	Asteroids
    ---------------------------*/
    _.each(world.asteroids, function (asteroid) {
        render_handlers_1.render_handlers.asteroid(ctx, asteroid);
    });
    window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);
