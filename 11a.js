const values = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

let galaxies = [];
const map = values.split(/\n/).map(r => r.split(''));

for (let y = 0; y < map.length; ++y) {
    for (let x = 0, xl = map[y].length; x < xl; ++x) {
        if (map[y][x] === '#') {
            galaxies.push({x, y});
        }
    }
}

for (let my = map.length - 1; my >= 0; --my) {
    if (!map[my].some(c => c === '#')) {
        galaxies = galaxies.map(({x, y}) => ({x, y: y > my ? y + 1 : y}));
    }
}

outer: for (let mx = map[0].length - 1; mx >= 0; --mx) {
    for (let my = 0; my < map.length; ++my) {
        if (map[my][mx] === '#') continue outer;
    }
    galaxies = galaxies.map(({x, y}) => ({x: x > mx ? x + 1 : x, y}));
}

let sum = 0;
for (let x = 0; x < galaxies.length - 1; ++x) {
    for (let y = x + 1; y < galaxies.length; ++y) {
        const len = Math.abs(galaxies[x].x - galaxies[y].x) + Math.abs(galaxies[x].y - galaxies[y].y);
        sum += len;
    }
}

console.log(sum);