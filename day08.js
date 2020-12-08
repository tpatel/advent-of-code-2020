const fs = require('fs');

const lines = fs.readFileSync('day08.txt', {encoding: 'utf-8'});

class Program {
    constructor(string, options = {}) {
        this.accumulator = 0;
        this.pointer = 0;
        this.done = new Set();
        this.options = options;
        this.isFinished = false;

        this.code = string.split('\n').filter(x => x).map((line) => {
            const {groups} = /^(?<instruction>\D+) \+?(?<value>-?\d+)$/.exec(line);
            groups.value = parseInt(groups.value);
            return groups;
        });
    }

    run() {
        while(true) {
            if(this.pointer == this.code.length) {
                this.isFinished = true;
                break;
            }
            const {instruction, value} = this.code[this.pointer];

            if(this.done.has(this.pointer)) {
                if(this.options.infiniteLoopWarning) console.log('INFINITE LOOP', {accumulator: this.accumulator});
                break;
            }
            this.done.add(this.pointer)

            switch (instruction) {
                case 'nop':
                    this.pointer++;
                    break;
                case 'acc':
                    this.accumulator += value;
                    this.pointer++;
                    break;
                case 'jmp':
                    this.pointer += value;
                    break;
            
                default:
                    throw new Error('not implemented');
                    break;
            }
        }
    }
}

const p = new Program(lines, {infiniteLoopWarning: true});
p.run();

const code = p.code;
for (let i = 0; i < code.length; i++) {
    const element = code[i];
    if(element.instruction === 'nop' || element.instruction === 'jmp') {
        const copy = JSON.parse(JSON.stringify(code));
        copy[i].instruction = element.instruction === 'nop' ? 'jmp' : 'nop';

        const newSource = copy.map(x => `${x.instruction} ${x.value}`).join('\n');
        const fixedProgram = new Program(newSource);
        fixedProgram.run();

        if(fixedProgram.isFinished) {
            console.log(fixedProgram.accumulator);
        }
    }
}
