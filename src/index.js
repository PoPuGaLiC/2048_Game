var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// var MyScene = require("./MyScene");
var asset = ["asset/Field.png"];
for(let i = 1; i < 12; i++){
    asset[i] = "asset/Sprite_" + 2 ** i + ".png";
}
asset.push("asset/CountField.png");
const distBTWCentTilesX = 9 + 75;
const distBTWCentTilesY = 12 + 75;

function normPos(x, y){return {x: (x + 1) * distBTWCentTilesX - 75 / 2, y: (3 - y + 1)*distBTWCentTilesY - 75 / 2}};


var Tile = cc.Sprite.extend({
    nextX:null,
    nextY:null,
    ctor: function(number, x, y) {
        this._super("asset/Sprite_" + 2 ** number + ".png");
        this.number = number;
        this.setPosition(normPos(x, y));
        this.restart = 0;
    },
    animationCreation: function(){
        this.setScale(0.1, 0.1);
        return new Promise(resolve => this.runAction(cc.sequence([
            cc.scaleTo(0.4, 1, 1),
            cc.callFunc(resolve),
        ]))
        );
    },
    animationFusion: function(){
        this.setScale(1.1, 1.1);
        return new Promise(resolve => this.runAction(cc.sequence([
            cc.scaleTo(0.4, 1, 1),
            cc.callFunc(resolve),
        ])));
    }
});

var BackgroundLayer = cc.Layer.extend({
    ctor: function(){
        this._super();
        var size = cc.director.getWinSize();
        var field = cc.Sprite.create(asset[0]);
        field.setPosition(size.width / 2, 365 / 2 + 9);              
        this.addChild(field, 0);
        var countField = cc.Sprite.create(asset[12]);
        countField.setPosition(size.width / 2, size.height - (68 / 2 + 18));              
        this.addChild(countField, 0);
    },
});

var CountLabel = cc.LabelTTF.extend({
    count: 0,
    ctor: function(label, fontName, fontSize, size){
        this._super(label + this.count, fontName, fontSize);
        this.x = size.width / 2-25;
        this.y = size.height-(68/2 + 22+11);
        this.setFontFillColor(0, 0, 0);
    }
})

