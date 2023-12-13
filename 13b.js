const values = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

const patterns = values.split(/\r?\n\r?\n/g).map(pattern => pattern.split(/\n/));
let sum = 0;


for (const pattern of patterns) {
    for (let x = 1, xl = pattern[0].length - 1; x <= xl; ++x) {
        let isValid = true;
        const len = Math.min(x, pattern[0].length - x);
        let errors = 0;

        outerx: for (let y = 0; y < pattern.length; ++y) {
            for (let i = 0; i < len; ++i) {
                if (pattern[y][x - i - 1] !== pattern[y][x + i]) {
                    isValid = false;
                    if (++errors > 1) break outerx;
                }
            }
        }

        if (errors === 1) sum += x;
    }


    for (let y = 1, yl = pattern.length - 1; y <= yl; ++y) {
        let isValid = true;
        const len = Math.min(y, pattern.length - y);
        let errors = 0;

        outer: for (let x = 0; x < pattern[0].length; ++x) {
            for (let i = 0; i < len; ++i) {
                if (pattern[y - i - 1][x] !== pattern[y + i][x]) {
                    isValid = false;
                    if (++errors > 1) break outer;
                }
            }
        }
        if (errors === 1) sum += y * 100;
    }
}

console.log(sum);