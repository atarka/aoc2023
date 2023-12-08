const values = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

const maps = [...values.matchAll(/([\dA-Z]+) = \(([\dA-Z]+), ([\dA-Z]+)/g)].reduce((acc, [, from, L, R]) => (acc[from] = {R, L}, acc), {});
const travel = values.match(/[RL]+/)[0].split('');
const getNodeRange = (node, count = 0) => {
    for (;node[2] !== 'Z'; ++count) node = maps[node][travel[count % travel.length]];
    return count;
}

const lcm = (a, b) => {
    const lar = Math.max(a, b);
    const small = Math.min(a, b);
    for (let i = lar;; i += lar) if (i % small == 0) return i;
}

const count = Object.keys(maps).filter(node => node[2] === 'A').map(node => getNodeRange(node)).reduce((acc, count) => acc ? lcm(acc, count) : count, 0);
console.log(count);
