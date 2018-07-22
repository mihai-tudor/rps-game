export const generateKey = (pre) => `${pre}_${new Date().getTime()}`;
export const getDomain = () => window.location.origin;
export const addS = (number) => number !== 1 ? 's' : '';
export const printWinner = (p1, p2, winner) => {
  switch (winner) {
    case 1: return `${p1} won`;
    case 2: return `${p2} won`;
    default: return 'draw'
  }
};

/**
 * Gets the winner of a round. 0 = rock, 1 = paper, 2 = scissors.
 * @param {number} p1 What player 1 played.
 * @param {number} p2 What player 2 played.
 * @returns {number} Returns 1 if player 1 won, 2 if player 2 won and 0 if draw.
 */
export const whoWonRound = (p1, p2) => {
  if (p1 === p2) {
    return 0;
  }
  if (p1 === 0 && p2 === 2) {
    return 1;
  }
  if (p1 === 1 && p2 === 0) {
    return 1;
  }
  if (p1 === 2 && p2 === 1) {
    return 1;
  }
  return 2
};

export const whoWonGame = (numberOfRounds, p1, p2) => {
  let p1wins = 0;
  let p2wins = 0;
  for (let i = 0; i < numberOfRounds; i += 1) {
    let roundWinner = 0;
    roundWinner = whoWonRound(p1[i], p2[i]);
    if (roundWinner === 1) {
      p1wins += 1;
    }
    if (roundWinner === 2) {
      p2wins += 1;
    }
  }

  if (p1wins === p2wins) {
    return 0;
  }
  if (p1wins > p2wins) {
    return 1
  }
  return 2
};
