import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_GAMES, loadedGames, gamesFailure } from '../actions/games';
import { CREATE_NEW_GAME, addGameSuccess, addGameFailure } from '../actions/newGame';

function* getAllGames() {
  try {
    const res = yield call(fetch, 'v1/rps-games');
    const games = yield res.json();
    yield put(loadedGames(games))
  } catch (e) {
    yield put(gamesFailure(e.message))
  }
}

function* saveGame(action) {
  try {
    console.log('saga CREATE_NEW_GAME: ', action.newGame);
    const gameValues = {
      p1_name: action.newGame.playerName,
      p2_name: '',
      p1_rounds: action.newGame.playedRounds,
      p2_rounds: [],
      rounds: action.newGame.numberOfRounds,
      ended: false
    };
    console.log('gameValues: ', gameValues);
    const options = {
      method: 'POST',
      body: JSON.stringify(gameValues),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };

    const res = yield call(fetch, 'v1/rps-games', options);
    const game = yield res.json();
    yield put(addGameSuccess(game))
  } catch (e) {
    yield put(addGameFailure(e.message))
  }
}

function* rootSaga() {
  yield takeLatest(FETCH_GAMES, getAllGames);
  yield takeLatest(CREATE_NEW_GAME, saveGame);
}

export default rootSaga;
