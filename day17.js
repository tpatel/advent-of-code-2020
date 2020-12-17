const fs = require('fs');
const { parse } = require('path');

const lines = fs.readFileSync('day17.txt', {encoding: 'utf-8'}).split('\n').filter(x => x).map(x => [...x]);

let map = new Map(); // key: x,y,z,w value: active/inactive

//initalize the map

lines.forEach((line, y) => {
    line.forEach((value, x) => {
        const active = value === '#';
        const id = [x,y,0,0].join`,`;
        map.set(id, active);
    })
})

function getNeighbours(x, y, z, w, map) {
    const result = [];
    for (let i = x-1; i <= x+1; i++) {
        for (let j = y-1; j <= y+1; j++) {
            for (let k = z-1; k <= z+1; k++) {
                for (let l = w-1; l <= w+1; l++) {
                    if(i != x || j != y || k != z || l != w) {
                        const key = [i,j,k,l].join`,`
                        // if(x == 0 && y == 0 && z == 0) {
                        //     console.log(key, map.has(key));
                        // }
                        // console.log(key, map.has(key));
                        if(map.has(key)) {
                            result.push(map.get(key));
                        } else {
                            result.push(false);
                        }
                    }
                }
            }
        }
    }
    return result;
}

for (let i = 0; i < 6; i++) { // turn

    //find min-max for x,y,z
    const keys = map.keys();
    let minx = null;
    let miny = null;
    let minz = null;
    let minw = null;
    let maxx = null;
    let maxy = null;
    let maxz = null;
    let maxw = null;

    for (const key of keys) {
        const [x,y,z,w] = key.split(',').map(x => parseInt(x));
        if(x < minx) minx = x;
        if(y < miny) miny = y;
        if(z < minz) minz = z;
        if(w < minw) minw = w;
        if(x > maxx) maxx = x;
        if(y > maxy) maxy = y;
        if(z > maxz) maxz = z;
        if(w > maxw) maxw = w;
    }

    const newState = new Map();

    for (let x = minx-1; x <= maxx+1; x++) {
        for (let y = miny-1; y <= maxy+1; y++) {
            for (let z = minz-1; z <= maxz+1; z++) {
                for (let w = minw-1; w <= maxw+1; w++) {
                    const neighbours = getNeighbours(x, y, z, w, map);
                    const activeNeibours = neighbours.filter(x => x).length;
                    const key = [x,y,z,w].join`,`;
                    const isActive = map.has(key) ? map.get(key) : false;
                    if(isActive && activeNeibours !== 2 && activeNeibours !== 3) {
                        newState.set(key, false);
                    } else if(!isActive && activeNeibours === 3) {
                        newState.set(key, true);
                    } else {
                        newState.set(key, isActive);
                    }
                }
            }
        }
    }
    
    map = newState;
}

// count active cubes
let sum = 0;
let cubes = map.values();
for (const cube of cubes) {
    if(cube) sum++;
}

console.log(sum);