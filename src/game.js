onMouseUp: function(event){
    nextX=event._x;
    nextY=event._y;
    diffX=Math.abs(nextX)-Math.abs(prevX);
    diffY=Math.abs(nextY)-Math.abs(prevY);
    if((Math.abs(diffX) > 50) || (Math.abs(diffY)>50)) {
        
        let direction = Math.abs(diffX)>Math.abs(diffY)? diffX>0? 'right' : 'left' : diffY>0? 'up' : 'down' ;
        console.log(direction);
        switch(direction){
            case 'left':
                for (let i=0;i<4;i++){

                    let filtered = tileArray[i].filter(x => x!=-1);
                    tileArray[i].fill(-1);

                    filtered.forEach((x,j) => {tileArray[i][j]= filtered[j];tileArray[i][j].setPos(j+1, 4-i)});

                }
                break;
            case 'right':
                for (let i=0;i<4;i++){

                    let filtered = tileArray[i].filter(x => x!=-1);
                    tileArray[i].fill(-1);

                    filtered.forEach((x,j) => {tileArray[i][4-filtered.length+j]= filtered[j];tileArray[i][4-filtered.length+j].setPos(4-filtered.length+j+1, 4-i)});

                }
                break;
                case 'up':
                    for (let i=0;i<4;i++){
                        let filtered = [];
                        for(let j=0;j<4;j++){
                            if(tileArray[j][i] != -1){
                                filtered.push(tileArray[j][i]);
                                tileArray[j][i] = -1;
                            }
                        }
                        filtered.forEach((x,j) => {tileArray[j][i] = filtered[j];tileArray[j][i].setPos(i+1, 4-j)});
                    }
                    break;
                case 'down':
                    for (let i=0;i<4;i++){
                        let filtered = [];
                        for(let j=3;j>-1;j--){
                            if(tileArray[j][i] != -1){
                                filtered.push(tileArray[j][i]);
                                tileArray[j][i] = -1;
                            }
                        }
                        filtered.forEach((x,j) => {tileArray[3-j][i]= filtered[j];tileArray[3-j][i].setPos(i+1,j+1)});
                    }
                    break;
        }
    }
     
}