let player_count:number = _.filter(navigator.getGamepads()).length;

let world = new World(player_count, window.innerWidth*2, window.innerHeight*2, 10);
