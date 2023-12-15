const values = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

const instructions = values.split(',');

const hash = (str) => str.split('').reduce((acc, c) => (acc + c.charCodeAt(0)) * 17 % 256, 0);

const boxes = [...Array(256)].map((c) => []);

for (const instruction of instructions) {
    const [, code, op, power] = instruction.match(/(.+)([=-])(\d+)?/);
    const box = hash(code);
    if (op === '=') {
        const lens = {code, power};
        if (!boxes[box].some(l => l.code === code)) boxes[box].push(lens);
        else boxes[box] = boxes[box].map(l => l.code === code ? lens : l);
    } else {
        boxes[box] = boxes[box].filter(l => l.code !== code);
    }
}
const total = boxes.reduce((acc, b, bid) => acc + b.reduce((sum, l, i) => sum + (bid + 1) * (i + 1) * l.power, 0), 0);
console.log(total);
