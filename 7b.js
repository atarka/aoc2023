const values = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const cardStrength = ['J', '1','2','3','4','5','6','7','8','9','T','Q','K','A'];
const adjustHand = hand => hand.split('').map(card => String.fromCharCode(65 + cardStrength.indexOf(card))).join('');
const getStrength = (hand) => Object.values(hand.split('').filter(card => card !== 'J').reduce((acc, card) => (acc[card] = (acc[card] || 0) + 1, acc), {}))
    .sort((a, b) => b - a)
    .concat(0).map((v, i) => i ? v : v + hand.split('').filter(card => card === 'J').length)
    .join('');

const betSum = [...values.matchAll(/(.{5}) (\d+)/g)]
    .map(m => ({strength: getStrength(m[1]), adjusted: adjustHand(m[1]), amount: m[2]}))
    .sort((a, b) => a.strength.localeCompare(b.strength) || a.adjusted.localeCompare(b.adjusted))
    .reduce((sum, hand, i) => sum + hand.amount * (i + 1), 0);

console.log(betSum);