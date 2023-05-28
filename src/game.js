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
    ctor: function(number, x, y) {
        this._super("asset/Sprite_" + 2 ** number + ".png");
        this.number = number;
        this.setPosition(normPos(x, y));
    },
    // animationCreation: function(){
    //     this.setScale(0.1, 0.1);
    //     this.runAction(cc.scaleTo(0.4, 1, 1));
    // },
    // animationFusion: function(){
    //     this.setScale(1.1, 1.1);
    //     this.runAction(cc.scaleTo(0.4, 1, 1));
    // }
    animationCreation: async function(){
        this.setScale(0.1, 0.1);
        console.log(this)
        return  new Promise(resolve => {
            console.log(this)
            this.runAction(cc.sequence([
            cc.scaleTo(0.4, 1, 1),
            
            cc.callFunc(resolve),
        ]))
        });
    },
    animationFusion: async function(){
        this.setScale(1.1, 1.1);
        return await new Promise(resolve => this.runAction(cc.sequence([
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
    tileArray: Array(4).fill(-1).map(x => Array(4).fill(-1)),
    freeSpace: false,
    count: 0,
    ctor: function (size) {
        this._super();
        let tileLayer = this;
        this.countLabel = new CountLabel("СЧЁТ: ", "Arial", 32, size);
        this.addChild(this.countLabel, 2);
           
        this.addTile(1);
        this.addTile(1);

        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function(event){
                prevX = event._x;
                prevY = event._y;
            },
            onMouseUp: function(event){
                nextX = event._x;
                nextY = event._y;
                diffX = Math.abs(nextX) - Math.abs(prevX);
                diffY = Math.abs(nextY) - Math.abs(prevY);
                if((Math.abs(diffX) > 50) || (Math.abs(diffY) > 50)){
                    tileLayer.checkMovement(diffX,diffY);
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
        while(true){
            let freePlace = Math.floor(Math.random() * 16);
            if (flatTileArr[freePlace] === -1){
                return [Math.floor(freePlace / 4), freePlace % 4];
            } 
            if (flatTileArr.every(x => x === -1)) return alert("Нельзя сделать ход");   
        }
    },

    addTile: async function(start = 0){
        let [i, j] = this.searchFreePlace();
        let chance = (start === 1) ? 1 : 0.9;
        let numberTile = (chance > Math.random()) ? 1 : 2;

        this.tileArray[i][j] = new Tile (numberTile, j, i); 
        this.addChild(this.tileArray[i][j], 2);
        await this.tileArray[i][j].animationCreation();
    },

    checkMovement: function(diffX, diffY){
        let direction = Math.abs(diffX) > Math.abs(diffY) ? 
            diffX > 0 ? 'right' : 'left' : 
            diffY > 0 ? 'up' : 'down';
        switch(direction){
            case 'left': this.movementX(0); 
                break;
            case 'right': this.movementX(1); 
                break;
            case 'up': this.movementY(0); 
                break;
            case 'down': this.movementY(1);
                break;
        }
        if (this.checkWin()){
            alert("Уровень пройден");
            // cc.director.runScene(new GameScene());
        };
        this.addTile();
    },

    // wait: async function(){
    //     return new Promise(r => setTimeout(()=>r(),2000))
    // },

    movementX: function(side){
        for (let i = 0; i < 4; i++){
            let filtered = this.tileArray[i].filter(x => x!=-1);
            this.tileArray[i].fill(-1);
            
            filtered.forEach(async(x,j) => {
                this.tileArray[i][(4-filtered.length)*side+j]= filtered[j];
                console.log(this.tileArray[i][(4-filtered.length)*side+j])
                return await new Promise(resolve => {
                    
                    this.tileArray[i][(4-filtered.length)*side+j].runAction(cc.sequence([
                            cc.moveTo(0.5, cc.p(normPos((4-filtered.length)*side+j, i))),
                            cc.callFunc(resolve),
                        ]))
                    console.log(this.tileArray[i][(4-filtered.length)*side+j])
                    });

                });


            // filtered.forEach((x,j) => {
            //     this.tileArray[i][(4-filtered.length)*side+j]= filtered[j];
            //     let sprite_act = cc.MoveTo.create(0.5, cc.p(normPos((4-filtered.length)*side+j, i)));
            //     this.tileArray[i][(4-filtered.length)*side+j].runAction(sprite_act);
            // });
            // animationCreation: async function(){
            //     this.setScale(0.1, 0.1);
            //     return new Promise(resolve => this.runAction(cc.sequence([
            //         cc.scaleTo(0.4, 1, 1),
            //         cc.callFunc(resolve),
            //     ])));
            // },
        }
    },
    movementY: function(side){
        for (let i = 0; i < 4; i++){
            let filtered = [];
            for(let j = 0; j < 4; j++){
                if(this.tileArray[j][i] != -1){
                    filtered.push(this.tileArray[j][i]);
                    this.tileArray[j][i] = -1;
                }
            };
            filtered.forEach((x,j) => {
                this.tileArray[(4-filtered.length)*side+j][i]= filtered[j];
                return new Promise(resolve => this.tileArray[(4-filtered.length)*side+j][i].runAction(cc.sequence([
                    cc.moveTo(0.5, cc.p(normPos(i,(4-filtered.length)*side+j))),
                    cc.callFunc(resolve),
                ])));
                // let sprite_act = cc.MoveTo.create(0.5,cc.p(normPos(i,(4-filtered.length)*side+j)));
                // this. tileArray[(4-filtered.length)*side+j][i].runAction(sprite_act);
            });
           
            // filtered.forEach((x,j) => {
            //     this.tileArray[(4-filtered.length)*side+j][i]= filtered[j];
            //     let sprite_act = cc.MoveTo.create(0.5,cc.p(normPos(i,(4-filtered.length)*side+j)));
            //     this. tileArray[(4-filtered.length)*side+j][i].runAction(sprite_act);
            // });
        }
    },
    changeCount: function(number){
        this.countLabel.count = this.countLabel.count + (2**number)*2;
        this.countLabel.setString('СЧЁТ: '+ this.countLabel.count);
    },

    fusionL: function(){
        for (let i = 0; i < 4; i++){
            this.tileArray[i].forEach((x,j)=>{
                if ((this.tileArray[i][j] != -1) && (j!=3) && (this.tileArray[i][j].number === this.tileArray[i][j+1].number)){
                    let newTileNumber = this.tileArray[i][j].number+1;
                    for(let k = j + 1; k < 3; k++){
                        if(this.tileArray[i][k] != -1){
                            let sprite_act_mv = cc.MoveTo.create(1,cc.p(normPos(k-1, i))); 
                            this.tileArray[i][k].runAction(sprite_act_mv);
                        }else{break;}

                    };

                    this.changeCount(this.tileArray[i][j].number);
                    this.removeChild(this.tileArray[i][j]);
                    this.removeChild(this.tileArray[i][j+1]);

                    this.tileArray[i].splice(j,2,new Tile(newTileNumber, j, i));
                    this.tileArray[i].push(-1);
                    this.addChild(this.tileArray[i][j], 2);
                    this.tileArray[i][j].animationFusion();
                }
            });
        }
    },
    fusionR: function(){
        for (let i = 0; i < 4; i++){
            for (let j = 3; j > -1; j--){
                if ((this.tileArray[i][j] != -1) && (j!=0) && (this.tileArray[i][j].number === this.tileArray[i][j-1].number)){
                    let newTileNumber = this.tileArray[i][j].number+1;
                    for(let k = j - 1; k > 0; k--){
                        if(this.tileArray[i][k] != -1){
                            let sprite_act_mv = cc.MoveTo.create(1,cc.p(normPos(k+1, i))); 
                            this.tileArray[i][k].runAction(sprite_act_mv);
                        }else{break;}

                    };

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
    fusionU: function(){
        for (let j = 0; j < 4; j++){
            for (let i = 0; i < 4; i++){
                if ((this.tileArray[i][j] != -1) && (i!=3) && (this.tileArray[i][j].number === this.tileArray[i+1][j].number)){
                    let newTileNumber = this.tileArray[i][j].number+1;
                    for(let k = i + 1; k < 3; k++){
                        if(this.tileArray[k][j] != -1){
                            let sprite_act_mv = cc.MoveTo.create(1,cc.p(normPos(j, k-1))); 
                            this.tileArray[k][j].runAction(sprite_act_mv);
                        }else{break;}

                    };

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
    fusionD: function(){
        for (let j = 0; j < 4; j++){
            for (let i = 3; i > -1; i--){
                if ((this.tileArray[i][j] != -1) && (i!=0) && (this.tileArray[i][j].number === this.tileArray[i-1][j].number)){
                    let newTileNumber = this.tileArray[i][j].number+1;
                    for(let k = i - 1; k > 0; k--){
                        if(this.tileArray[k][j] != -1){
                            let sprite_act_mv = cc.MoveTo.create(1, cc.p(normPos(j, k-1))); 
                            this.tileArray[k][j].runAction(sprite_act_mv);
                        }else{
                            break;
                        };
                    };

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
    onEnter:function() {
        this._super();
        var size = cc.director.getWinSize();
        let backgroundLayer = new BackgroundLayer();
        this.addChild(backgroundLayer, 1);
        
        let tileLayer = new TileLayer(size);
        tileLayer.setPosition(25, 11);
        this.addChild(tileLayer, 1);
        
    }
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