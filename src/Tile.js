import {ASSETS} from './assets';
import { normXY } from './normalizedXY';

export class Tile extends cc.Sprite {
    constructor(number, x, y) {
        super(ASSETS[number]);
        this.nextX = null;
        this.nextY = null;
        this.number = number;
        this.setPosition(normXY(x, y));
        this.restart = 0;
    };

    animationCreation() {
        this.setScale(0.1, 0.1);
        return new Promise(resolve => this.runAction(cc.sequence([
            cc.scaleTo(0.3, 1, 1),
            cc.callFunc(resolve),
        ])));
    };

    animationFusion() {
        this.setScale(1.1, 1.1);
        return new Promise(resolve => this.runAction(cc.sequence([
            cc.scaleTo(0.3, 1, 1),
            cc.callFunc(resolve),
        ])));
    };
};