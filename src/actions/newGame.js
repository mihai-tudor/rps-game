export const UPDATE_GAME_ROUNDS = 'UPDATE_GAME_ROUNDS';
export const UPDATE_GAME_NAME = 'UPDATE_GAME_NAME';
export const UPDATE_PLAYED_ROUNDS = 'UPDATE_PLAYED_ROUNDS';
export const SUBMIT_GAME = 'SUBMIT_GAME';

export function updateRounds(newRounds) {
  return { type: UPDATE_GAME_ROUNDS, newRounds }
}

export function updateName(playerName) {
  return { type: UPDATE_GAME_NAME, playerName }
}

export function updatePlayedRounds(newPlayedRound) {
  return { type: UPDATE_PLAYED_ROUNDS, newPlayedRound }
}

export function submitNewGame(playerName, playedRounds, numberOfRounds) {
  return {
    type: SUBMIT_GAME, playerName, playedRounds, numberOfRounds
  }
}
