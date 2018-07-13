export const FETCH_GAME = 'FETCH_GAME';
export const LOADED_GAME = 'LOADED_GAME';
export const GAME_FAILURE = 'GAME_FAILURE';

export function loadedGame(game) {
  return { type: LOADED_GAME, game }
}

export function fetchGame(gameId) {
  return { type: FETCH_GAME, gameId }
}

export function gameFailure(error) {
  return { type: GAME_FAILURE, error }
}
