const values = `#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#`;

const map = values.split(/\n/).map(row => row.split(''));
const w = map[0].length;
const h = map.length;

const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const visited = new Set();
let dx, dy;

const nodes = {};

const storeNode = (start, end) => {
    const startKey = `${start.x}:${start.y}`;
    const endKey = `${end.x}:${end.y}`;
    if (!nodes[startKey]) nodes[startKey] = [];
    if (!nodes[endKey]) nodes[endKey] = [];
    nodes[startKey].push({key: endKey, steps: start.steps});
    nodes[endKey].push({key: startKey, steps: start.steps});
}

const travel = (x, y, steps, start, from = []) => {
    visited.add(`${x}:${y}`)

    const options = [];
    for (const dir of dirs) {
        dx = x + dir[0];
        dy = y + dir[1];
        if (dx < 0 || dx >= w || dy < 0 || dy >= h) continue;
        if (dx === from[0] && dy === from[1]) continue;
        let c = map[dy][dx];
        if (c === '#') continue;

        if (dx === w - 2 && dy === h - 1) storeNode({...start, steps: start.steps}, {x: dx, y: dy})
        else options.push([dx, dy, steps + 1]);
    }

    if (options.length === 1) {
        travel(...options[0], {...start, steps: start.steps + 1}, [x, y])
    } else if (options.length > 1) {
        storeNode(start, {x, y});
        for (option of options) {
            if (visited.has(`${option[0]}:${option[1]}`)) continue;
            travel(...option, {x, y, steps: 1}, [x, y]);
        }
    }
}

travel(1, 0, 1, {x: 1, y: 0, steps: 0});

let maxHike = 0;
visitedHike = null;

const travelGraph = (key, steps, visited = new Set()) => {
    visited.add(key)

    const ways = nodes[key];
    for (const way of ways) {
        if (visited.has(way.key)) continue;

        if (way.key === `${w - 2}:${h - 1}`) maxHike = Math.max(maxHike, steps + way.steps);
        else travelGraph(way.key, steps + way.steps, new Set(visited));
    }
}

travelGraph('1:0', 1);
console.log(maxHike);

