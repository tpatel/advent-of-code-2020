const { group } = require('console');
const fs = require('fs');

const lines = fs.readFileSync('day16.txt', {encoding: 'utf-8'}).split('\n\n').filter(x => x);

const rules = lines[0].split('\n').filter(x => x).map(string => {
    const {groups} = /(?<field>[^:]+): (?<from1>\d+)-(?<to1>\d+) or (?<from2>\d+)-(?<to2>\d+)/.exec(string);
    groups.from1 = parseInt(groups.from1);
    groups.to1 = parseInt(groups.to1);
    groups.from2 = parseInt(groups.from2);
    groups.to2 = parseInt(groups.to2);
    return groups;
})

function matchRule(rule, value) {
    return (value >= rule.from1 && value <= rule.to1) || (value >= rule.from2 && value <= rule.to2);
}

function matchAtLeastOneRule(value) {
    for (const rule of rules) {
        if(matchRule(rule, value)) {
            return true;
        }
    }
    return false;
}

const ourTicket = lines[1].split('\n').filter(x => x)[1].split(',').map(x => parseInt(x));

let nearbyTickets = lines[2].split('\n').filter(x => x);
nearbyTickets.shift();
nearbyTickets = nearbyTickets.map(ticket => ticket.split(',').map(x => parseInt(x)));

let allTickets = [ourTicket];

let sum = 0;
for (const ticket of nearbyTickets) {
    let valid = true;
    for (const value of ticket) {
        if(!matchAtLeastOneRule(value)) {
            sum += value;
            valid = false;
        }
    }
    if(valid) {
        allTickets.push(ticket);
    }
}

console.log(sum);

let matches = [];

for (let i = 0; i < ourTicket.length; i++) {
    // const failed = new Set();

    for (const rule of rules) {
        let valid = true;
        for (const ticket of allTickets) {
            if(!matchRule(rule, ticket[i])) {
                valid = false;
                break;
            }
        }
        if(valid) {
            // console.log(i, rule);
            matches.push({rule: rule.field, index: i});
        }
    }
}

while(matches.length > rules.length) {
    for (let i = 0; i < ourTicket.length; i++) {
        const rulesMatchingCurrentIndex = matches.filter(m => m.index == i);

        if(rulesMatchingCurrentIndex.length == 1) {
            const currentRule = rulesMatchingCurrentIndex[0]
            // console.log(matches, currentRule);
            matches = matches.filter(m => {
                if(m.rule === currentRule.rule) {
                    return m.index === currentRule.index;
                }
                return true;
            });
            // console.log(matches);
        }
    }
}

const departureFields = matches.filter(m => m.rule.startsWith('departure'));

let result = 1;
for (const field of departureFields) {
    result *= ourTicket[field.index];
}

console.log(result);