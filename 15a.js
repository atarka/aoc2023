const values = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

const hash = (str) => str.split('').reduce((acc, c) => (acc + c.charCodeAt(0)) * 17 % 256, 0);
const instructions = values.split(',');
const total = instructions.map(hash).reduce((sum, hash) => sum + hash, 0);
console.log(total);