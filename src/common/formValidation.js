export const isErrorName = (name) => name.length < 1;

export const isErrorRounds = (roundsPlayed, numberOfRounds) => {
  const notNullRounds = roundsPlayed.filter((r) => r !== null);
  if (notNullRounds.length !== numberOfRounds) {
    return true;
  }
  return notNullRounds.some(Number.isNaN);
};
