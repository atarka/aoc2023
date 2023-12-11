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
const expansionQuotient = 999999;
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
        galaxies = galaxies.map(({x, y}) => ({x, y: y >= my ? y + expansionQuotient : y}));
    }
}

outer: for (let mx = map[0].length - 1; mx >= 0; --mx) {
    for (let my = 0; my < map.length; ++my) {
        if (map[my][mx] === '#') continue outer;
    }
    galaxies = galaxies.map(({x, y}) => ({x: x >= mx ? x + expansionQuotient : x, y}));
}

let sum = 0;
for (let x = 0; x < galaxies.length - 1; ++x) {
    for (let y = x + 1; y < galaxies.length; ++y) {
        sum += Math.abs(galaxies[x].x - galaxies[y].x) + Math.abs(galaxies[x].y - galaxies[y].y);
    }
}

console.log(sum);