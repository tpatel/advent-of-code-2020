const fs = require('fs');

const map = {};
const tiles = fs.readFileSync('day20.txt', {encoding: 'utf-8'}).split('\n\n').filter(x => x).map(line => {
    const l = line.split('\n');
    const id = parseInt(/\d+/.exec(l[0])[0]);
    l.shift();
    const obj = {
        id,
        contents: l,
        edges: extractEdges(l),
        matches: [],
    };
    map[id] = obj;
    return obj;
});

function reverseString(str) {
    return str.split('').reverse().join('');
}

function extractEdges(tile) {
    const result = [tile[0], tile[tile.length-1], tile.map(x => x[0]).join``, tile.map(x => x[x.length-1]).join``];
    return result.concat(result.map(edge => reverseString(edge)));
}

function matchingTiles(tile1, tile2) {
    for (let i = 0; i < tile1.edges.length; i++) {
        const edge1 = tile1.edges[i];
        for (let j = 0; j < tile2.edges.length; j++) {
            const edge2 = tile2.edges[j];
            if(edge1 === edge2) {
                return edge1;
            }
        }
    }
    return null;
}

// console.log(tiles);

// console.log(tiles[0]);

for (let i = 0; i < tiles.length; i++) {
    const tile1 = tiles[i];
    for (let j = i+1; j < tiles.length; j++) {
        const tile2 = tiles[j];
        const match = matchingTiles(tile1, tile2);
        if(match) {
            tile1.matches.push({
                id: tile2.id,
                edge: match
            })
            tile2.matches.push({
                id: tile1.id,
                edge: match
            })
        }
    }
}

const idsPart1 = tiles.filter(x => x.matches.length == 2).map(x => x.id);

console.log(eval(idsPart1.join`*`));

// part 2

// GOAL: place the top left corner of the puzzle

function rotate(matrix) {
    return [...matrix[0]].map((_, index) => matrix.map(row => row[index]).reverse()).map(row => row.join``);
}

function flipH(matrix) {
    return matrix.reverse();
}

function flipV(matrix) {
    return matrix.map((row) => reverseString(row));
}

function leftEdge(matrix) {
    return matrix.map(x => x[0]).join``;
}

function rightEdge(matrix) {
    return matrix.map(x => x[x.length-1]).join``;
}

function edgesWithMatches(tile) {
    return [
        tile.matches.some(match => match.edge == tile.contents[0] || match.edge == reverseString(tile.contents[0])),
        tile.matches.some(match => match.edge == rightEdge(tile.contents) || match.edge == reverseString(rightEdge(tile.contents))),
        tile.matches.some(match => match.edge == tile.contents[tile.contents.length-1] || match.edge == reverseString(tile.contents[tile.contents.length-1])),
        tile.matches.some(match => match.edge == leftEdge(tile.contents) || match.edge == reverseString(leftEdge(tile.contents))),
    ];
}

function generateAllRotations(matrix) {
    let currentMatrix = matrix;
    const result = [currentMatrix];
    for (let i = 0; i < 3; i++) {
        currentMatrix = rotate(currentMatrix);
        result.push(currentMatrix);
    }
    return result;
}

function generateAllFlipsAndRotations(matrix) {
    let result = [];
    //no flip
    result = result.concat(generateAllRotations(matrix));
    //one vertical flip
    result = result.concat(generateAllRotations(flipV(matrix)));
    //one horizontal flip
    result = result.concat(generateAllRotations(flipH(matrix)));
    //one vertical flip and one horizontal flip
    result = result.concat(generateAllRotations(flipV(flipH(matrix))));
    return result;
}

const topLeft = tiles.find(x => x.matches.length == 2); //first tile with 2 matching edges

for (let i = 0; i < 3; i++) {
    const e = edgesWithMatches(topLeft);
    if(!e[0] && !e[3]) {
        break;
    }
    topLeft.contents = rotate(topLeft.contents);
}

const N = Math.sqrt(tiles.length);
const M = tiles[0].contents[0].length;
const puzzle = Array(N).fill(null).map(x => Array(N).fill(null));

const allOptions = tiles.map(tile => generateAllFlipsAndRotations(tile.contents)).flat();



puzzle[0][0] = topLeft.contents;

for (let i = 1; i < puzzle.length; i++) {
    const previousElement = puzzle[i-1][0];
    puzzle[i][0] = allOptions.find(matrix => matrix[0] == previousElement[previousElement.length-1]);
}

// top left tile is ok

// get all tiles from the same line using the right border of the previous tile

for (let j = 0; j < puzzle.length; j++) {
    for (let i = 1; i < puzzle[j].length; i++) {
        const previousElement = puzzle[j][i-1];
        puzzle[j][i] = allOptions.find(matrix => leftEdge(matrix) == rightEdge(previousElement));
    }
}

// the puzzle is now complete!

// console.log(puzzle);

let image = puzzle.map(row => row[0].map((_, index) => row.map(tile => tile[index]))).flat();

for (let i = 1; i < N; i++) {
    image[i*M-1] = null;
}

image = image.filter(x =>x);

image = image.map(row => row.map((value, index, array) => index == array.length-1 ? value : value/*.slice(0, -1)*/).join``);

// There is a bug somewhere before this line!

console.log(generateAllFlipsAndRotations(image));