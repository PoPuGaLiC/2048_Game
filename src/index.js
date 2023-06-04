var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
import {GameScene} from './GameScene';
import {ASSETS} from './assets';

const COCOS_CONFIG = {
    "debugMode"     : 1,
    "showFPS"       : false,
    "frameRate"     : 60,
    "id"            : "canvas",
    "jsList"        : [],
    "renderMode"    : 2,
    "platform"      : 'mobile'
};

window.addEventListener("load", function() {
    cc.game.onStart = function() {
        cc.LoaderScene.preload(ASSETS, function() {
            cc.director.runScene( new GameScene() );
        });
    };
    cc.game.run(COCOS_CONFIG);
}) 
    
    

