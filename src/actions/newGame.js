export const UPDATE_GAME_ROUNDS = 'UPDATE_GAME_ROUNDS';
export const UPDATE_GAME_NAME = 'UPDATE_GAME_NAME';
export const UPDATE_PLAYED_ROUNDS = 'UPDATE_PLAYED_ROUNDS';
export const SUBMIT_ERROR = 'SUBMIT_ERROR';
export const CREATE_NEW_GAME = 'CREATE_NEW_GAME';
export const CREATE_FAILURE = 'CREATE_FAILURE';
export const CREATE_SUCCESS = 'CREATE_SUCCESS';

export function updateRounds(newRounds) {
  return { type: UPDATE_GAME_ROUNDS, newRounds }
}

export function updateName(playerName) {
  return { type: UPDATE_GAME_NAME, playerName }
}

export function updatePlayedRounds(newPlayedRound) {
  return { type: UPDATE_PLAYED_ROUNDS, newPlayedRound }
}

export function submitError(errorName, errorRounds) {
  return {
    type: SUBMIT_ERROR, errorName, errorRounds
  }
}

export function createNewGame(newGame) {
  return {
    type: CREATE_NEW_GAME, newGame
  }
}

export function addGameSuccess(newGame) {
  console.log('addGameSuccess: ', newGame);
  return {
    type: CREATE_SUCCESS, newGame
  }
}

export function addGameFailure(error) {
  return {
    type: CREATE_FAILURE, error
  }
}
