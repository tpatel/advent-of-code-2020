const fs = require('fs');

const lines = fs.readFileSync('day15.txt', {encoding: 'utf-8'}).split('\n').filter(x => x);

class Game {
    constructor(input) {
        this.memory = new Map(); // number => last turn
        this.turn = 1;

        input.forEach(number => {
            this.memory.set(number, [this.turn]);
            this.lastNumber = number;
            this.turn++;
        });
    }

    playUntilTurn(turn) {
        while(this.turn <= turn) {
            let newNumber;
            // console.log(this.lastNumber, this.memory.has(this.lastNumber));
            if(this.memory.has(this.lastNumber)) {
                newNumber = this.turn - 1 - this.memory.get(this.lastNumber);
            } else {
                newNumber = 0;
            }
            // console.log(newNumber);

            this.memory.set(this.lastNumber, this.turn-1);
            this.lastNumber = newNumber;
            this.turn++;
        }
    }
}

const g = new Game(lines[0].split(',').map(x => parseInt(x)));

g.playUntilTurn(2020);

console.log(g.lastNumber);

const g2 = new Game(lines[0].split(',').map(x => parseInt(x)));

g2.playUntilTurn(30000000);

console.log(g2.lastNumber);