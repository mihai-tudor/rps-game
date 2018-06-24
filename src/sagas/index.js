import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_GAMES, loadedGames, gamesFailure } from '../actions/games';

function* getAllGames() {
  try {
    const res = yield call(fetch, 'v1/rps-games');
    const games = yield res.json();
    yield put(loadedGames(games))
  } catch (e) {
    yield put(gamesFailure(e.message))
  }
}

function* rootSaga() {
  yield takeLatest(FETCH_GAMES, getAllGames)
}

export default rootSaga;
