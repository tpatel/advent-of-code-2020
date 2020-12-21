const fs = require('fs');

const lines = fs.readFileSync('day21.txt', {encoding: 'utf-8'}).split('\n').filter(x => x);

const allergensToIngredients = {}; // string => Set
const ingredientCounter = {};
const allIngredients = new Set();

lines.forEach(line => {
    const [ingredients, allergens] = line.replace(')', '').split(' (contains ').map(x => x.split(/[ ,]+/g));
    for(const a of allergens) {
        if(a in allergensToIngredients) {
            allergensToIngredients[a] = new Set(ingredients.filter(i => allergensToIngredients[a].has(i)));
        } else {
            allergensToIngredients[a] = new Set(ingredients);
        }
    }
    for (const ingredient of ingredients) {
        if(ingredient in ingredientCounter) {
            ingredientCounter[ingredient]++;
        } else {
            ingredientCounter[ingredient] = 1;
        }
        allIngredients.add(ingredient);
    }
})

const definedAllergens = {};
const definedIngredients = {};

let keys = Object.keys(allergensToIngredients);
while(keys.length > 0) {
    const defined = keys.find(k => allergensToIngredients[k].size === 1);
    const ingredient = allergensToIngredients[defined].values().next().value;
    definedAllergens[defined] = ingredient;
    delete allergensToIngredients[defined];

    for (const a in allergensToIngredients) {
        allergensToIngredients[a].delete(ingredient);
    }

    keys = Object.keys(allergensToIngredients);
}

for (const key in definedAllergens) {
    definedIngredients[definedAllergens[key]] = key;
}

const okIngredients = [...allIngredients].filter(ingredient => !(ingredient in definedIngredients));

const sum = okIngredients.map(ingredient => ingredientCounter[ingredient]).reduce((a, b) => a+b, 0);

console.log(sum);

// part 2

console.log(Object.keys(definedAllergens).sort().map(allergen => definedAllergens[allergen]).join(','));