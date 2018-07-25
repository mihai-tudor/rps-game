export const FETCH_GAME = 'FETCH_GAME';
export const LOADED_GAME = 'LOADED_GAME';
export const GAME_FAILURE = 'GAME_FAILURE';
export const SENT_RESPONSE = 'SENT_RESPONSE';
export const SENT_FAILURE = 'SENT_FAILURE';
export const SENT_SUCCESS = 'SENT_SUCCESS';
export const SENT_SUBMIT_ERROR = 'SENT_SUBMIT_ERROR';
export const RESPONSE_UPDATE_GAME_NAME = 'RESPONSE_UPDATE_GAME_NAME';
export const RESPONSE_UPDATE_PLAYED_ROUNDS = 'RESPONSE_UPDATE_PLAYED_ROUNDS';
export const REPLAY_GAME = 'REPLAY_GAME';

export function loadedGame(game) {
  return { type: LOADED_GAME, game }
}

export function fetchGame(gameId) {
  return { type: FETCH_GAME, gameId }
}

export function gameFailure(error) {
  return { type: GAME_FAILURE, error }
}

export function sentResponse(gameId, responseGame) {
  return {
    type: SENT_RESPONSE, gameId, responseGame
  }
}

export function submitError(errorName, errorRounds) {
  return {
    type: SENT_SUBMIT_ERROR, errorName, errorRounds
  }
}

export function responseSuccess(endedGame) {
  return {
    type: SENT_SUCCESS, endedGame
  }
}

export function responseFailure() {
  return {
    type: SENT_FAILURE
  }
}

export function updateName(playerName) {
  return { type: RESPONSE_UPDATE_GAME_NAME, playerName }
}

export function updatePlayedRounds(newPlayedRound) {
  return { type: RESPONSE_UPDATE_PLAYED_ROUNDS, newPlayedRound }
}

export function replayGame() {
  return { type: REPLAY_GAME }
}
