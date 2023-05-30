var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
import {GameScene} from './GameScene';
import {ASSETS} from './assets';

const COCOS_CONFIG ={
    "debugMode"     : 1,
    "showFPS": false,
    "frameRate"     : 60,
    "id"            : "canvas",
    "renderMode"    : 1,
    // "jsList": ["./src/index.js",
    // "./cocos2d-js-v3.13/cocos2d-js-v3.13.js",
    // "./src/GameScene.js",
    // "./src/BackgroundLayer.js",
    // "./src/TileLayer.js",
    // "./src/CountLabel.js",
    // "./src/Tile.js"]
}


window.onload = function(){
    cc.game.onStart = function(){
        cc.director.setDisplayStats(false);
        cc.LoaderScene.preload(ASSETS, function() {
            cc.director.runScene(new GameScene());
        }, this);
        
    };
    cc.game.run(COCOS_CONFIG);
};
