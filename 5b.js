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
    maps[from] = {to, ranges: [...ranges.matchAll(/(\d+) (\d+) (\d+)/gm)].map(r => r.slice(1, 4).map(Number)).sort((a, b) => a[1] - b[1])}
}

const startRanges = [...values.replace(/seeds: (.+?)\n[\s\S]*/m, '$1').matchAll(/(\d+) (\d+)/g)].map(([,start, len]) => ({stage: 'seed', start: start * 1, len: len * 1}));

let minSeed = 1 << 30;

const findDestination = (seedRange) => {
    if (seedRange.stage === 'location') {
        minSeed = Math.min(minSeed, seedRange.start);
        return;
    }

    let seedStart = seedRange.start;
    let seedEnd = seedStart + seedRange.len;
    let ranges = maps[seedRange.stage].ranges;
    let rangeStart = 0;

    while (seedStart < seedEnd) {
        const range = ranges[rangeStart];
        if (!range) {
            findDestination({stage: maps[seedRange.stage].to, start: seedStart, len: seedEnd - seedStart });
            seedStart = seedEnd;
            break;
        } else if (seedStart < range[1]) {
            findDestination({stage: maps[seedRange.stage].to, start: seedStart, len: range[1] - seedStart });
            seedStart = range[1];
        } else {
            if (range[1] + range[2] < seedStart) {
                ++rangeStart;
                continue;
            }

            const newSeedStart = Math.min(seedEnd, range[1] + range[2])
            findDestination({stage: maps[seedRange.stage].to, start: seedStart + range[0] - range[1], len: newSeedStart - seedStart });
            seedStart = newSeedStart;
            ++rangeStart;
        }
    }
}

startRanges.forEach(findDestination);
console.log(minSeed);
