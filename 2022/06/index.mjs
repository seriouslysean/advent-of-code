import fs from 'node:fs';

const file = fs.readFileSync('./input.txt', 'utf8');

const [datastream] = file.split("\n");

let part1;
let part2;

let buffer1 = [];
let buffer2 = [];

for(let i = 0; i < datastream.length; i += 1) {
    const char = datastream[i];

    // ------------------------- part 1
    // Add to the buffer
    buffer1.push(char);

    // If the buffer is more than than 4, remove one
    if (buffer1.length > 4) {
        buffer1.shift();
    }

    // If the buffer has 4 unique characters, return the count
    if (!part1 && new Set(buffer1).size === 4) {
        part1 = i + 1;
    }

    // ------------------------- part 2

    // Add to the buffer
    buffer2.push(char);

    // If the buffer is more than than 14, remove one
    if (buffer2.length > 14) {
        buffer2.shift();
    }

    // If the buffer has 14 unique characters, return the count
    if (!part2 && new Set(buffer2).size === 14) {
        part2 = i + 1;
    }
}

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
