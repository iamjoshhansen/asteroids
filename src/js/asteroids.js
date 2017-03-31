var world = {
    ships: Array(),
    beams: Array()
};
world.ships.push(new Ship(new Point(window.innerWidth / 3, window.innerHeight / 3)));
world.ships.push(new Ship(new Point(window.innerWidth / 2, window.innerHeight / 2)));
// world.ships[0].pm.x = 0.1;
// world.ships[0].pm.y = 0.2;
world.ships[0].rm = 1;
//# sourceMappingURL=asteroids.js.map