const values = ``;

const patterns = values.split(/\r?\n\r?\n/g).map(pattern => pattern.split(/\n/));
let sum = 0;


for (const pattern of patterns) {
    pattern.forEach((row, i) => console.log(i > 9 ? i : '0' + i, row))

    for (let x = 1, xl = pattern[0].length - 1; x <= xl; ++x) {
        let isValid = true;
        const len = Math.min(x, pattern[0].length - x);

        for (let y = 0; y < pattern.length; ++y) {
            const left = pattern[y].slice(x - len, x).split('').reverse().join('');
            const right = pattern[y].slice(x, x + len);
            if (left !== right) {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            sum += x;
            break;
        }
    }

    for (let y = 1, yl = pattern.length - 1; y <= yl; ++y) {
        let isValid = true;
        const len = Math.min(y, pattern.length - y);

        outer: for (let x = 0; x < pattern[0].length; ++x) {
            for (let i = 0; i < len; ++i) {
                if (pattern[y - i - 1][x] !== pattern[y + i][x]) {
                    isValid = false;
                    break outer;
                }
            }
        }

        if (isValid) {
            sum += y * 100;
            break;
        }
    }
}


console.log(sum);