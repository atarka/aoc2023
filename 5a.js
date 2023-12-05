const values = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

const maps = {};
for (const [, from, to, ranges] of [...values.matchAll(/([a-z]+)-to-([a-z]+) map:\n(((\d+)( |\n|$)+)+)/g)]) {
    maps[from] = {to, ranges: [...ranges.matchAll(/(\d+) (\d+) (\d+)/gm)].map(r => r.slice(1, 4).map(Number))}
}

const seeds = values.replace(/seeds: (((\d+)[ \n])+)[\s\S]+/, '$1').split(' ').map(Number).map(id => {
    let source = 'seed';
    while (source !== 'location') {
        for (const [dst, src, len] of maps[source].ranges) {
            if (id >= src && id < src + len) {
                id = dst + id - src;
                break;
            }
        }
        source = maps[source].to;
    }
    return id;
})
const minSeed = seeds.sort((a, b) => a - b)[0];

console.log(minSeed);
