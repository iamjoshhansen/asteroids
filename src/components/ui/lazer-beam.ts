import * as _ from "lodash";
import SpriteUI from './sprite';
import { LazerBeam } from '../lazer-beam';
import { Rotation } from '../rotation';


export default class LazerBeamUI extends SpriteUI {

	lazer:LazerBeam;

	constructor (lazer:LazerBeam) {
		super(lazer.p, new Rotation(lazer.r), 0.02, './images/lazer-beam-sprite.png', 512, 1408, 1, 11);
		this.lazer = lazer;
	}

	updateAndRender (ctx:CanvasRenderingContext2D) {
		//this.scale = 1;
		this.p.moveTo(this.lazer.p);
		this.r.angle = this.lazer.r;
		this.frame += 1;
		return super.updateAndRender(ctx);
	}

}
