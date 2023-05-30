import {BackgroundLayer} from './BackgroundLayer';
import {TileLayer} from './TileLayer';

export class GameScene extends cc.Scene{
    onEnter() {
        super.onEnter();
        let size = cc.director.getWinSize();
        this.backgroundLayer = new BackgroundLayer();
        this.addChild(this.backgroundLayer, 1);
        
        this.tileLayer = new TileLayer(size);
        this.tileLayer.setPosition(25, 11);
        this.addChild(this.tileLayer, 1);
        
    }
};