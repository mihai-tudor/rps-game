export const UPDATE_GAME_ROUNDS = 'UPDATE_GAME_ROUNDS';

export function updateRounds(newRounds) {
  return { type: UPDATE_GAME_ROUNDS, newRounds }
}
