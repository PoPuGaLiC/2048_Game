var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
import {GameScene} from './GameScene';
import {ASSETS} from './assets';

window.onload = function(){
    cc.game.onStart = function(){
        cc.director.setDisplayStats(false);
        cc.LoaderScene.preload(ASSETS, function() {
            cc.director.runScene(new GameScene());
        }, this);
        
    };
    cc.game.run("canvas");
};
