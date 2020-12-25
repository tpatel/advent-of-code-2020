const fs = require('fs');

const [doorPublicKey, cardPublicKey] = fs.readFileSync('day25.txt', {encoding: 'utf-8'}).replace(/\n+$/, '').split('\n').map(x => parseInt(x));

const divider = 20201227;
const subject = 7;
const maxTurns = 100000000;
const rainbowTable = Array(maxTurns+1);

rainbowTable[0] = 1;
for (let i = 1; i <= maxTurns; i++) {
    rainbowTable[i] = (rainbowTable[i-1]*subject)%divider;
}

function transform(subject, turns) {
    let value = 1;
    for (let i = 1; i <= turns; i++) {
        value = (value*subject)%divider;
    }
    return value;
}

const cardTurn = rainbowTable.indexOf(cardPublicKey);
const doorTurn = rainbowTable.indexOf(doorPublicKey);

const encryptionKey = transform(doorPublicKey, cardTurn);

console.log(encryptionKey, cardTurn);