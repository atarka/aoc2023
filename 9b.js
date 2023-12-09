const values = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

const calibara = (range) => {
    const diffRange = range.map((v, i, a) => i ? v - a[i - 1] : 0).slice(1);
    return range.at(0) - (diffRange.some(Boolean) ? calibara(diffRange) : 0);
};

const result = values.split(/\n/).map(row => row.split(' ').map(Number)).map(calibara).reduce((sum, v) => sum + v, 0);
console.log(result);
