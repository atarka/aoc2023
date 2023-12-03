const values = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const {floor, max, min} = Math;
const rowLen = floor(Math.sqrt(values.length)) + 1;

const stars = [...values.matchAll(/[0-9]+/g)]
    .reduce((acc, {'0': num, index}) => [...acc, ...(
        left = max(0, (index % rowLen) -1),
        right = min(rowLen, (index % rowLen) + num.length + 1),
        top = (floor(index / rowLen) - 1) * rowLen,
        [
            ...(values.substring(top + left, top + right) || [...Array(right - left).fill('.')].join(''))
            .concat(values.substring(top + left + rowLen, top + right + rowLen))
            .concat(values.substring(top + left + rowLen * 2, top + right + rowLen * 2))
            .matchAll(/\*/g)
        ]
        .map(({index: starIndex}) => [floor(starIndex / (right - left)) * rowLen + top + starIndex % (right - left) + left, num])
    )], [])
    .reduce((stars, [pos, num]) => (stars[pos] = [...(stars[pos] || []), num], stars), {});

const gearSum = Object.entries(stars).reduce((acc, [, gears]) => acc + (gears.length === 2 ? gears[0] * gears[1] : 0), 0);
