const values = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const regex = new RegExp(`.*?(\\d|${numbers.join('|')})(.*(\\d|${numbers.join('|')}).*|.*)?`);
const value = n => (numbers.indexOf(n) + 1) || n;

const sum = values
    .split(/\n/)
    .map(v => v.replace(regex, (_, d1, s, d2) => value(d1) * 10 + value(d2 || d1) * 1))
    .reduce((acc, n) => (acc + Number(n)), 0);
