var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// var MyScene = require("./MyScene");
var asset =["asset/Field.png","asset/CountField.png"];
for(let i=1; i<12;i++){
    asset[i+1]="asset/Sprite_"+2**i+".png";
}
var distBTWCentTilesX=9+75;
var distBTWCentTilesY=12+75;

function normPos(x,y){return {x:x*distBTWCentTilesX-75/2, y: y*distBTWCentTilesY-75/2}};

function searchFreePlace(tileArray){
    let flatTileArr = tileArray.flat()
    while(true){
        let freePlace = Math.floor(Math.random()*16);
        if (flatTileArr[freePlace] === -1) return [Math.floor(freePlace/4),freePlace%4];
        if (flatTileArr.every(x => x === -1)) break;   
    }
    
}

function addTile(layer, tileArray, start = 0){
    let [i,j] = searchFreePlace(tileArray);
    let chance = (start === 1) ? 1 : 0.9;
    let typeTile = (chance > Math.random()) ? 2 : 3;
    console.log([i,j]);
    tileArray[i][j] = new Tile (asset[typeTile], j+1, 4-i);
    console.log(tileArray[i][j]);
    

    layer.addChild(tileArray[i][j], 2);
    tileArray[i][j].setScale(0.1,0.1)
    let sprite_act = cc.ScaleTo.create(0.6,1,1);
    tileArray[i][j].runAction(sprite_act);
    
}

var Tile = cc.Sprite.extend({
    ctor: function(sprite, x, y) {
        this._super(sprite);
        this.setPosition(x*distBTWCentTilesX-75/2, y*distBTWCentTilesY-75/2);
      
    },
    setPos: function(x,y) {this.setPosition(x*distBTWCentTilesX-75/2, y*distBTWCentTilesY-75/2)}
});
var BackgroundLayer = cc.Layer.extend({
    ctor: function (count) {
        this._super();
        var size = cc.director.getWinSize();
        var field = cc.Sprite.create(asset[0]);
        field.setPosition(size.width / 2, 365/2+9);              
        this.addChild(field, 0);
        var countField = cc.Sprite.create(asset[1]);
        countField.setPosition(size.width / 2, size.height-(68/2+18));              
        this.addChild(countField, 0);

        count='СЧЁТ: '+count;
        var tsLabel = new cc.LabelTTF(count, "Arial", 32);
        tsLabel.x = size.width / 2;
        tsLabel.y = size.height-(68/2+18);
        tsLabel.setFontFillColor(0, 0, 0);
        this.addChild(tsLabel, 1);
    },
    
    
});
var TileLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        // var tileArray=Array(4).fill(-1).map(x => Array(4).fill(-1));   
        // // do{
        // //     placeOne = Math.floor(Math.random()*16);
        // //     placeTwo = Math.floor(Math.random()*16);
        // // }while(placeOne == placeTwo)

        // addTile(this, tileArray, 1);
        // addTile(this, tileArray, 1);
        // console.log(tileArray);
        // tileArray[Math.floor(placeOne/4)][placeOne%4] = new Tile(asset[2], (placeOne%4+1),(4-Math.floor(placeOne/4)));
        // tileArray[Math.floor(placeTwo/4)][placeTwo%4] = new Tile(asset[2], (placeTwo%4+1),(4-Math.floor(placeTwo/4)));

        // this.addChild(tileArray[Math.floor(placeOne/4)][placeOne%4], 2);
        // this.addChild(tileArray[Math.floor(placeTwo/4)][placeTwo%4], 2);


    },
    
    
});


window.onload = function(){
    cc.game.onStart = function(){
        
        //load resources
        cc.LoaderScene.preload(asset, function () {
            cc.director.setDisplayStats(false);
            var MyScene = cc.Scene.extend({
                onEnter:function () {
                    this._super();
                    
                    var count=0;
                    let backgroundLayer = new BackgroundLayer(count);
                    this.addChild(backgroundLayer , 1);
                    let tileLayer = new TileLayer();
                    tileLayer.setPosition(25, 11);
                     
                    this.addChild(tileLayer, 1);
                    var tileArray=Array(4).fill(-1).map(x => Array(4).fill(-1));   
                    // do{
                    //     placeOne = Math.floor(Math.random()*16);
                    //     placeTwo = Math.floor(Math.random()*16);
                    // }while(placeOne == placeTwo)
            
                    addTile(tileLayer, tileArray, 1);
                    addTile(tileLayer, tileArray, 1);
                    cc.eventManager.addListener({
                        event: cc.EventListener.MOUSE,
                        onMouseDown: function(event){
                            prevX=event._x;
                            prevY=event._y;
                        },
                        onMouseUp: function(event){
                            nextX=event._x;
                            nextY=event._y;
                            diffX=Math.abs(nextX)-Math.abs(prevX);
                            diffY=Math.abs(nextY)-Math.abs(prevY);
                            if((Math.abs(diffX) > 50) || (Math.abs(diffY)>50)) {
                                let direction = Math.abs(diffX)>Math.abs(diffY) ? diffX>0 ? 'right' : 'left' : diffY>0 ? 'up' : 'down' ;
                                console.log(direction);
                                switch(direction){
                                    case 'left':
                                        for (let i=0;i<4;i++){
                                            let filtered = tileArray[i].filter(x => x!=-1);
                                            tileArray[i].fill(-1);
            
                                            filtered.forEach((x,j) => {
                                                tileArray[i][j]= filtered[j];
                                                let sprite_act = cc.MoveTo.create(0.5,cc.p(normPos(j+1, 4-i)));
                                                tileArray[i][j].runAction(sprite_act);
                                            });
                                        } break;
                                    case 'right':
                                        for (let i=0;i<4;i++){
                                            let filtered = tileArray[i].filter(x => x!=-1);
                                            tileArray[i].fill(-1);
            
                                            filtered.forEach((x,j) => {
                                                tileArray[i][4-filtered.length+j]= filtered[j];
                                                let sprite_act = cc.MoveTo.create(0.5,cc.p(normPos(4-filtered.length+j+1, 4-i)));
                                                tileArray[i][4-filtered.length+j].runAction(sprite_act);
                                            });
            
                                        } break;
                                        case 'up':
                                            for (let i=0;i<4;i++){
                                                let filtered = [];
                                                for(let j=0;j<4;j++){
                                                    if(tileArray[j][i] != -1){
                                                        filtered.push(tileArray[j][i]);
                                                        tileArray[j][i] = -1;
                                                    }
                                                }
                                                filtered.forEach((x,j) => {
                                                    tileArray[j][i] = filtered[j];
                                                    let sprite_act = cc.MoveTo.create(0.5,cc.p(normPos(i+1, 4-j)));
                                                    tileArray[j][i].runAction(sprite_act);
                                                });
                                            } break;
                                        case 'down':
                                            for (let i=0;i<4;i++){
                                                let filtered = [];
                                                for(let j=3;j>-1;j--){
                                                    if(tileArray[j][i] != -1){
                                                        filtered.push(tileArray[j][i]);
                                                        tileArray[j][i] = -1;
                                                    }
                                                }
                                                filtered.forEach((x,j) => {
                                                    tileArray[3-j][i]= filtered[j];
                                                    let sprite_act = cc.MoveTo.create(0.5,cc.p(normPos(i+1,j+1)));
                                                    tileArray[3-j][i].runAction(sprite_act);
                                                });
                                            } break;
                                }
                                addTile(tileLayer, tileArray);
                                console.log(tileArray);
                            }
                             
                        }
                    }, this);
                }
            });
            cc.director.runScene(new MyScene());

        }, this);
        
    };
    cc.game.run("canvas");
};