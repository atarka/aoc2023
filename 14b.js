const values = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

let platform = values.split(/\n/).map(row => row.split(''));
const w = platform[0].length;
const h = platform.length;

const rowOrder = (sx, sy, dx, dy) => {
    if (dy) {
        const x = sx;
        let y = dy ? (dy < 0 ? h - 1 : 0) : sy;
        const ty = dy ? (dy < 0 ? 0 : h - 1) : sy;

        do {
            const c = platform[y][x];
            if (c === '.') {
                let i = y + dy;
                let ti = dy < 0 ? -1 : h;
                do {
                    const b = platform[i][x];
                    if (b === '#') break;
                    if (b === 'O') {
                        platform[y][x] = b;
                        platform[i][x] = '.';
                        break;
                    }
                    i += dy;
                } while (i !== ti);
            }
            y += dy;
        } while (y !== ty);
    } else {
        const y = sy;
        let x = dx ? (dx < 0 ? w - 1 : 0) : sx;
        const tx = dx ? (dx < 0 ? 0 : w - 1) : sx;

        do {
            const c = platform[y][x];
            if (c === '.') {
                let i = x + dx;
                let ti = dx < 0 ? -1 : w;
                do {
                    const b = platform[y][i];
                    if (b === '#') break;
                    if (b === 'O') {
                        platform[y][x] = b;
                        platform[y][i] = '.';
                        break;
                    }
                    i += dx;
                } while (i !== ti);
            }
            x += dx;
        } while (x !== tx);
    }
}

const north = () => Object.keys([...new Array(w)]).forEach(c => rowOrder(c, 0, 0, 1));
const south = () => Object.keys([...new Array(w)]).reverse().forEach(c => rowOrder(c, h - 1, 0, -1));
const east = () => Object.keys([...new Array(h)]).reverse().forEach(c => rowOrder(w - 1, c, -1, 0));
const west = () => Object.keys([...new Array(h)]).forEach(c => rowOrder(0, c, 1, 0));

const getWeight = () => {
    let weight = 0;
    for (let x = 0; x < platform[0].length; ++x) {
        for (let y = 0; y < platform.length; ++y) {
            if (platform[y][x] === 'O') weight += h - y;
        }
    }

    return weight;
}


const cache = new Map();
let weight = 0;
const total = 1000000000;
let nextKey = JSON.stringify(platform);

for (let i = 0; i < 1000000000; ++i) {
    const key = nextKey;
    if (cache.has(key)) {
        let loops = [];
        let loopKey = key;

        do {
            const c = cache.get(loopKey);
            loopKey = c.nextKey;
            loops.push(c);
        } while (loopKey !== key);

        weight = loops[(total - i - 1) % loops.length].weight;
        break;
    }
    north();
    west();
    south();
    east();
    nextKey = JSON.stringify(platform);
    weight = getWeight();
    cache.set(key, {i, nextKey, weight});
}

console.log(weight);