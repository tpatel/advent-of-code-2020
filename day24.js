const fs = require('fs');

const lines = fs.readFileSync('day24.txt', {encoding: 'utf-8'}).split('\n').filter(x => x);

function coordinatesToId(x, y) {
    return x + '#' + y;
}

// https://www.redblobgames.com/grids/hexagons/#map-storage
const dirToDelta = {
    'nw': {dx: 0, dy: -1},
    'ne': {dx: 1, dy: -1},
    'w': {dx: -1, dy: 0},
    'e': {dx: 1, dy: 0},
    'sw': {dx: -1, dy: 1},
    'se': {dx: 0, dy: 1},
}

let blackTiles = new Set();

let x, y;

for (const line of lines) {
    x = 0;
    y = 0;
    const directions = [...line.matchAll(/e|se|sw|w|nw|ne/g)].map(x => x[0]);

    for (const direction of directions) {
        x += dirToDelta[direction].dx;
        y += dirToDelta[direction].dy;
    }
    
    const key = coordinatesToId(x, y);
    if(blackTiles.has(key)) {
        blackTiles.delete(key);
    } else {
        blackTiles.add(key);
    }
}

console.log(blackTiles.size);

// part 2

function getNeighbours(x, y) {
    const result = [];

    for (const direction in dirToDelta) {
        result.push({
            x: x+dirToDelta[direction].dx,
            y: y+dirToDelta[direction].dy
        });
    }

    return result;
}

for (let i = 1; i <= 100; i++) {
    newBlackTiles = new Set();

    const keys = blackTiles.keys();
    for (const tile of keys) {
        const [x, y] = tile.split('#').map(x => parseInt(x));

        const cellsAround = getNeighbours(x, y);
        cellsAround.push({x, y}); //add the current cell

        for(const cell of cellsAround) {
            const currentId = coordinatesToId(cell.x, cell.y);
            const neighbours = getNeighbours(cell.x, cell.y);
            const totalBlackTiles = neighbours.filter(n => blackTiles.has(coordinatesToId(n.x, n.y))).length;

            if(blackTiles.has(currentId)) {
                if(totalBlackTiles === 0 || totalBlackTiles > 2) {
                    newBlackTiles.delete(currentId);
                } else {
                    newBlackTiles.add(currentId);
                }
            } else {
                if(totalBlackTiles === 2) {
                    newBlackTiles.add(currentId);
                }
            }
            
        }
    }
    
    blackTiles = newBlackTiles;

    console.log(i, blackTiles.size);
}

