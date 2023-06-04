const distBTWCentTilesX = 9 + 75;
const distBTWCentTilesY = 12 + 75;

export function normXY(x, y) {
    return {
        x: (x + 1) * distBTWCentTilesX - 75 / 2, 
        y: (3 - y + 1) * distBTWCentTilesY - 75 / 2
    };
};
