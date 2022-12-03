import fs from 'node:fs';

const file = fs.readFileSync('./input.txt', 'utf8');

let enteredBasement;
const floor = file.split('').reduce((acc, direction, idx) => {
    if (direction === '(') acc = acc += 1;
    if (direction === ')') acc = acc -= 1;

    if (acc === -1 && !enteredBasement) {
        enteredBasement = idx + 1;
    }

    return acc;
}, 0);

console.log(`Part 1: ${floor}`);
console.log(`Part 2: ${enteredBasement}`);
