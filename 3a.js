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

const numberSum = [...values.matchAll(/[0-9]+/g)]
.filter(({'0': num, index}) => (
    left = max(0, (index % rowLen) -1),
    right = min(rowLen, (index % rowLen) + num.length + 1),
    top = (floor(index / rowLen) - 1) * rowLen,
    values.substring(top + left, top + right)
        .concat(values.substring(top + left + rowLen, top + right + rowLen))
        .concat(values.substring(top + left + rowLen * 2, top + right + rowLen * 2))
        .match(/[^0-9.\n]/)
))
.reduce((acc, m) => acc + Number(m[0]), 0);
