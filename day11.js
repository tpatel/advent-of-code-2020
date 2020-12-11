const { dirxml } = require('console');
const fs = require('fs');

const lines = fs.readFileSync('day11.txt', {encoding: 'utf-8'}).split('\n').filter(x => x);


class Seating {
    constructor(lines) {
        this.height = lines.length;
        this.width = lines[0].length;

        this.seats = lines;
    }

    nextState() {
        let hasChanged = false;

        const updatedSeats = [];

        this.seats.forEach((line, y) => {
            let updated = '';

            [...line].forEach((seat, x) => {
                let occupied = 0;
                for (let i = -1; i <= 1; i++) {
                    for(let j = -1; j <= 1; j++) {
                        if((i != 0 || j != 0)
                                && y+i >= 0
                                && y+i < this.height
                                && x+j >= 0
                                && x+j < this.width
                                && this.seats[y+i][x+j] === '#') {
                            occupied++;
                        }
                    }
                }
                if(seat == 'L' && occupied === 0) {
                    // If a seat is empty (L) and there are no occupied seats adjacent to it,
                    //    the seat becomes occupied.
                    updated += '#';
                    hasChanged = true;
                } else if(seat === '#' && occupied >= 4) {
                    // If a seat is occupied (#) and four or more seats adjacent to it are also occupied,
                    //    the seat becomes empty.
                    updated += 'L';
                    hasChanged = true;
                } else {
                    // Otherwise, the seat's state does not change.
                    updated += seat;
                }

            })

            updatedSeats.push(updated);
        })

        this.seats = updatedSeats;

        return hasChanged;
    }

    nextState2() {
        let hasChanged = false;

        const updatedSeats = [];

        this.seats.forEach((line, y) => {
            let updated = '';

            [...line].forEach((seat, x) => {
                let occupied = 0;
                const directions = [
                    {x: 1, y:0}, {x: -1, y:0},
                    {x: 1, y:1}, {x: -1, y:-1},
                    {x: 1, y:-1}, {x: -1, y:1},
                    {x: 0, y:1}, {x: 0, y:-1}
                ];
                directions.forEach(({x: dx, y: dy}) => {
                    let posX = x+dx;
                    let posY = y+dy;
                    while(posX >= 0 && posY >= 0 && posX < this.width && posY < this.height) {
                        if(this.seats[posY][posX] === '#') {
                            occupied++;
                            break;
                        }
                        if(this.seats[posY][posX] === 'L') {
                            break;
                        }
                        posX += dx;
                        posY += dy;
                    }
                })
                if(seat == 'L' && occupied === 0) {
                    updated += '#';
                    hasChanged = true;
                } else if(seat === '#' && occupied >= 5) {
                    updated += 'L';
                    hasChanged = true;
                } else {
                    updated += seat;
                }

            })

            updatedSeats.push(updated);
        })

        this.seats = updatedSeats;

        return hasChanged;
    }

    getOccupiedSeats() {
        let occupied = 0;
        this.seats.forEach((line) => {
            [...line].forEach((seat) => {
                if(seat === '#') {
                    occupied++;
                }
            })
        })
        return occupied;
    }

    display() {
        this.seats.forEach(line => {
            console.log(line);
        });
    }
}

const s = new Seating(lines);

// s.display();

while(s.nextState()) {
    //do nothing
}

// s.display();

console.log(s.getOccupiedSeats());

const s2 = new Seating(lines);

while(s2.nextState2()) {
    //do nothing
    // s2.display();
    // console.log('---')
}

console.log(s2.getOccupiedSeats());