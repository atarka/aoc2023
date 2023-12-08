const values = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const maps = [...values.matchAll(/([A-Z]+) = \(([A-Z]+), ([A-Z]+)/g)].reduce((acc, [, from, L, R]) => (acc[from] = {R, L}, acc), {});
const travel = values.match(/[RL]+/)[0].split('');
let count = 0;
for (let node = 'AAA'; node !== 'ZZZ'; ++count) node = maps[node][travel[count % travel.length]];

console.log(count);