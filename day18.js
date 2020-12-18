const fs = require('fs');

const lines = fs.readFileSync('day18.txt', {encoding: 'utf-8'}).split('\n').filter(x => x);


function solve(string) {
    let tokens = string.split(' ');
    while(tokens.length > 1) {
        tokens = [eval(tokens.slice(0, 3).join(''))].concat(tokens.slice(3))
    }
    return tokens[0];
}

function solve2(string) {
    while(/\+/.test(string)) {
        string = string.replace(/(\d+) \+ (\d+)/g, (match, firstNumber, secondNumber) => {
            return parseInt(firstNumber) + parseInt(secondNumber);
        })
    }
    return eval(string);
}

function solveWithParenthesis(string, solve) {
    while(/\(/.test(string)) {
        string = string.replace(/\(([^()]+)\)/g, (match, group) => {
            return solve(group);
        })
    }
    return solve(string);
}


let sum = 0;
lines.forEach(line => {
    sum += solveWithParenthesis(line, solve);
});
console.log(sum);

sum = 0;
lines.forEach(line => {
    sum += solveWithParenthesis(line, solve2);
});
console.log(sum);