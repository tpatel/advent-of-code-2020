const fs = require('fs');

const lines = fs.readFileSync('day02.txt', {encoding: 'utf-8'}).split('\n').filter(x => x);

let validPasswords = 0;

lines.forEach(line => {
    const {groups} = /^(?<from>\d+)-(?<to>\d+) (?<char>.): (?<password>.*)$/.exec(line);

    const counter = {};

    [...groups.password].forEach(char => {
        if(!counter[char]) {
            counter[char] = 0;
        }
        counter[char]++;
    });

    if(counter[groups.char] >= groups.from && counter[groups.char] <= groups.to) {
        validPasswords++;
    }
})

console.log(validPasswords);

validPasswords = 0;

lines.forEach(line => {
    const {groups} = /^(?<from>\d+)-(?<to>\d+) (?<char>.): (?<password>.*)$/.exec(line);

    if(groups.password[groups.from-1] == groups.char ^ groups.password[groups.to-1] == groups.char) {
        validPasswords++;
    }
})

console.log(validPasswords);