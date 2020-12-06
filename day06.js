const fs = require('fs');

const groups = fs.readFileSync('day06.txt', {encoding: 'utf-8'}).split('\n\n').filter(x => x);

let total = 0;
let part2 = 0;

for (const group of groups) {
    const uniques = new Set([...group.replace(/\n/g, '')]);
    total += uniques.size;

    part2 += [...uniques].filter(char => group.split('\n').filter(x => x).every(form => form.includes(char))).length
}

console.log(total);

console.log(part2);
