import fs from 'node:fs';

const file = fs.readFileSync('./input.txt', 'utf8');

const PRIORITY = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const group = [];
const { part1, part2 } = file.split("\n").reduce((acc, items) => {
    if (!items) return acc;

    // Split items in to their compartments
    const halfIndex = items.length / 2;
    const [box1, box2] = [
        items.slice(0, halfIndex),
        items.slice(halfIndex),
    ];

    // Find duplicates in the containers
    const dupes = box1.split('').reduce((a, i) => {
        if (box2.indexOf(i) > -1) {
            a.add(i);
        }
        return a;
    }, new Set());

    // Add priorities of duplicate items
    acc.part1 += [...dupes].reduce((a, i) => a += PRIORITY.indexOf(i) + 1, 0);

    // Add all items to a rolling group of 3
    group.push(items);
    if (group.length === 3) {
        // Find common item in the three elves rucksacks
        const [group1, group2, group3] = group;
        const dupes2 = group1.split('').reduce((a, i) => {
            if (group2.indexOf(i) > -1 && group3.indexOf(i) > -1) {
                a.add(i);
            }
            return a;
        }, new Set());

        // Add priorities of duplicate items
        acc.part2 += [...dupes2].reduce((a, i) => a += PRIORITY.indexOf(i) + 1, 0);

        // Reset group for the next 3
        group.length = 0;
    }

    return acc;
}, {
    part1: 0,
    part2: 0,
});

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
