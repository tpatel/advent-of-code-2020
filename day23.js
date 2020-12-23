const fs = require('fs');

const input = [...fs.readFileSync('day23.txt', {encoding: 'utf-8'})].map(x => parseInt(x));

function part1(input) {
    const moves = 100;
    let currentCupValue = input[0];
    let N = input.length;

    for (let i = 0; i < moves; i++) {
        let currentCupIndex = input.indexOf(currentCupValue);

        let picked = [];
        for (let j = 0; j < 3; j++) {
            let index = (currentCupIndex+1)%N;
            if(index >= input.length) {
                index = 0;
            }
            picked = picked.concat(input.splice(index, 1));
        }

        currentCupIndex = input.indexOf(currentCupValue);

        let destinationValue = input[currentCupIndex]-1;

        if(destinationValue < 1) destinationValue = 9;
        let destinationCup = input.indexOf(destinationValue);

        while(destinationCup < 0) {
            destinationValue--;
            if(destinationValue < 1) destinationValue = 9;
            destinationCup = input.indexOf(destinationValue);
        }

        input.splice(destinationCup+1, 0, ...picked);

        currentCupValue = input[(input.indexOf(currentCupValue)+1)%N];
    }

    const indexOfOne = input.indexOf(1);
    let i = (indexOfOne+1)%N;
    const result = [];
    while(i != indexOfOne) {
        result.push(input[i]);
        i = (i+1)%N;
    }
    console.log(result.join``);
}

part1([...input]);
