var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// var MyScene = require("./MyScene");
var asset =["asset/Field.png"];
for(let i=1; i<12;i++){
    asset[i]="asset/Sprite_"+2**i+".png";
}
asset.push("asset/CountField.png");
var distBTWCentTilesX=9+75;
var distBTWCentTilesY=12+75;

function normPos(x,y){return {x:(x+1)*distBTWCentTilesX-75/2, y: (3-y+1)*distBTWCentTilesY-75/2}};

function searchFreePlace(tileArray){
    let flatTileArr = tileArray.flat()
    while(true){
        let freePlace = Math.floor(Math.random()*16);
        if (flatTileArr[freePlace] === -1){
            console.log(Math.floor(freePlace/4),freePlace%4);
            return [Math.floor(freePlace/4),freePlace%4];
        }
        if (flatTileArr.every(x => x === -1)) return null;   
    }
    
}

function addTile(layer, tileArray, start = 0){
    let [i,j] = searchFreePlace(tileArray);

    let chance = (start === 1) ? 1 : 0.9;
    let typeTile = (chance > Math.random()) ? 1 : 2;
    tileArray[i][j] = new Tile (typeTile, j, i); 

    layer.addChild(tileArray[i][j], 2);
    console.log(tileArray);
    tileArray[i][j].setScale(0.1,0.1);
    let sprite_act = cc.ScaleTo.create(0.4,1,1);
    tileArray[i][j].runAction(sprite_act);
    
}


function fusionL(direction, tileLayer, tileArray){
    for (let i = 0; i < 4; i++){
        tileArray[i].forEach((x,j)=>{
            if ((tileArray[i][j] != -1) && (j!=3) && (tileArray[i][j].number === tileArray[i][j+1].number)){
                let newTileNumber = tileArray[i][j].number+1;
                for(let k = j + 1; k < 3; k++){
                    if(tileArray[i][k] != -1){
                        let sprite_act_mv = cc.MoveTo.create(1,cc.p(normPos(k-1, i))); 
                        tileArray[i][k].runAction(sprite_act_mv);
                    }else{break;}

                }
                console.log(tileArray);
                tileLayer.removeChild(tileArray[i][j]);
                tileLayer.removeChild(tileArray[i][j+1]);
                tileArray[i].splice(j,2,new Tile(newTileNumber, j, i));
                tileArray[i].push(-1);
                tileLayer.addChild(tileArray[i][j], 2);
                tileArray[i][j].setScale(1.1,1.1);
                setTimeout(()=>{
                    let sprite_act_scl = cc.ScaleTo.create(0.4,1,1);
                    tileArray[i][j].runAction(sprite_act_scl);
                },500)
                
            }
        });
    }
}

