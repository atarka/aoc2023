const values = `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`;

const map = values.split(/\n/).map(r => r.split(''));
const w = map[0].length;
const h = map.length;

const shineOnYouCrazyDiamond = (start) => {
    const beenThere = {};
    const energized = new Set();

    const travel = ({ x, y, lx, ly }) => {
        if (x < 0 || x >= w || y < 0 || y >= h) return;
        const beenKey = `${x}:${y}:${lx}:${ly}`;
        if (beenThere[beenKey]) return;
        beenThere[beenKey] = true;
        energized.add(`${x}:${y}`);

        const c = map[y][x];
        if (c === '|' && lx) {
            orders.push({ x, y: y - 1, lx: 0, ly: -1 });
            orders.push({ x, y: y + 1, lx: 0, ly: 1 });
        } else if (c === '-' && ly) {
            orders.push({ x: x - 1, y: y, lx: -1, ly: 0 });
            orders.push({ x: x + 1, y: y, lx: 1, ly: 0 });
        } else if (c === '/') {
            orders.push({ x: x - ly, y: y - lx, lx: -ly, ly: -lx });
        } else if (c === '\\') {
            orders.push({ x: x + ly, y: y + lx, lx: ly, ly: lx });
        } else {
            orders.push({ x: x + lx, y: y + ly, lx, ly });
        }
    }

    const orders = [start];
    while (orders.length) travel(orders.pop());
    return energized.size;
}

let maxi = 0;
for (let x = 0; x < w; ++x) {
    maxi = Math.max(maxi, shineOnYouCrazyDiamond({x, y: 0, lx: 0, ly: 1}));
    maxi = Math.max(maxi, shineOnYouCrazyDiamond({x, y: h - 1, lx: 0, ly: -1}));
}

for (let y = 0; y < h; ++y) {
    maxi = Math.max(maxi, shineOnYouCrazyDiamond({x: 0, y, lx: 1, ly: 0}));
    maxi = Math.max(maxi, shineOnYouCrazyDiamond({x: w - 1, y, lx: -1, ly: 0}));
}

console.log(maxi);

