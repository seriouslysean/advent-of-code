import fs from 'node:fs';

let file = fs.readFileSync('./01-input.txt', 'utf8');

const elves = file.split('\n').reduce((acc, calories) => {
    // Make sure we currently have an elf
    if (!acc.length) {
        acc.push(0);
    }

    // If this is an empty value, we need a new elf
    if (!calories) {
        acc.push(0);
        return acc;
    }

    // If this is a valid calorie count, add it to the current elf
    const idx = acc.length - 1;
    if (calories) {
        acc[idx] += parseInt(calories, 10);
    }

    return acc;
}, []).sort((a, b) => a - b).reverse();

// Top three elves
const topThreeCalories = elves.slice(0, 3).reduce((acc, cal) => acc + cal, 0);

console.log(`Part 1: ${elves[0]}`);
console.log(`Part 2: ${topThreeCalories}`);
