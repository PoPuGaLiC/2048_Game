import {Tile} from './Tile';
import {CountLabel} from './CountLabel';
import {GameScene} from './GameScene';
import {normXY} from './normalizedXY';

export class TileLayer extends cc.Layer {
    constructor(size) {
        super();
        this.prevX = null;
        this.prevY = null;
        this.direction = null;
        this.tileField = Array(4).fill(-1).map(x => Array(4).fill(-1));
        this.prevTileArray = this.tileField.flat();

        this.count = 0;
        this.countLabel = new CountLabel("СЧЁТ: " + this.count, "Arial", 32, size);
        this.addChild(this.countLabel, 2);

        this.addTile(1);
        this.addTile(1);
        
        if ( cc.sys.capabilities.hasOwnProperty('mouse') ) {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseDown: (touch) => {
                    this.prevX = touch.getLocationX();
                    this.prevY = touch.getLocationY();
                },
                onMouseUp: (touch) => {
                    this.checkMovement(touch.getLocationX(), touch.getLocationY())
                },
            }, this);
        };
        
        if ( cc.sys.capabilities.hasOwnProperty('touches') ) {
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: (touch) => {
                    this.prevX = touch.getLocationX();
                    this.prevY = touch.getLocationY();
                    return true;
                },
                onTouchEnded: (touch) => {
                    this.checkMovement(touch.getLocationX(), touch.getLocationY())
                },
            }, this);
        };
    };

    async checkMovement(nextX, nextY) {
        if ((this.prevX != null) && (this.prevY != null)) {
            cc.eventManager.pauseTarget(this, true);
            
            let diffX = Math.abs(nextX) - Math.abs(this.prevX);
            let diffY = Math.abs(nextY) - Math.abs(this.prevY);
            this.prevX = null;
            this.prevY = null;

            if ((Math.abs(diffX) > 50) || (Math.abs(diffY) > 50)) {
                await this.movement(diffX, diffY);
            };
            cc.eventManager.resumeTarget(this, true);
        };
    };

    searchFreePlace() {
        let flatTileArr = this.tileField.flat();
        while (true) {
            let freePlace = Math.floor(Math.random() * 16);
            if (flatTileArr[freePlace] === -1) {
                return [Math.floor(freePlace / 4), freePlace % 4];
            }; 
        };
    };
    
    async addTile(start = 0) {
        let [i, j] = this.searchFreePlace();
        let chance = (start === 1) ? 1 : 0.9;
        let numberTile = (chance > Math.random()) ? 1 : 2;

        this.tileField[i][j] = new Tile (numberTile, j, i); 
        this.addChild(this.tileField[i][j], 2);
        await this.tileField[i][j].animationCreation();
    };

    async movement(diffX, diffY) {
        this.prevTileArray = this.tileField.flat();
        this.direction = Math.abs(diffX) > Math.abs(diffY) ? 
            diffX > 0 ? 'right' : 'left' : 
            diffY > 0 ? 'up' : 'down';
            
        this.movementTiles();
        this.mergeTiles();
        await this.movementAnimation();
        await this.mergeAnimation();

        if ((this.tileField.flat().some(x => x === -1)) &&
            (this.tileField.flat().some((x, j) => x != this.prevTileArray[j]))
        ) {
            await this.addTile();
        };
        
        if (this.checkWin()) {
            alert("Уровень пройден");
            this.restart();
        };
        
        if (this.checkGameOver()) {
            alert("Нельзя сделать ход");
            this.restart();
        };
        
    };

    pushInTileQueue(tileQueue, i, j) {
        tileQueue.push(this.tileField[i][j]);
        this.tileField[i][j] = -1;
        return tileQueue;
    };

    updateTileXY(i, j, x) {
        this.tileField[i][j] = x;
        this.tileField[i][j].nextX = j;
        this.tileField[i][j].nextY = i;
    };

    movementTiles() {
        for (let i = 0; i < 4; i++){
            let tileQueue = [];
            for(let j = 0; j < 4; j++) {
                switch (this.direction) {
                    case ('left'):
                    case ('right'):
                        if (this.tileField[i][j] != -1) {
                            tileQueue = this.pushInTileQueue(tileQueue, i,j);
                        };
                        break;
                    case ('up'):
                    case ('down'):
                        if (this.tileField[j][i] != -1) {
                            tileQueue = this.pushInTileQueue(tileQueue, j, i);
                        };
                        break;
                };
            };

            tileQueue.forEach((x, j) => {
                switch (this.direction){
                    case 'left':
                        this.updateTileXY(i, j, x);
                        break;
                    case 'right':
                        this.updateTileXY(i, 4 - tileQueue.length + j, x);
                        break;
                    case 'up':
                        this.updateTileXY(j, i, x);
                        break;
                    case 'down':
                        this.updateTileXY(4 - tileQueue.length + j, i, x);
                        break;
                };
            });
        };
    };

    changeCount(number) {
        this.count = this.count + (2 ** number) * 2;
        this.countLabel.setString('СЧЁТ: ' + this.count);
    };

    createSequence(i) {
        let sequence = [];
        switch (this.direction) {
            case 'left':
                sequence = this.tileField[i];
                break;
            case 'right':
                sequence = this.tileField[i].slice(0).reverse();
                break;
            case 'up':
                this.tileField[i].forEach((x, j) => sequence[j] = this.tileField[j][i]);
                break;
            case 'down':
                this.tileField[i].forEach((x, j) => sequence[j] = this.tileField[j][i]);
                sequence.reverse();
                break;
        }
        return sequence;
    };

    updateTileField(i, sequence) {
        switch (this.direction) {
            case 'left':
                this.tileField[i] = sequence;
                break;
            case 'right':
                this.tileField[i] = sequence.slice(0).reverse();
                break;
            case 'up':
                sequence.forEach((x, j) => this.tileField[j][i] = sequence[j]);
                break;
            case 'down':
                sequence.reverse();
                sequence.forEach((x, j) => this.tileField[j][i] = sequence[j]);
                break;
        };
    };

    mergeTiles() {
        for (let i = 0; i < 4; i++) {
            let sequence = this.createSequence(i);
            let flag = null;
            for (let j = 0; j < 3; j++) {
                if ((sequence[j] != -1) && (sequence[j].number === sequence[j+1].number)) {
                    if (flag != sequence[j].number){
                        let temp1 = [sequence[j].nextX, sequence[j].nextY];
                        flag = sequence[j].number;
                        for (let k = j; k < 3; k++) {
                            if (sequence[k + 1] != -1) {
                                let temp2 = [sequence[k+1].nextX, sequence[k+1].nextY]
                                sequence[k+1].nextX = temp1[0]
                                sequence[k+1].nextY = temp1[1]
                                temp1 = temp2;
                            };
                        };
                    } else {
                        flag = null;
                    };
                };
            };
            this.updateTileField(i, sequence);
        };
    };

    movementAnimation(){
        let promiseArr = Array(this.tileField.flat().length);
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.tileField[i][j] != -1) {
                    promiseArr[4 * i + j] = new Promise(resolve => this.tileField[i][j].runAction(cc.sequence([
                        cc.moveTo(0.2, cc.p( normXY(this.tileField[i][j].nextX, this.tileField[i][j].nextY)) ),
                        cc.callFunc(resolve),
                    ])));
                };
            };
        };
        return Promise.all(promiseArr);
    };

    mergeAnimation() {
        for (let i = 0; i < 4; i++) {
            let sequence = this.createSequence(i);
            for (let j = 0; j < 3; j++) {
                if ((sequence[j] != -1) && (sequence[j].number === sequence[j + 1].number)) {
                    const newTileNumber = sequence[j].number + 1;
                    this.changeCount(sequence[j].number);
                    this.removeChild(sequence[j]);
                    this.removeChild(sequence[j + 1]);
                    switch (this.direction) {
                        case 'left':
                            sequence.splice(j, 2, new Tile(newTileNumber, j, i));
                            break;
                        case 'right':
                            sequence.splice(j, 2, new Tile(newTileNumber, 3 - j, i));
                            break;
                        case 'up':
                            sequence.splice(j, 2, new Tile(newTileNumber, i, j));
                            break;
                        case 'down':
                            sequence.splice(j, 2, new Tile(newTileNumber, i, 3 - j));
                            break;
                    };
                    sequence.push(-1);
                    this.addChild(sequence[j], 2);
                    sequence[j].animationFusion();
                };
            };
            this.updateTileField(i, sequence);
        };
    };

    checkWin() {
        return this.tileField.flat().some(x => x.number === 11);
    };

    checkGameOver() {
        if (this.tileField.flat().every(x => x != -1)) {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    switch (this.tileField[i][j]?.number) {
                        case ((i > 1) ? this.tileField[i - 1][j]?.number : null):
                        case ((i < 3) ? this.tileField[i + 1][j]?.number : null):
                        case ((j > 1) ? this.tileField[i][j - 1]?.number : null):  
                        case ((j < 3) ? this.tileField[i][j + 1]?.number : null):
                            return false;
                    };
                };
            };
            return true;
        } else {
            return false;
        };
    };

    restart() {
        cc.director.runScene(new GameScene());
    };
};
