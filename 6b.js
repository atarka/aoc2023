const values = `Time:      7  15   30
Distance:  9  40  200`;

const boats = [...values.matchAll(/[\d ]+/gm)].map(r => +r[0].replace(/ /g, ''));
let result = 1;

for (let i = 0, l = boats.length / 2; i < l; ++i) {
    let good = 0;
    for (let bt = 1; bt < boats[i]; ++bt) {
        const distance = (boats[i] - bt) * bt;
        good += distance > boats[i + l] ? 1 : 0;
    }
    result *= good;
}

console.log(result);