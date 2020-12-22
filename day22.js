const fs = require('fs');

const [deck1, deck2] = fs.readFileSync('day22.txt', {encoding: 'utf-8'}).split('\n\n').filter(x => x).map(str => {
    const cards = str.replace(/\n+$/, '').split('\n');
    cards.shift();
    return cards.map(x => parseInt(x));
});

function combat(deck1, deck2) {
    while(deck1.length > 0 && deck2.length > 0) {
        const card1 = deck1.shift();
        const card2 = deck2.shift();
    
        if(card1 > card2) {
            deck1.push(card1);
            deck1.push(card2);
        } else {
            deck2.push(card2);
            deck2.push(card1);
        }
    }
    
    const winningDeck = deck1.length > 0 ? deck1 : deck2;

    return winningDeck;
}


const part1Deck = combat([...deck1], [...deck2]);
const winningScore = part1Deck.reduce((previous, current, index) => previous + (current * (part1Deck.length - index)), 0);

console.log(winningScore);

// part 2

function recursiveCombat(deck1, deck2) {
    const alreadyPlayed = new Set();
    let turn = 0;

    while(deck1.length > 0 && deck2.length > 0) {
        turn++;

        // console.log({turn, deck1, deck2});

        const state = deck1.join(',') + '#' + deck2.join(',');
        if(alreadyPlayed.has(state)) {
            return {
                winner: 1,
                deck: deck1
            };
        }
        alreadyPlayed.add(state);

        const card1 = deck1.shift();
        const card2 = deck2.shift();

        let winner;
        if(deck1.length >= card1 && deck2.length >= card2) {
            const {winner: player, deck} = recursiveCombat(deck1.slice(0, card1), deck2.slice(0, card2));
            winner = player;
        } else {
            winner = card1 > card2 ? 1 : 2;
        }

        if(winner == 1) {
            deck1.push(card1);
            deck1.push(card2);
        } else {
            deck2.push(card2);
            deck2.push(card1);
        }
    }

    return {
        winner: deck1.length > 0 ? 1 : 2,
        deck: deck1.length > 0 ? deck1 : deck2
    };
}

const {deck} = recursiveCombat([...deck1], [...deck2]);
console.log(deck.reduce((previous, current, index) => previous + (current * (deck.length - index)), 0));