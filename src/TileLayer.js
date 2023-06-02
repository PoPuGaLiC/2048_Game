import {Tile} from './Tile';
import {CountLabel} from './CountLabel';
import {GameScene} from './GameScene';

const distBTWCentTilesX = 9 + 75;
const distBTWCentTilesY = 12 + 75;

export function normPos(x, y) {return {x: (x + 1) * distBTWCentTilesX - 75 / 2, y: (3 - y + 1)*distBTWCentTilesY - 75 / 2}};


export class TileLayer extends cc.Layer{
    constructor(size) {
        super();
        this.prevX = null;
        this.prevY = null;
        
        this.prevTileArray = Array(4).fill(-1).map(x => Array(4).fill(-1)).flat()
        this.tileArray = Array(4).fill(-1).map(x => Array(4).fill(-1));
        this.count = 0;
        this.countLabel = new CountLabel("СЧЁТ: "+this.count, "Arial", 32, size);
        this.addChild(this.countLabel, 2);

        this.addTile(1);
        this.addTile(1);
        
        if(cc.sys.capabilities.hasOwnProperty('mouse')){
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseDown: (event) => {
                    this.prevX = event._x;
                    this.prevY = event._y;
                },
                onMouseUp: (event) => {
                    this.checkMovement(event._x, event._y)
                },
            }, this);
        }
        
        if(cc.sys.capabilities.hasOwnProperty('touches')){
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: (touch, event)=>{
                    this.prevX = touch.getLocationX();
                    this.prevY = touch.getLocationY();
                    return true;
                },
                onTouchEnded: (touch, event)=>{
                    this.checkMovement(touch.getLocationX(), touch.getLocationY())
                },
            }, this);
        }
    }

    async checkMovement(nextX, nextY){
        if(this.prevX != null&& this.prevY != null){
            cc.eventManager.pauseTarget(this, true);
            
            let diffX = Math.abs(nextX) - Math.abs(this.prevX);
            let diffY = Math.abs(nextY) - Math.abs(this.prevY);
            this.prevX = null;
            this.prevY = null;

            if((Math.abs(diffX) > 50) || (Math.abs(diffY) > 50)){
                await this.movement(diffX, diffY)
            }
            cc.eventManager.resumeTarget(this, true);
        }
    }

    searchFreePlace(){
        let flatTileArr = this.tileArray.flat();
        while(true){
            let freePlace = Math.floor(Math.random() * 16);
            if (flatTileArr[freePlace] === -1){
                return [Math.floor(freePlace / 4), freePlace % 4];
            } 
        }
    }

    checkGameOver(){
        if (this.tileArray.flat().every(x => x != -1)){
            for(let i=0;i<4;i++){
                for(let j=0;j<4;j++){
                    switch(this.tileArray[i][j]?.number){
                        case ((i>1) ? this.tileArray[i-1][j]?.number : null):
                        case ((i<3) ? this.tileArray[i+1][j]?.number  : null):
                        case ((j>1) ? this.tileArray[i][j-1]?.number : null):  
                        case ((j<3) ? this.tileArray[i][j+1]?.number : null):
                            return false;
                            
                    }
                }
            }
            return true;
        } else return false;
    }

    restart(){
        cc.director.runScene(new GameScene());
    }
    
    async addTile(start = 0){
        let [i, j] = this.searchFreePlace();
        let chance = (start === 1) ? 1 : 0.9;
        let numberTile = (chance > Math.random()) ? 1 : 2;

        this.tileArray[i][j] = new Tile (numberTile, j, i); 
        this.addChild(this.tileArray[i][j], 2);
        await this.tileArray[i][j].animationCreation();
        
    }

    async movement(diffX, diffY){
        this.prevTileArray = this.tileArray.flat();
        let direction = Math.abs(diffX) > Math.abs(diffY) ? 
            diffX > 0 ? 'right' : 'left' : 
            diffY > 0 ? 'up' : 'down';
        switch(direction){
            case 'left': this.movementX(0); this.fusionMovL(); await this.movementAnimation(); await this.fusionL();
                break;
            case 'right': this.movementX(1); this.fusionMovR(); await this.movementAnimation(); await this.fusionR();
                break;
            case 'up': this.movementY(0); this.fusionMovU(); await this.movementAnimation(); await this.fusionU();
                break;
            case 'down': this.movementY(1); this.fusionMovD(); await this.movementAnimation(); await this.fusionD();
                break;
        }
        if ((this.tileArray.flat().some((x,j) => x!=this.prevTileArray[j]))&&this.tileArray.flat().some(x => x===-1)){
            await this.addTile();
        };

        if (this.checkWin()){
            alert("Уровень пройден");
            this.restart();
        };
        
        if (this.checkGameOver()) {
            alert("Нельзя сделать ход");
            this.restart();
        };
        
    }

    movementAnimation(){
        let promiseArr = Array(this.tileArray.flat().length);
        for (let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                if(this.tileArray[i][j] != -1){
                    promiseArr[4*i+j] = new Promise(resolve => this.tileArray[i][j].runAction(cc.sequence([
                        cc.moveTo(0.2, cc.p(normPos(this.tileArray[i][j].nextX, this.tileArray[i][j].nextY))),
                        cc.callFunc(resolve),
                    ])));
                };
            };
        };
        return Promise.all(promiseArr);
    }

    movementX(side){
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
        
    }

    movementY(side){
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
    }

    changeCount(number){
        this.count = this.count + (2**number)*2;
        this.countLabel.setString('СЧЁТ: '+ this.count);
    }

    async fusionMovL(){
        for (let i = 0; i < 4; i++){
            for (let j = 0; j < 4; j++){
                if ((this.tileArray[i][j] != -1) && (j!=3) && (this.tileArray[i][j].number === this.tileArray[i][j+1].number)){
                    for(let k = j + 1; k < 4; k++){
                        if(this.tileArray[i][k] != -1){
                            this.tileArray[i][k].nextX = k-1
                            this.tileArray[i][k].nextY = i
                        }else{break;}
                    }
                }
            }
        }
    }

    async fusionL(){
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
                };
            };
        };
    }

    async fusionMovR(){
        for (let i = 0; i < 4; i++){
            for (let j = 3; j > -1; j--){
                if ((this.tileArray[i][j] != -1) && (j!=0) && (this.tileArray[i][j].number === this.tileArray[i][j-1].number)){
                    
                    for(let k = j - 1; k > -1; k--){
                        if(this.tileArray[i][k] != -1){
                            this.tileArray[i][k].nextX = k+1;
                            this.tileArray[i][k].nextY = i;
                        }else{break;}
                    }; 
                };
            };
        };
    }

    async fusionR(){
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
                };
            };
        };
    }

    async fusionMovU(){
        for (let j = 0; j < 4; j++){
            for (let i = 0; i < 4; i++){
                if ((this.tileArray[i][j] != -1) && (i!=3) && (this.tileArray[i][j].number === this.tileArray[i+1][j].number)){
                    for(let k = i + 1; k < 4; k++){
                        if(this.tileArray[k][j] != -1){
                            this.tileArray[k][j].nextX = j;
                            this.tileArray[k][j].nextY = k-1;
                        }else{break;}
                    };
                };
            };
        };
    }

    async fusionU(){
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
    }

    async fusionMovD(){
        for (let j = 0; j < 4; j++){
            for (let i = 3; i > -1; i--){
                if ((this.tileArray[i][j] != -1) && (i!=0) && (this.tileArray[i][j].number === this.tileArray[i-1][j].number)){
                    for(let  k = i - 1; k > -1; k--){
                        if(this.tileArray[k][j] != -1){
                            this.tileArray[k][j].nextX = j;
                            this.tileArray[k][j].nextY = k+1;
                        }else{break;}
                    };
                };
            };
        };
    }
    
    async fusionD(){
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
                };
            };
        };
    }

    checkWin(){
        return this.tileArray.flat().some(x => x.number === 11);
    }

};
