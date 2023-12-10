const values = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`;


const moves = {
    '|': [[0, -1], [0, 1]],
    '-': [[-1, 0], [1, 0]],
    'L': [[0, -1], [1, 0]],
    'J': [[0, -1], [-1, 0]],
    '7': [[-1, 0], [0, 1]],
    'F': [[1, 0], [0, 1]],
    'S': [[-1, 0], [1, 0], [0, -1], [0, 1]],
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
let validHistory = [];
const validMoves = [[startingPoint]];

const travel = (p, len = 0, from = [-1, -1], history = []) => {
    const c = maze[p[1]][p[0]];
    if (len && c === 'S') {
        if (len > max) {
            max = len;
            validHistory = history.concat();
        }
        return;
    }

    const ways = moves[c];
    if (!ways) return;

    for (const way of ways) {
        const to = [p[0] + way[0], p[1] + way[1]];
        if (to[0] === from[0] && to[1] === from[1]) continue;
        if (to[0] < 0 || to[0] >= maze[0].length || to[1] < 0 || to[1] >= maze.length) continue;
        validMoves.push([to, len + 1, p, history.concat([p])]);
    }
}

while (validMoves.length) travel(...validMoves.shift());

const diff = (from, to) => [to[0] - from[0], to[1] - from[1]];
const startingDiff = [diff(startingPoint, validHistory[1]), diff(startingPoint, validHistory[validHistory.length - 1])];
maze[startingPoint[1]][startingPoint[0]] = Object.entries(moves).find(([_, moves]) => moves.every(m => startingDiff.find(d => d[0] === m[0] && d[1] === m[1])))[0];

let tiles = 0;

for (let y = 0; y < maze.length; ++y) {
    const row = maze[y];
    let left = false;
    for (let x = 0; x < row.length; ++x) {
        const c = maze[y][x];
        if (validHistory.find(h => h[0] === x && h[1] === y)) {
            left = !left;
            if (c === 'F') {
                for (; maze[y][x + 1] === '-'; ++x);
                if (maze[y][x + 1] === 'J') {
                    ++x;
                    continue;
                }
            } else if (c === 'L') {
                for (; maze[y][x + 1] === '-'; ++x);
                if (maze[y][x + 1] === '7') {
                    ++x;
                    continue;
                }
            }
        } else if (left) {
            tiles++;
            maze[y][x] = '@';
        }
    }
}

console.log(tiles);
