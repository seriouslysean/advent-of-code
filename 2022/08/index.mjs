import fs from 'node:fs';

function getViewDistance(tree, trees) {
    let viewDistance = 0;
    for (let t = 0; t < trees.length; t += 1) {
        viewDistance += 1;
        if (tree <= trees[t]) {
            break;
        }
    }
    // console.log(tree, trees, viewDistance);
    return viewDistance;
}

const file = fs.readFileSync('./input.txt', 'utf8');

const rows = file.split("\n").slice(0, -1);

// Get length and height of the matrix of trees
const totalCols = rows[0].length;
const totalRows = rows.length;

let highestScenicScore = 0;

let visibleTrees = 0;

for(let r = 0; r < rows.length; r += 1) {
    const row = rows[r];

    // ------------------------- part 1
    // Loop through all the trees in the row
    for(let c = 0; c < row.length; c += 1) {
        const tree = Number(row[c]);
        const isEdgeTree = [0, totalRows - 1].includes(r) || [0, totalCols - 1].includes(c);

        // Is this an edge tree?
        if (isEdgeTree) {
            visibleTrees += 1;
        }

        // console.log(`----- TREE ${tree} (${r}:${c})`, `Total ${visibleTrees}`);

        // Break this up to log accurate number
        if (isEdgeTree) {
            continue;
        }

        // Not an edge tree, check if it's visible

        // Get all the trees to the north
        const upTrees = [];
        for (let n = r - 1; n >= 0; n -= 1) {
            upTrees.push(Number(rows[n][c]));
        }

        // Get all the trees to the east
        const rightTrees = [];
        for (let e = c + 1; e < totalCols; e += 1) {
            rightTrees.push(Number(rows[r][e]));
        }

        // Get all the trees to the south
        const downTrees = [];
        for (let s = r + 1; s < totalRows; s += 1) {
            downTrees.push(Number(rows[s][c]));
        }

        // Get all the trees to the west
        const leftTrees = [];
        for (let w = c - 1; w >= 0; w -= 1) {
            leftTrees.push(Number(rows[r][w]));
        }

        if (upTrees.every(t => tree > t) === true ||
        rightTrees.every(t => tree > t) === true ||
        downTrees.every(t => tree > t) === true ||
        leftTrees.every(t => tree > t) === true) {
            visibleTrees += 1;
        }

        // Calculate scenic score
        let scenicScore = getViewDistance(tree, upTrees) *
            getViewDistance(tree, rightTrees) *
            getViewDistance(tree, downTrees) *
            getViewDistance(tree, leftTrees);
        if (scenicScore > highestScenicScore) {
            highestScenicScore = scenicScore;
        }
    }
}

const part1 = visibleTrees;
const part2 = highestScenicScore;

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
