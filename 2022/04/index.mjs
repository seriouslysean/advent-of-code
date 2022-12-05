import fs from 'node:fs';

const file = fs.readFileSync('./input.txt', 'utf8');

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx);
}

function containsFullyOverlappingPairs(pairs) {
    const pairsArray = pairs.split(',').map(p => p.split('-'));

    let overlap = 0;
    for (const i in pairsArray) {
        const [min, max] = pairsArray[i];
        const adaptedPairs = [...pairsArray];
        delete adaptedPairs[i];
        overlap += adaptedPairs.filter(([min2, max2]) => {
            const hasOverlap = parseInt(min, 10) <= parseInt(min2, 10) &&
                parseInt(max, 10) >= parseInt(max2, 10);
            // console.log(
            //     `${min}-${max} ${hasOverlap ? 'contains' : 'does not contain'} ${min2}-${max2}`,
            // );
            return hasOverlap;
        }).length > 0;
    }

    return overlap > 0;
}

function containsAnyOverlappingPairs(pairs) {
    const pairsArray = pairs.split(',').map((p) => {
        const [min, max] = p.split('-');
        return range(parseInt(min, 10), parseInt(max, 10));
    });

    const [pair1, pair2] = pairsArray;

    return pair1.some(i => pair2.includes(i)) ? 1 : 0;
}

const { part1, part2 } = file.split("\n").reduce((acc, pairs) => {
    if (!pairs) return acc;

    // Get the unique overlapping pairs
    acc.part1 += containsFullyOverlappingPairs(pairs);

    // Get all overlapping pairs
    acc.part2 += containsAnyOverlappingPairs(pairs);

    return acc;
}, {
    part1: 0,
    part2: 0,
});

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
