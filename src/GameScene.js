// var BackgroundLayer = require("./BackgroundLayer");
// var TileLayer = require("./TileLayer");

import * as BackgroundLayer from './BackgroundLayer.js';
import * as TileLayer from './TileLayer.js';

export class GameScene extends cc.Scene{
    constructor(){
        super();
    }
    onEnter() {
        var size = cc.director.getWinSize();
        this.backgroundLayer = new BackgroundLayer();
        this.addChild(this.backgroundLayer, 1);
        
        this.tileLayer = new TileLayer(size);
        this.tileLayer.setPosition(25, 11);
        this.addChild(this.tileLayer, 1);
        
    }
};