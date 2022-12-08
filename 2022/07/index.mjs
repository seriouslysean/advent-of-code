import fs from 'node:fs';

import { get, set, flatMap } from 'lodash-es';

const file = fs.readFileSync('./input.txt', 'utf8');

const rows = file.split("\n").slice(0, -1);

const TOTAL_DISK_SPACE = 70000000;
const TOTAL_UPDATE_SPACE = 30000000;

// Track all directory sizes
const sizes = [];

// Track the current path
const path = [];

function createDirectory() {
    return {
        files: new Array(),
    }
}

function countAllFileSizes(obj, maxDirSize) {
    let maxDirTotalCount = 0;

    const addAndRecurse = (currentObj) => {
        const totalFileSize = currentObj.files.reduce((t, v) => t + v, 0);
        const totalDirectorySize = Object.keys(currentObj).reduce((acc, k) => {
            return k === 'files' ?
                acc + 0 :
                acc + addAndRecurse(currentObj[k]).size;
        }, 0);
        // console.log(totalDirectorySize);
        const totalSize = totalFileSize + totalDirectorySize;
        currentObj.size = totalSize;

        if (totalSize <= maxDirSize) {
            maxDirTotalCount += totalSize;
        }

        // console.log(totalSize <= maxDirSize, totalSize);
        sizes.push(totalSize);

        return {
            ...currentObj,
            size: totalSize,
        };
    }

    const adaptedTree = addAndRecurse(obj);

    return {
        adaptedTree,
        maxDirTotalCount,
    };
}

function getSmallestMatchingDirectory(minDirSize) {
    return sizes.sort((a, b) => a - b).find(v => v >= minDirSize);
}

const tree = rows.reduce((acc, row) => {
    const parts = row.split(' ');
    const isCmd = parts[0] === '$';

    // ---------- COMMANDS
    if (isCmd) {
        const [, cmd, opt] = parts;
        // console.log(cmd, opt);
        switch(cmd) {
            case 'cd':
                // Add directory to path
                if (opt === '/') path.length = 0;
                else if (opt === '..') path.pop();
                else path.push(opt);
                // Add the directory to our tree
                const pathString = path.join('.');
                const dir = get(acc, pathString);
                if (path.length && !dir) {
                    set(acc, path.join('.'), createDirectory(opt));
                }
                break;
            case 'ls':
                // Noop, just a list operation
                break;
        }

        // Stop after processing the command
        return acc;
    }

    // ---------- LIST
    // Not a command, process list of files using the current path
    const [attr, name] = parts;

    // Can probably ignore directories since we create those as we `cd`
    if (attr === 'dir') {
        return acc;
    }

    // Add file sizes to the tree
    const pathString = `${path.join('.')}.files`;
    const size = parseInt(attr, 10);
    if (path.length) {
        get(acc, pathString)?.push(size);
    } else {
        acc.files?.push(size);
    }

    return acc;
}, createDirectory('/'));

// console.log(tree);

const { adaptedTree, maxDirTotalCount: part1 } = countAllFileSizes(tree, 100000);

// console.log(JSON.stringify(adaptedTree, null, 2));

const TOTAL_AVAILABLE_SPACE = TOTAL_DISK_SPACE - adaptedTree.size;
const TOTAL_REQUIRED_SPACE = TOTAL_UPDATE_SPACE - TOTAL_AVAILABLE_SPACE;

const part2 = getSmallestMatchingDirectory(TOTAL_REQUIRED_SPACE);



console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
