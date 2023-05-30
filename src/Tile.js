import {normPos} from './TileLayer';

export class Tile extends cc.Sprite{
    constructor(number, x, y) {
        super("../assets/images/Sprite_" + 2 ** number + ".png");
        this.nextX = null
        this.nextY = null 
        this.number = number;
        this.setPosition(normPos(x, y));
        this.restart = 0;
        
    }
    animationCreation(){
        this.setScale(0.1, 0.1);
        
        return new Promise(resolve => this.runAction(cc.sequence([
            cc.scaleTo(0.4, 1, 1),
            cc.callFunc(resolve),
        ]))
        );
    }
    animationFusion(){
        this.setScale(1.1, 1.1);
        return new Promise(resolve => this.runAction(cc.sequence([
            cc.scaleTo(0.4, 1, 1),
            cc.callFunc(resolve),
        ])));
    }
};