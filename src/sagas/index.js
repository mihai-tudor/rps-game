import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_GAMES, loadedGames, gamesFailure } from '../actions/games';
import { FETCH_GAME, loadedGame, gameFailure } from '../actions/game';
import { CREATE_NEW_GAME, addGameSuccess, addGameFailure } from '../actions/newGame';
import { getDomain } from '../common/utils';

function* getAllGames() {
  try {
    const res = yield call(fetch, `${getDomain()}/v1/rps-games`);
    const games = yield res.json();
    yield put(loadedGames(games));
  } catch (e) {
    yield put(gamesFailure(e.message));
  }
}

function* getGame(action) {
  try {
    const res = yield call(fetch, `${getDomain()}/v1/rps-games/${action.gameId}`);
    const game = yield res.json();
    yield put(loadedGame(game));
  } catch (e) {
    yield put(gameFailure(e.message));
  }
}

function* saveGame(action) {
  try {
    const gameValues = {
      p1_name: action.newGame.playerName,
      p2_name: '',
      p1_rounds: action.newGame.playedRounds,
      p2_rounds: [],
      rounds: action.newGame.numberOfRounds,
      ended: false
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(gameValues),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };

    const res = yield call(fetch, `${getDomain()}/v1/rps-games`, options);
    const game = yield res.json();
    yield put(addGameSuccess(game._id));
  } catch (e) {
    yield put(addGameFailure(e.message));
  }
}

function* rootSaga() {
  yield takeLatest(FETCH_GAMES, getAllGames);
  yield takeLatest(FETCH_GAME, getGame);
  yield takeLatest(CREATE_NEW_GAME, saveGame);
}

export default rootSaga;
