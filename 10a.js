const values = `.....
.S-7.
.|.|.
.L-J.
.....`;


const moves = {
    'S': [[-1, 0], [1, 0], [0, -1], [0, 1]],
    '|': [[0, -1], [0, 1]],
    '-': [[-1, 0], [1, 0]],
    'L': [[0, -1], [1, 0]],
    'J': [[0, -1], [-1, 0]],
    '7': [[-1, 0], [0, 1]],
    'F': [[1, 0], [0, 1]],
}

const maze = values.split(/\n/).map(line => line.split(''));
let startingPoint = [0, 0];
for (let y = 0; y < maze.length; ++y) {
    for (let x = 0, xl = maze[y].length; x < xl; ++x) {
        if (maze[y][x] === 'S') {
            startingPoint = [x, y];
            break;
        }
    }
}

let max = 0;
const validMoves = [[startingPoint]];

const travel = (p, len = 0, from = [-1, -1]) => {
    const c = maze[p[1]][p[0]];
    if (len && c === 'S') {
        max = Math.max(max, len);
        return;
    }

    const ways = moves[c];
    if (!ways) return;

    for (const way of ways) {
        const to = [p[0] + way[0], p[1] + way[1]];
        if (to[0] === from[0] && to[1] === from[1]) continue;
        if (to[0] < 0 || to[0] >= maze[0].length || to[1] < 0 || to[1] >= maze.length) continue;
        validMoves.push([to, len + 1, p]);
    }
}

for (let move = 0; move < validMoves.length; ++move) travel(...validMoves[move]);
console.log(max);