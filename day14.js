const fs = require('fs');

const lines = fs.readFileSync('day14.txt', {encoding: 'utf-8'}).split('\n').filter(x => x);

class Program {
    constructor(input) {
        this.code = input;
        this.memory = new Map();
    }

    run() {
        this.code.forEach((line) => {
            if(/^mask/.test(line)) {
                const {groups} = /^mask = (?<mask>.*)$/.exec(line);
                this.mask = [...groups.mask];
            } else {
                const {groups} = /^mem\[(?<address>\d+)\] = (?<value>\d+)$/.exec(line);
                // console.log(groups);
                let address = parseInt(groups.address);
                let decimal = parseInt(groups.value);
                // console.log(address, decimal, decimal.toString(2).padStart(36, '0'));
                let string = [...decimal.toString(2).padStart(36, '0')].map((value, index) => {
                    if(this.mask[index] === 'X') return value;
                    return this.mask[index];
                }).join('')
                let value = parseInt(string, 2);
                // console.log(string);
                this.memory.set(address, value);
            }

        })
    }

    getSum() {
        let result = 0;
        this.memory.forEach((v) => {
            result += v;
        })
        // console.log(this.memory);
        return result;
    }
}

const p = new Program(lines);

p.run();

console.log(p.getSum());

function combinations(n) {
    const max = 2**n;
    const result = [];
    for (let i = 0; i < max; i++) {
        result.push(i.toString(2).padStart(n, '0'));
    }
    return result;
}

class Program2 {
    constructor(input) {
        this.code = input;
        this.memory = new Map();
    }

//    1  0 mask
// 1  1  1
// 0  1  0

    run() {
        this.code.forEach((line) => {
            if(/^mask/.test(line)) {
                const {groups} = /^mask = (?<mask>.*)$/.exec(line);
                this.mask = [...groups.mask];
                this.combinations = combinations(this.mask.filter(x => x === 'X').length);
            } else {
                const {groups} = /^mem\[(?<address>\d+)\] = (?<value>\d+)$/.exec(line);
                let address = parseInt(groups.address);
                let binaryAddress = [...address.toString(2).padStart(36, '0')];
                let decimal = parseInt(groups.value);
                
                this.combinations.forEach((combination) => {
                    let xPosition = 0;
                    let a = this.mask.map((v, index) => {
                        if(v == 'X') {
                            return combination[xPosition++];
                        }
                        return parseInt(v) | parseInt(binaryAddress[index]);
                    }).join('');
                    let pointer = parseInt(a, 2);
                    // console.log(pointer);
                    this.memory.set(pointer, decimal);
                })
            }

        })
    }

    getSum() {
        let result = 0;
        this.memory.forEach((v) => {
            result += v;
        })
        return result;
    }
}

const p2 = new Program2(lines);

p2.run();

console.log(p2.getSum());