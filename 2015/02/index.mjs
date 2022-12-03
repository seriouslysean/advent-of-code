import fs from 'node:fs';

const file = fs.readFileSync('./input.txt', 'utf8');

const { paper, ribbon } = file.split("\n").reduce((acc, pkg) => {
    if (!pkg) return acc;
    const [l, w, h] = pkg.split('x');

    // Paper
    const sides = [
        2 * l * w,
        2 * w * h,
        2 * h * l,
    ];
    const surface = sides.reduce((acc, s) => acc + s, 0);
    const slack = Math.min(...sides) / 2;
    acc.paper = acc.paper + surface + slack;

    // Ribbon
    const sides2 = [
        l,
        w,
        h,
    ].sort((a, b) => a - b);
    const wrapped = (sides2[0] * 2) + (sides2[1] * 2);
    const extra = l * w * h;
    acc.ribbon = acc.ribbon + wrapped + extra;

    return acc;
}, {
    paper: 0,
    ribbon: 0,
});

console.log(`Part 1: ${paper}`);
console.log(`Part 2: ${ribbon}`);
