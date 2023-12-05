import { last } from 'lodash-es';
import fs from 'node:fs';

function isNumeric(num){
    return !isNaN(num)
}

const file = fs.readFileSync('./input.txt', 'utf8');

const rows = file.split("\n").slice(0, -1);

let calibrationSum = 0;

for(let r = 0; r < rows.length; r += 1) {
    const row = rows[r];

    let firstNum = 0;
    let lastNum = 0;

    // ------------------------- part 1
    // Loop through all the numbers in the row
    for(let c = 0; c < row.length; c += 1) {
        if (isNumeric(row[c])) {
            firstNum = parseInt(row[c]);
            break;
        }
    }
    // Loop through all the numbers in the row in reverse
    for(let c = row.length - 1; c >= 0; c -= 1) {
        if (isNumeric(row[c])) {
            lastNum = parseInt(row[c]);
            break;
        }
    }

    calibrationSum += parseInt(`${firstNum}${lastNum}`);
}

const part1 = calibrationSum;
const part2 = null;

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
