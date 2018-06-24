export const FETCH_GAMES = 'FETCH_GAMES';
export const LOADED_GAMES = 'LOADED_GAMES';
export const GAMES_FAILURE = 'GAMES_FAILURE';

export function loadedGames(games) {
  return { type: LOADED_GAMES, games }
}

export function fetchGames() {
  return { type: FETCH_GAMES }
}

export function gamesFailure(error) {
  return { type: GAMES_FAILURE, error }
}
