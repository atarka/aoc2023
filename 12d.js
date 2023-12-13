const values = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

const rows = values.split(/\n/);
const debug = false;

const match = (springs, counts, count = 0, pos = 0, total = {}) => {
    const sl = springs.length;

    outer: for (let i = pos, il = sl; i < il; ++i) {
        if (springs[i] === '.' || springs[i] === '?') {
            const posEnd = i + 1 + counts[count];
            if (posEnd > sl) return total;

            for (let j = i + 1; j < posEnd; ++j) {
                if (springs[j] !== '?' && springs[j] !== '#') continue outer;
            }

            if (counts.length === count + 1) {
                total[posEnd] = (total[posEnd] || 0) + 1;
                continue outer;
            }
            match(springs, counts, count + 1, posEnd, total);
        } else {
            break;
        }
    }

    return total;
}

const rematch = (springs, counts, pos = 0, iter = 0) => {
    if (iter === 5) {
        for (let i = pos, il = springs.length; i < il; ++i) if (springs[i] !== '?' && springs[i] !== '.') return 0;
        return 1;
    }

    let total = 0;
    const result = match(springs.slice(pos), counts);

    for (const [newPos, count] of Object.entries(result)) {
        total += count * rematch(springs, counts, pos + newPos * 1, iter + 1);
    }

    return total;
}

let total = 0;
for (const row of rows) {
    const [springs, counts] = row.split(' ').map((r, i) => i ? r.split(',').map(Number) : r);
    const hotSprings = '.' + springs + '?' + springs + '?' + springs + '?' + springs + '?' + springs;
    total += rematch('.' + hotSprings, counts);
}

console.log(total);
