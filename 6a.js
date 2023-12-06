const values = `Time:        63     78     94     68
Distance:   411   1274   2047   1035`;

const boats = [...values.matchAll(/\d+/gm)].map(r => +r[0]);
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