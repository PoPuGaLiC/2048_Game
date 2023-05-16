let MyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var size = cc.director.getWinSize();
        // var sprite = cc.Sprite.create("HelloWorld.png");
        // sprite.setPosition(size.width / 2, size.height / 2);
        
        // sprite.setScale(0.8);
        // this.addChild(sprite, 0);

      //   var label = cc.LabelTTF.create("Hello Worggggggggggld", "Arial", 40);
      //   label.setPosition(size.width / 2, size.height / 2);
      //   this.addChild(label, 1);
        var tsLabel = new cc.LabelTTF("Tunnel Snakes Rule!", "Arial", 38);
        tsLabel.x = size.width / 2;
        tsLabel.y = size.height-80;
        this.addChild(tsLabel, 5);
        tsLabel.runAction(
            cc.sequence(
                cc.spawn(
                    // cc.moveBy(2.5, cc.p(0, size.height - 40)),
                    cc.tintTo(2.5,255,125,0)
                ),
                cc.delayTime(1.5),
                cc.moveBy(0.2, cc.p(0, size.height + 40))                
            )
        );

    }
})

export default MyScene;
