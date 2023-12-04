const values = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const cardsCount = {};
const cards = values.split(/\n/);

for (const card of cards) {
    const [, id, win, mine] = card.match(/(\d+): +(.+) \| +(.+)/);
    cardsCount[+id] = (cardsCount[+id] || 0) + 1;
    const won = win.split(/ +/g).filter(num => mine.split(/ +/g).includes(num)).length;
    for (let i = 1; i <= won; ++i) cardsCount[+id + i] = (cardsCount[+id + i] || 0) + cardsCount[+id];
}

const totalCards = Object.values(cardsCount).reduce((acc, num) => acc + num, 0);
console.log(totalCards);
