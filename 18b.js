const values = `R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`;

const lines = values.split(/\n/); // .map(r => r.split(/[^RUDL0-9a-f]+/));
let t = 0;
let b = 0;
let l = 0;
let r = 0;

const dirs = {
    R: [1, 0],
    D: [0, 1],
    U: [0, -1],
    L: [-1, 0],
    0: [1, 0],
    1: [0, 1],
    3: [0, -1],
    2: [-1, 0],
}

const vectors = [];
const vector = (fx, fy, tx, ty) => {
    if (fy === ty) {
        vectors.push([fx < tx ? fx : tx, fy, fx < tx ? tx : fx, ty]);
    } else {
        vectors.push([fx, fy < ty ? fy : ty, tx, fy < ty ? ty : fy]);
    }

    l = Math.min(Math.min(l, fx), tx);
    r = Math.max(Math.max(r, fx), tx);
    t = Math.min(Math.min(t, fy), ty);
    b = Math.max(Math.max(b, fy), ty);
}


let cx = 0;
let cy = 0;

for (const line of lines) {
    let color = line.split(/[^RUDL0-9a-f]+/)[2];
    const dir = color.slice(5, 6);
    const steps = Number(`0x${color.slice(0, 5)}`);
    const fromX = cx;
    const fromY = cy;
    cx = cx + dirs[dir][0] * steps;
    cy = cy + dirs[dir][1] * steps;
    vector(fromX, fromY, cx, cy);
}

let total = 0;

for (let y = t; y <= b; ++y) {
    let shouldFill = false;
    const vecs = vectors.filter(v => v[1] <= y && v[3] >= y).sort((a, b) => (a[0]- b[0]) || (a[1] === a[3] ? -1 : 1));

    for (let i = 0; i < vecs.length; ++i) {
        const vec = vecs[i]
        if (vec[1] === vec[3]) {
            total += vec[2] - vec[0] + 1;
            if ((vecs[i + 1][1] < vec[3] && vecs[i + 2][3] > vec[3]) || (vecs[i + 1][3] > vec[3] && vecs[i + 2][1] < vec[3])) {
                if (shouldFill !== false) {
                    total += vec[0] - shouldFill - 1;
                    shouldFill = false;
                } else {
                    shouldFill = vecs[i + 2][0];
                }
            } else {
                if (shouldFill !== false) {
                    total += vec[0] - shouldFill - 1;
                    shouldFill = vecs[i + 2][0];
                }
            }
            i += 2;
        } else {
            if (shouldFill !== false) {
                total += (vec[0] - shouldFill);
                shouldFill = false;
            } else {
                total += 1;
                shouldFill = vec[0];
            }
        }
    }
}

console.log(total);
