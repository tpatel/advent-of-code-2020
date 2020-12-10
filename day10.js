const fs = require('fs');

const lines = [0].concat(fs.readFileSync('day10.txt', {encoding: 'utf-8'}).split('\n').filter(x => x).map(x => parseInt(x)));

lines.sort((a, b) => a-b);
lines.push(lines[lines.length-1]+3);

let joltage1 = 0;
let joltage3 = 0;

for(let i=1; i<lines.length; i++) {
    const diff = lines[i] - lines[i-1];
    if(diff === 1) joltage1++;
    if(diff === 3) joltage3++;
}

console.log(joltage1*joltage3, joltage1, joltage3);

// Part 2

function combination(array, memo={}) {
    const key = array.join`,`;
    if(key in memo) {
        return memo[key];
    }

    let result = 1;
    for(let i=1; i<array.length-1; i++) {
        if(array[i+1]-array[i-1] <= 3) {
            const arr2 = [array[i-1]].concat(array.slice(i+1))
            result += combination(arr2, memo);
        }
    }
    memo[key] = result;
    return result;
}


console.log(combination(lines));