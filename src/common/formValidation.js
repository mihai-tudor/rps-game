export const isErrorName = (name) => {
  const nameSize = name.length;
  return (nameSize < 1 || nameSize > 15);
};

export const isErrorRounds = (roundsPlayed, numberOfRounds) => {
  const notNullRounds = roundsPlayed.filter((r) => r !== null);
  if (notNullRounds.length !== numberOfRounds) {
    return true;
  }
  return notNullRounds.some(Number.isNaN);
};

export const isErrorRoundsNumber = (roundsNumber) => {
  return [1, 3, 5, 8, 10].indexOf(roundsNumber) === -1;
};

export const isErrorRoundNumber = (roundNumber) => [0, 1, 2].indexOf(roundNumber) === -1;
