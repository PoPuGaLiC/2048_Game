var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
import {MyScene} from './MyScene.js';
var asset =["asset/Field.png","asset/CountField.png"];
for(let i=1; i<12;i++){
    asset[i+1]="asset/Sprite_"+2**i+".png";
}
console.log(asset);

window.onload = function(){
    cc.game.onStart = function(){
        
        //load resources
        cc.LoaderScene.preload(asset, function () {
            cc.director.setDisplayStats(false);
            // var MyScene = cc.Scene.extend({
            //     onEnter:function () {
            //         this._super();
            //         var count=0;
            //         var size = cc.director.getWinSize();
            //         var field = cc.Sprite.create(asset[0]);
            //         field.setPosition(size.width / 2, 365/2+9);              
            //         this.addChild(field, 0);
            //         var countField = cc.Sprite.create(asset[1]);
            //         countField.setPosition(size.width / 2, size.height-(68/2+18));              
            //         this.addChild(countField, 0);

            //       //   var label = cc.LabelTTF.create("Hello Worggggggggggld", "Arial", 40);
            //       //   label.setPosition(size.width / 2, size.height / 2);
            //       //   this.addChild(label, 1);
            //         count='СЧЁТ: '+count;
            //         var tsLabel = new cc.LabelTTF(count, "Arial", 32);
            //         tsLabel.x = size.width / 2;
            //         tsLabel.y =  size.height-(68/2+18);
                    
            //         this.addChild(tsLabel, 5);

            //         tsLabel.runAction(
            //             cc.sequence(
            //                 cc.spawn(
            //                     // cc.moveBy(2.5, cc.p(0, size.height - 40)),
            //                     cc.tintTo(2.5,0,0,0)
            //                 ),
             
            //             )
            //         );

            //     }
            // });
            cc.director.runScene(new MyScene());

        }, this);
        
    };
    cc.game.run("canvas");
};