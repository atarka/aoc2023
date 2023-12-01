const values = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const sum = values
    .split(/\n/)
    .map(v => v.replace(/.*?(\d)(.*(\d).*|.*)?/, (_, d1, s, d2) => d1 * 10 + (d2 || d1) * 1))
    .reduce((acc, n) => (acc + Number(n)), 0);