function fusionR(direction, tileLayer, tileArray){
    for (let i = 0; i < 4; i++){
        for (let j = 3; j > -1; j--){
            if ((tileArray[i][j] != -1) && (j!=0) && (tileArray[i][j].number === tileArray[i][j-1].number)){
                let newTileNumber = tileArray[i][j].number+1;
                for(let k = j - 1; k > 0; k--){
                    if(tileArray[i][k] != -1){
                        let sprite_act_mv = cc.MoveTo.create(1,cc.p(normPos(k+1, i))); 
                        tileArray[i][k].runAction(sprite_act_mv);
                    }else{break;}

                }
                console.log(tileArray);
                tileLayer.removeChild(tileArray[i][j]);
                tileLayer.removeChild(tileArray[i][j-1]);
                tileArray[i].splice(j-1, 2, new Tile(newTileNumber, j, i));
                console.log(tileArray[i]);
                
                tileArray[i].unshift(-1);
                tileLayer.addChild(tileArray[i][j], 2);
                console.log(tileArray);
                
                tileArray[i][j].setScale(1.1,1.1);
                setTimeout(()=>{
                    let sprite_act_scl = cc.ScaleTo.create(0.4,1,1);
                    tileArray[i][j].runAction(sprite_act_scl);
                },500)
                
            }
        }
    }
}
function fusionU(direction, tileLayer, tileArray){
    for (let j = 0; j < 4; j++){
        for (let i = 0; i < 4; i++){
            if ((tileArray[i][j] != -1) && (i!=3) && (tileArray[i][j].number === tileArray[i+1][j].number)){
                let newTileNumber = tileArray[i][j].number+1;
                for(let k = i + 1; k < 3; k++){
                    if(tileArray[k][j] != -1){
                        let sprite_act_mv = cc.MoveTo.create(1,cc.p(normPos(j, k-1))); 
                        tileArray[k][j].runAction(sprite_act_mv);
                    }else{break;}

                }
                console.log(tileArray);
                tileLayer.removeChild(tileArray[i][j]);
                tileLayer.removeChild(tileArray[i+1][j]);
                tileArray[i][j] = new Tile(newTileNumber, j, i);
                for (let k = i+1; k < 3; k++){
                    tileArray[k][j] = tileArray[k+1][j];
                }
                
                console.log(tileArray);
                
                tileArray[3][j] = -1;
                tileLayer.addChild(tileArray[i][j], 2);
                console.log(tileArray);
                
                tileArray[i][j].setScale(1.1,1.1);
                setTimeout(()=>{
                    let sprite_act_scl = cc.ScaleTo.create(0.4,1,1);
                    tileArray[i][j].runAction(sprite_act_scl);
                },500)
                
            }
        }
    }
}
function fusionD(direction, tileLayer, tileArray){
    for (let j = 0; j < 4; j++){
        for (let i = 3; i > -1; i--){
            if ((tileArray[i][j] != -1) && (i!=0) && (tileArray[i][j].number === tileArray[i-1][j].number)){
                let newTileNumber = tileArray[i][j].number+1;
                for(let k = i - 1; k > 0; k--){
                    if(tileArray[k][j] != -1){
                        let sprite_act_mv = cc.MoveTo.create(1,cc.p(normPos(j, k-1))); 
                        tileArray[k][j].runAction(sprite_act_mv);
                    }else{break;}

                }
                console.log(tileArray);
                tileLayer.removeChild(tileArray[i][j]);
                tileLayer.removeChild(tileArray[i-1][j]);
                tileArray[i][j] = new Tile(newTileNumber, j, i);
                for (let k = i-1; k > 0; k--){
                    tileArray[k][j] = tileArray[k-1][j];
                }
                
                console.log(tileArray);
                
                tileArray[0][j] = -1;
                tileLayer.addChild(tileArray[i][j], 2);
                console.log(tileArray);
                
                tileArray[i][j].setScale(1.1,1.1);
                setTimeout(()=>{
                    let sprite_act_scl = cc.ScaleTo.create(0.4,1,1);
                    tileArray[i][j].runAction(sprite_act_scl);
                },500)
                
            }
        }
    }
}
var Tile = cc.Sprite.extend({
    ctor: function(number, x, y) {
        this._super("asset/Sprite_"+2**number+".png");
        this.number = number;
        this.setPosition(normPos(x,y));
      
    },
});
var BackgroundLayer = cc.Layer.extend({
    ctor: function (count) {
        this._super();
        var size = cc.director.getWinSize();
        var field = cc.Sprite.create(asset[0]);
        field.setPosition(size.width / 2, 365/2+9);              
        this.addChild(field, 0);
        var countField = cc.Sprite.create(asset[12]);
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

function movementX(tileArray, side){
    for (let i = 0; i < 4; i++){
        let filtered = tileArray[i].filter(x => x!=-1);
        tileArray[i].fill(-1);
        
        filtered.forEach((x,j) => {
            tileArray[i][(4-filtered.length)*side+j]= filtered[j];
            let sprite_act = cc.MoveTo.create(0.5,cc.p(normPos((4-filtered.length)*side+j, i)));
            tileArray[i][(4-filtered.length)*side+j].runAction(sprite_act);
        });

    }
}
function movementY(tileArray, side){
    for (let i=0;i<4;i++){
        let filtered = [];
        for(let j=0;j<4;j++){
            if(tileArray[j][i] != -1){
                filtered.push(tileArray[j][i]);
                tileArray[j][i] = -1;
            }
        }
        filtered.forEach((x,j) => {
            tileArray[(4-filtered.length)*side+j][i]= filtered[j];
            let sprite_act = cc.MoveTo.create(0.5,cc.p(normPos(i,(4-filtered.length)*side+j)));
            tileArray[(4-filtered.length)*side+j][i].runAction(sprite_act);
        });
    }
}

window.onload = function(){
    cc.game.onStart = function(){
        cc.LoaderScene.preload(asset, function() {
            cc.director.setDisplayStats(false);
            var MyScene = cc.Scene.extend({
                onEnter:function() {
                    this._super();
                    var count=0;
                    let backgroundLayer = new BackgroundLayer(count);
                    this.addChild(backgroundLayer, 1);
                    
                    let tileLayer = new TileLayer();
                    tileLayer.setPosition(25, 11);
                     
                    this.addChild(tileLayer, 1);
                    var tileArray = Array(4).fill(-1).map(x => Array(4).fill(-1));
            
                    addTile(tileLayer, tileArray, 1);
                    addTile(tileLayer, tileArray, 1);
                    // for (let i=0;i<4;i++){
                    //     let filtered = [];
                    //     for(let j=0;j<4;j++){
                    //         tileArray[i][j] = new Tile (i+j+1, j, i); 

                    //         tileLayer.addChild(tileArray[i][j], 2);
                    //         console.log(tileArray);
                    //         tileArray[i][j].setScale(0.1,0.1);
                    //         let sprite_act = cc.ScaleTo.create(0.4,1,1);
                    //         tileArray[i][j].runAction(sprite_act);
                    //     }
                    // }
                    
                    var addtile=false;
                    cc.eventManager.addListener({
                        event: cc.EventListener.MOUSE,
                        onMouseDown: function(event){
                            prevX = event._x;
                            prevY = event._y;
                        },
                        onMouseUp: function moving(event){
                            nextX = event._x;
                            nextY = event._y;
                            diffX = Math.abs(nextX) - Math.abs(prevX);
                            diffY = Math.abs(nextY) - Math.abs(prevY);
                            
                            if((Math.abs(diffX) > 50) || (Math.abs(diffY) > 50)) {
                                let direction = Math.abs(diffX) > Math.abs(diffY) ? 
                                diffX > 0 ? 'right' : 'left' : 
                                diffY > 0 ? 'up' : 'down' ;
                                console.log(direction);
                                switch(direction){
                                    case 'left': movementX(tileArray, 0); fusionL(direction, tileLayer, tileArray); addtile=true; 
                                        break;
                                    case 'right': movementX(tileArray, 1); fusionR(direction, tileLayer, tileArray); addtile=true;
                                        break;
                                    case 'up': movementY(tileArray, 0); fusionU(direction, tileLayer, tileArray); addtile=true;
                                        break;
                                    case 'down': movementY(tileArray, 1); fusionD(direction, tileLayer, tileArray); addtile=true;
                                        break;
                                }
                                if(addtile===true){addTile(tileLayer, tileArray);addtile=false;}
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