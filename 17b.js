const values = `111111111111
999999999991
999999999991
999999999991
999999999991`

const map = values.split(/\n/).map(r => r.split(''));
const w = map[0].length;
const h = map.length;
const wiggle = [-1, 1];

const visited = new Map();
let bestPath = 1 << 30;

const travel = (x, y, loss = 0, dir = -100, cnt = 0) => {
    const newLoss = (x || y || loss) ? loss + map[y][x] * 1 : 0;
    if (newLoss > bestPath) return;

    const key = `${x}:${y}:${dir}:${cnt}`;
    const storedLoss = visited.get(key);
    if (newLoss >= storedLoss) return;
    visited.set(key, newLoss);

    if ((x === w - 1) && (y === h - 1)) {
        if (cnt < 4) return;
        if (loss < bestPath) bestPath = newLoss;
        return;
    }

    for (const dx of wiggle) {
        const curDir = dx > 0 ? 1 : -1;
        if (curDir === -dir) continue;
        if (curDir !== dir && cnt < 4) continue;
        if (curDir === dir && cnt >= 10) continue;
        if (x + dx < 0 || x + dx > w - 1) continue;
        orders.push([x + dx, y, newLoss, curDir, curDir === dir ? cnt + 1 : dir === -100 ? 2 : 1]);
    }

    for (const dy of wiggle) {
        const curDir = dy > 0 ? 10 : -10;
        if (curDir === -dir) continue;
        if (curDir !== dir && cnt < 4) continue;
        if (curDir === dir && cnt >= 10) continue;
        if (y + dy < 0 || y + dy > h - 1) continue;
        orders.push([x, y + dy, newLoss, curDir, curDir === dir ? cnt + 1 : dir === -100 ? 2 : 1]);
    }
}

const orders = [[0, 0, 0, 1, 1], [0, 0, 0, 10, 1]];

while (orders.length) {
    let lowestHeat = 1 << 30;
    let lowestIndex = 0;
    for (let i = 0; i < orders.length; ++i) {
        if (orders[i][2] < lowestHeat) {
            lowestIndex = i;
            lowestHeat = orders[i][2];
        }
    }
    let bestNode = orders[lowestIndex];
    orders.splice(lowestIndex, 1);
    travel(...bestNode);
}

console.log(bestPath)