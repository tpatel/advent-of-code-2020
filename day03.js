const fs = require('fs');

const lines = fs.readFileSync('day03.txt', {encoding: 'utf-8'}).split('\n').filter(x => x);

class Map {
    constructor(map) {
        this.map = map;
    }

    getPosition(x, y) {
        return this.map[y][x%this.map[0].length];
    }

    getHeight() {
        return this.map.length;
    }
}

const map = new Map(lines.map(line => [...line]));


function trySlope(dx, dy) {
    let x = 0;
    let y = 0;
    let trees = 0;
    
    while(y < map.getHeight()) {
        const current = map.getPosition(x, y);
        if(current == '#') trees++;
        x += dx;
        y += dy;
    }

    return trees;
}

console.log(trySlope(3, 1));


const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
let result = 1;
for (const slope of slopes) {
    result *= trySlope(...slope);
}

console.log(result);
