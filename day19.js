const fs = require('fs');

const lines = fs.readFileSync('day19.txt', {encoding: 'utf-8'}).split('\n\n').filter(x => x);

const rules = {};

lines[0].split('\n').forEach((rule) => {
    const {groups} = /^(?<key>\d+): (?<value>.*)$/.exec(rule);
    rules[groups.key] = groups.value;
});

const messages = lines[1].split('\n');

let ruleToRegexp = {};

function computeRules(value, rules) {
    if(value in ruleToRegexp) {
        return ruleToRegexp[value];
    }
    // console.log({value, rules});
    let result = '';
    if(/^".*"$/.test(value)) {
        result = value.replace(/"/g, '');
    } else if(/\|/.test(value)) {
        const options = value.split(' | ');
        result = `(${computeRules(options[0], rules)}|${computeRules(options[1], rules)})`;
    } else {
        const keys = value.split(' ');
        result = keys.map(key => computeRules(rules[key], rules)).join('');
    }
    ruleToRegexp[value] = result;
    return result;
}

computeRules(rules[0], rules);

const mainRule = new RegExp('^'+ruleToRegexp[rules[0]]+'$');

let sum=0;
for (const message of messages) {
    if(mainRule.test(message)) {
        sum++;
    }
}
console.log(sum);

rules['0'] = '8 11';
rules['8'] = '42 | 42 8'; // 42 at least one time
rules['11'] = '42 31 | 42 11 31'; // 42{n}31{n}

computeRules(rules[42], rules);
computeRules(rules[31], rules);

const rule = new RegExp('^(?<group42>('+ruleToRegexp[rules[42]]+')+)(?<group31>('+ruleToRegexp[rules[31]]+')+)$');

sum=0;
for (const message of messages) {
    const matches = rule.exec(message);
    if(matches) {
        const {groups} = matches;
        // console.log(groups);
        const matches42 = groups.group42.match(new RegExp(ruleToRegexp[rules[42]], 'g')).length;
        const matches31 = groups.group31.match(new RegExp(ruleToRegexp[rules[31]], 'g')).length;
        // console.log({matches31, matches42});
        if(matches42 > matches31) {
            sum++;
        }
    }
}
console.log(sum);