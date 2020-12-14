const fs = require('fs');

const lines = fs.readFileSync('day13.txt', {encoding: 'utf-8'}).split('\n').filter(x => x);

const time = parseInt(lines[0]);
const buses = lines[1].split(',');

const list = [];

buses.forEach(bus => {
    if(bus == 'x') return;
    const id = parseInt(bus);
    list.push({
        bus: id,
        nextOne: id - time % id,
    });
})

list.sort((a, b) => a.nextOne - b.nextOne);

console.log(list[0].bus * list[0].nextOne);

const timestamps = [];

buses.forEach((bus, index) => {
    if(bus != 'x') timestamps.push({id: parseInt(bus), delta: index});
});

// 7,13,x,x,59,x,31,19
// t = 7*x
// t+1 = 13*y
// t+4 = 59*z


let step = timestamps[0].id;
let t = step;

// for(let t=step; ;t+=step) {
//     let failed = false;
//     for(let j=1; j<timestamps.length; j++) {
//         if((t+timestamps[j].delta) % timestamps[j].id !== 0) {
//             failed = true;
//             break;
//         } else {
//             console.log(t);
//             step *= timestamps[j].id;
//         }
//     }
//     if(!failed) {
//         console.log(t);
//         break;
//     }
// }

for(let j=1; j<timestamps.length; j++) {
    while((t+timestamps[j].delta) % timestamps[j].id !== 0) {
        t += step;
    }
    step *= timestamps[j].id;
}
console.log(t);