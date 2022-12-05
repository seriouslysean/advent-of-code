import fs from 'node:fs';

const file = fs.readFileSync('./input.txt', 'utf8');

/*
[D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
 */
// SAMPLE
// const STACKS = {
//     1: 'ZN'.split(''),
//     2: 'MCD'.split(''),
//     3: 'P'.split(''),
// }

/*
                    [Q]     [P] [P]
                [G] [V] [S] [Z] [F]
            [W] [V] [F] [Z] [W] [Q]
        [V] [T] [N] [J] [W] [B] [W]
    [Z] [L] [V] [B] [C] [R] [N] [M]
[C] [W] [R] [H] [H] [P] [T] [M] [B]
[Q] [Q] [M] [Z] [Z] [N] [G] [G] [J]
[B] [R] [B] [C] [D] [H] [D] [C] [N]
 1   2   3   4   5   6   7   8   9
*/
const STACKS = {
    1: 'BQC'.split(''),
    2: 'RQWZ'.split(''),
    3: 'BMRLV'.split(''),
    4: 'CZHVTW'.split(''),
    5: 'DZHBNVG'.split(''),
    6: 'HNPCJFVQ'.split(''),
    7: 'DGTRWZS'.split(''),
    8: 'CGMNBWZP'.split(''),
    9: 'NJBMWQFP'.split(''),
}

// For tracking multiple crate moves
const STACKS2 = { ...STACKS };
// Make sure the arrays are clones and not refs
Object.entries(STACKS2).map(([k, v]) => STACKS2[k] = [...v]);

let part1;
let part2;

file.split("\n").forEach((move) => {
    if (!move) return;

    // console.log(move);

    // Grab instructions and type to Number
    const [numBoxes, moveFrom, moveTo] = move.match(/(\d+)/g).map(Number);

    // ------------------------- part 1

    // console.log('before', STACKS);

    for (let i = 0; i < numBoxes; i += 1) {
        const boxToMove = STACKS[moveFrom].pop();
        if (boxToMove) {
            STACKS[moveTo].push(boxToMove);
        }
    }

    // console.log('after', STACKS);

    // ------------------------- part 2

    // console.log('before', STACKS2);

    // grab boxes to move
    const stackToMove = STACKS2[moveFrom].slice(STACKS2[moveFrom].length - numBoxes);
    // console.log(stackToMove);

    // remove boxes from old stack
    STACKS2[moveFrom] = STACKS2[moveFrom].slice(0, STACKS2[moveFrom].length - numBoxes);

    // add boxes to the new stack
    STACKS2[moveTo] = [...STACKS2[moveTo], ...stackToMove];

    // console.log('after', STACKS2);

    // -------------------------

    // Get the unique overlapping pairs
    part1 = Object.values(STACKS).map(i => i[i.length - 1]).join('');
    part2 = Object.values(STACKS2).map(i => i[i.length - 1]).join('');

    // console.log('');
});

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
