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

export const winLoseClass = (player, winner) => {
  if (winner === 0) {
    return 'has-text-grey';
  }
  if (winner === player) {
    return 'has-text-success';
  }
  return 'has-text-danger';
};

export const generateDefaultCardsTurned = (rounds) => {
  const arrDefaultTurned = new Array(rounds).fill(false);
  return { p1: arrDefaultTurned, p2: arrDefaultTurned };
};

/**
 * Gets the winner of a round. 0 = rock, 1 = paper, 2 = scissors.
 * @param {number} p1 What player 1 played.
 * @param {number} p2 What player 2 played.
 * @returns {number} Returns 1 if player 1 won, 2 if player 2 won and 0 if draw.
 */
const whoWonRound = (p1, p2) => {
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

export const getPlayerNumberOfVictories = (arrWins) => {
  return arrWins.filter(v => v).length;
};

const whoWonGame = (p1wins, p2wins) => {
  const p1Victories = getPlayerNumberOfVictories(p1wins);
  const p2Victories = getPlayerNumberOfVictories(p2wins);
  if (p1Victories === p2Victories) {
    return 0;
  }
  if (p1Victories > p2Victories) {
    return 1
  }
  return 2
};

export const getRoundsResults = (game) => {
  const p1wins = [];
  const p2wins = [];
  for (let i = 0; i < game.rounds; i += 1) {
    p1wins[i] = null;
    p2wins[i] = null;
    let roundWinner = 0;
    roundWinner = whoWonRound(game.p1_rounds[i], game.p2_rounds[i]);
    if (roundWinner === 1) {
      p1wins[i] = true;
      p2wins[i] = false;
    }
    if (roundWinner === 2) {
      p1wins[i] = false;
      p2wins[i] = true;
    }
  }
  return { p1_rounds_won: p1wins, p2_rounds_won: p2wins, winner: whoWonGame(p1wins, p2wins) };
};
