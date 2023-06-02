import {ASSETS} from './assets';

export class BackgroundLayer extends cc.Layer{
    constructor(){
        super();
        var size = cc.director.getWinSize();
        var field = cc.Sprite.create(ASSETS[0]);
        field.setPosition(size.width / 2, 365 / 2 + 9);              
        this.addChild(field, 0);
        var countField = cc.Sprite.create(ASSETS[12]);
        countField.setPosition(size.width / 2, size.height - (68 / 2 + 18));              
        this.addChild(countField, 0);
    }
};