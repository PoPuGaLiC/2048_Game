var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
import * as GameScene from './GameScene.js';
var asset = ["../images/Field.png"];
for(let i = 1; i < 12; i++){
    asset[i] = "../images/Sprite_" + 2 ** i + ".png";
}
asset.push("../images/CountField.png");

window.onload = function(){
    cc.game.onStart = function(){
        cc.director.setDisplayStats(false);
        cc.LoaderScene.preload(asset, function() {
            cc.director.runScene(new GameScene());
        }, this);
        
    };
    cc.game.run("canvas");
};