var TileLayer = cc.Layer.extend({
    
    anyMove: true,
    ctor: async function (size) {
        this._super();
        let tileLayer = this;
        this.tileArray = Array(4).fill(-1).map(x => Array(4).fill(-1))
        this.count = 0;
        this.countLabel = new CountLabel("СЧЁТ: ", "Arial", 32, size);
        
        this.addChild(this.countLabel, 2);
        // for(let i=0; i<14;i++){
            
        //     this.addTile(1);
        // }
        this.addTile(1);
        await this.addTile(1);
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            
            onMouseDown: function(event){
                prevX = event._x;
                prevY = event._y;
            },
            onMouseUp: async function(event){
                if(prevX!=null&&prevY!=null){
                    nextX = event._x;
                    nextY = event._y;
                    cc.eventManager.pauseTarget(tileLayer, true);
                    diffX = Math.abs(nextX) - Math.abs(prevX);
                    diffY = Math.abs(nextY) - Math.abs(prevY);
                    prevX = null;
                    prevY = null;
                    if((Math.abs(diffX) > 50) || (Math.abs(diffY) > 50)){
                        await tileLayer.checkMovement(diffX,diffY)
                    }
                    cc.eventManager.resumeTarget(tileLayer, true);
                }
            },
        }, this);
        
        

        
        // cc.eventManager.addListener({
        //     event: cc.EventListener.TOUCH_ONE_BY_ONE,
        //     onTouchBegan: function(touch, event){
        //         prevX = touch.getLocationX();
        //         prevY = touch.getLocationY();
        //         return true;
        //     },
        //     onTouchEnded: function(touch, event){
        //         nextX = touch.getLocationX();
        //         nextY = touch.getLocationY();
        //         diffX = Math.abs(nextX) - Math.abs(prevX);
        //         diffY = Math.abs(nextY) - Math.abs(prevY);
        //         if((Math.abs(diffX) > 50) || (Math.abs(diffY) > 50)){
        //             tileLayer.checkMovement(diffX,diffY);
        //         }
        //     },
        // }, this);
        
    },

    searchFreePlace: function(){
        let flatTileArr = this.tileArray.flat()
        if (flatTileArr.some(x => x === -1)) {
            while(true){
                let freePlace = Math.floor(Math.random() * 16);
                if (flatTileArr[freePlace] === -1){
                    return [Math.floor(freePlace / 4), freePlace % 4];
                } 
            }
        } else {
            alert("Нельзя сделать ход");
            this.restart();
        }
    },

    restart: function(){
        cc.director.runScene(new GameScene());
    },
    addTile: async function(start = 0){
        let [i, j] = this.searchFreePlace();
        let chance = (start === 1) ? 1 : 0.9;
        let numberTile = (chance > Math.random()) ? 1 : 2;

        this.tileArray[i][j] = new Tile (numberTile, j, i); 
        this.addChild(this.tileArray[i][j], 2);
        await this.tileArray[i][j].animationCreation();
        
    },

    checkMovement: async function(diffX, diffY){
        let direction = Math.abs(diffX) > Math.abs(diffY) ? 
            diffX > 0 ? 'right' : 'left' : 
            diffY > 0 ? 'up' : 'down';
        switch(direction){
            case 'left': this.movementX(0); this.fusionL1(); await this.movementAnimation(); this.fusionL2();
                break;
            case 'right': this.movementX(1); this.fusionR1(); await this.movementAnimation(); this.fusionR2();
                break;
            case 'up': this.movementY(0); this.fusionU1(); await this.movementAnimation(); this.fusionU2();
                break;
            case 'down': this.movementY(1); this.fusionD1(); await this.movementAnimation(); this.fusionD2();
                break;
        }
        if (this.checkWin()){
            alert("Уровень пройден");
            this.restart();
        };
        if (this.anyMove) this.addTile();
        
        this.anyMove = true;
    },
    movementAnimation: function(){
        let promiseArr = Array(this.tileArray.flat().length);
        console.log(promiseArr)
        for (let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                if(this.tileArray[i][j] != -1){
                    normNext= normPos(this.tileArray[i][j].nextX,this.tileArray[i][j].nextY);
                    if((Math.round(this.tileArray[i][j].x) != Math.round(normNext.x))||(Math.round(this.tileArray[i][j].y) != Math.round(normNext.y))){
                        console.log("X: "+ this.tileArray[i][j].x +"   "+normNext.x)
                        console.log("Y: "+this.tileArray[i][j].y +"   "+normNext.y)
                        promiseArr[4*i+j] = new Promise(resolve => this.tileArray[i][j].runAction(cc.sequence([
                            cc.moveTo(0.2, cc.p(normPos(this.tileArray[i][j].nextX, this.tileArray[i][j].nextY))),
                            
                            cc.callFunc(resolve),
                        ])))
                        // this.tileArray[i][j].x = this.tileArray[i][j].nextX;
                        // this.tileArray[i][j].y = this.tileArray[i][j].nextY;

                    }
                }
                
            }
        }
        if (promiseArr.every(x => x === null)) this.anyMove = false;
        return Promise.all(promiseArr);
    },

    movementX: function(side){
        let promiseArr = Array(this.tileArray.length);
        for (let i = 0; i < 4; i++){
            let filtered = this.tileArray[i].filter(x => x!=-1);
            if (filtered !=[]){
                this.tileArray[i].fill(-1);
            
                filtered.forEach((x,j) => {
                    this.tileArray[i][(4-filtered.length)*side+j]= filtered[j];
                    this.tileArray[i][(4-filtered.length)*side+j].nextX = (4-filtered.length)*side+j;
                    this.tileArray[i][(4-filtered.length)*side+j].nextY = i;
                });   
            }
            
        }
        
    },

    movementY: function(side){
        let promiseArr = Array(this.tileArray.length);
        for (let i = 0; i < 4; i++){
            let filtered = [];
            for(let j = 0; j < 4; j++){
                if(this.tileArray[j][i] != -1){
                    filtered.push(this.tileArray[j][i]);
                    this.tileArray[j][i] = -1;
                }
            };

            filtered.forEach((x,j) => {
                this.tileArray[(4-filtered.length)*side+j][i] = filtered[j];
                this.tileArray[(4-filtered.length)*side+j][i].nextX = i;
                this.tileArray[(4-filtered.length)*side+j][i].nextY = (4-filtered.length)*side+j;
            });
        };
    },

    changeCount: function(number){
        this.countLabel.count = this.countLabel.count + (2**number)*2;
        this.countLabel.setString('СЧЁТ: '+ this.countLabel.count);
    },

    fusionL1: async function(){
        for (let i = 0; i < 4; i++){
            for (let j = 0; j < 4; j++){
                if ((this.tileArray[i][j] != -1) && (j!=3) && (this.tileArray[i][j].number === this.tileArray[i][j+1].number)){
                    for(let k = j + 1; k < 4; k++){
                        if(this.tileArray[i][k] != -1){
                            this.tileArray[i][k].nextX = k-1
                            this.tileArray[i][k].nextY = i
                        }else{break;}
                    }
                    // for(let k = j + 1; k < 3; k++){
                    //     if(this.tileArray[i][k] != -1){
                    //         let sprite_act_mv = cc.MoveTo.create(1,cc.p(normPos(k-1, i))); 
                    //         this.tileArray[i][k].runAction(sprite_act_mv);
                    //     }else{break;}

                    // };
                    
                }
            }
        }
    },
    fusionL2: async function(){
        for (let i = 0; i < 4; i++){
            for (let j = 0; j < 4; j++){
                if ((this.tileArray[i][j] != -1) && (j!=3) && (this.tileArray[i][j].number === this.tileArray[i][j+1].number)){
                    let newTileNumber = this.tileArray[i][j].number+1;
                    this.changeCount(this.tileArray[i][j].number);
                    this.removeChild(this.tileArray[i][j]);
                    this.removeChild(this.tileArray[i][j+1]);

                    this.tileArray[i].splice(j,2,new Tile(newTileNumber, j, i));
                    this.tileArray[i].push(-1);
                    this.addChild(this.tileArray[i][j], 2);
                    this.tileArray[i][j].animationFusion();
                }
                
            }
        }
        
    },
    fusionR1: async function(){
        for (let i = 0; i < 4; i++){
            for (let j = 3; j > -1; j--){
                if ((this.tileArray[i][j] != -1) && (j!=0) && (this.tileArray[i][j].number === this.tileArray[i][j-1].number)){
                    
                    for(let k = j - 1; k > -1; k--){
                        if(this.tileArray[i][k] != -1){
                            this.tileArray[i][k].nextX = k+1;
                            this.tileArray[i][k].nextY = i;
                        }else{break;}
                    };
                   

                    // for(let k = j - 1; k > 0; k--){
                    //     if(this.tileArray[i][k] != -1){
                    //         let sprite_act_mv = cc.MoveTo.create(1,cc.p(normPos(k+1, i))); 
                    //         this.tileArray[i][k].runAction(sprite_act_mv);
                    //     }else{break;}

                    // };

                   
                }
            }
        }
    },
    fusionR2: async function(){
        for (let i = 0; i < 4; i++){
            for (let j = 3; j > -1; j--){
                if ((this.tileArray[i][j] != -1) && (j!=0) && (this.tileArray[i][j].number === this.tileArray[i][j-1].number)){
                    let newTileNumber = this.tileArray[i][j].number+1;
                    this.changeCount(this.tileArray[i][j].number);
                    this.removeChild(this.tileArray[i][j]);
                    this.removeChild(this.tileArray[i][j-1]);

                    this.tileArray[i].splice(j-1, 2, new Tile(newTileNumber, j, i));
                    this.tileArray[i].unshift(-1);
                    this.addChild(this.tileArray[i][j], 2);
                    this.tileArray[i][j].animationFusion();
                    
                }
            }
        }
    },
    fusionU1: async function(){
        for (let j = 0; j < 4; j++){
            for (let i = 0; i < 4; i++){
                if ((this.tileArray[i][j] != -1) && (i!=3) && (this.tileArray[i][j].number === this.tileArray[i+1][j].number)){
                    for(let k = i + 1; k < 4; k++){
                        if(this.tileArray[k][j] != -1){
                            this.tileArray[k][j].nextX = j;
                            this.tileArray[k][j].nextY = k-1;
                        }else{break;}
                    };
                    // for(let k = i + 1; k < 3; k++){
                    //     if(this.tileArray[k][j] != -1){
                    //         let sprite_act_mv = cc.MoveTo.create(1,cc.p(normPos(j, k-1))); 
                    //         this.tileArray[k][j].runAction(sprite_act_mv);
                    //     }else{break;}

                    // };
                    
                    
                    
                }
            }
        }
    },
    fusionU2: async function(){
        for (let j = 0; j < 4; j++){
            for (let i = 0; i < 4; i++){
                if ((this.tileArray[i][j] != -1) && (i!=3) && (this.tileArray[i][j].number === this.tileArray[i+1][j].number)){
                    let newTileNumber = this.tileArray[i][j].number+1;
                    this.changeCount(this.tileArray[i][j].number);
                    this.removeChild(this.tileArray[i][j]);
                    this.removeChild(this.tileArray[i+1][j]);

                    this.tileArray[i][j] = new Tile(newTileNumber, j, i);
                    for (let k = i+1; k < 3; k++){
                        this.tileArray[k][j] = this.tileArray[k+1][j];
                    };
                    this.tileArray[3][j] = -1;
                    this.addChild(this.tileArray[i][j], 2);
                    this.tileArray[i][j].animationFusion();
                }
            }
        }
    },
    fusionD1: async function(){
        for (let j = 0; j < 4; j++){
            for (let i = 3; i > -1; i--){
                if ((this.tileArray[i][j] != -1) && (i!=0) && (this.tileArray[i][j].number === this.tileArray[i-1][j].number)){
                    for(let  k = i - 1; k > -1; k--){
                        if(this.tileArray[k][j] != -1){
                            this.tileArray[k][j].nextX = j;
                            this.tileArray[k][j].nextY = k+1;
                        }else{break;}
                    };
                    // for(let k = i - 1; k > 0; k--){
                    //     if(this.tileArray[k][j] != -1){
                    //         let sprite_act_mv = cc.MoveTo.create(1, cc.p(normPos(j, k-1))); 
                    //         this.tileArray[k][j].runAction(sprite_act_mv);
                    //     }else{
                    //         break;
                    //     };
                    // };

                    
                }
            }
        }
    },
    
    fusionD2: async function(){
        for (let j = 0; j < 4; j++){
            for (let i = 3; i > -1; i--){
                if ((this.tileArray[i][j] != -1) && (i!=0) && (this.tileArray[i][j].number === this.tileArray[i-1][j].number)){
                    let newTileNumber = this.tileArray[i][j].number+1;
                    this.changeCount(this.tileArray[i][j].number);
                    this.removeChild(this.tileArray[i][j]);
                    this.removeChild(this.tileArray[i-1][j]);

                    this.tileArray[i][j] = new Tile(newTileNumber, j, i);
                    for (let k = i-1; k > 0; k--){
                        this.tileArray[k][j] = this.tileArray[k-1][j];
                    }
                    this.tileArray[0][j] = -1;
                    this.addChild(this.tileArray[i][j], 2);
                    this.tileArray[i][j].animationFusion();
                }
            }
        }
    },
    checkWin: function(){
        return this.tileArray.flat().some(x => x.number === 11);
    },

});



var GameScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var size = cc.director.getWinSize();
        this.backgroundLayer = new BackgroundLayer();
        this.addChild(this.backgroundLayer, 1);
        
        this.tileLayer = new TileLayer(size);
        this.tileLayer.setPosition(25, 11);
        this.addChild(this.tileLayer, 1);
        
    },
    // onExit: function(){
    //     console.log("GGGGGG")
    //     console.log(this.getChildrenCount())
    //     this.tileLayer.tileArray = null;
    //     this.backgroundLayer = null;
    //     this.removeChild(this.backgroundLayer, 1);
    //     this.removeChild(this.tileLayer, 1);
    // }
   
});
window.onload = function(){
    cc.game.onStart = function(){
        cc.director.setDisplayStats(false);
        cc.LoaderScene.preload(asset, function() {
            cc.director.runScene(new GameScene());
        }, this);
        
    };
    cc.game.run("canvas");
};
