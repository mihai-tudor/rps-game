export const UPDATE_GAME_ROUNDS = 'UPDATE_GAME_ROUNDS';
export const UPDATE_GAME_NAME = 'UPDATE_GAME_NAME';
export const UPDATE_PLAYED_ROUNDS = 'UPDATE_PLAYED_ROUNDS';

export function updateRounds(newRounds) {
  return { type: UPDATE_GAME_ROUNDS, newRounds }
}

export function updateName(newName) {
  return { type: UPDATE_GAME_NAME, newName }
}
export function updatePlayedRounds(newPlayedRound) {
  return { type: UPDATE_PLAYED_ROUNDS, newPlayedRound }
}
