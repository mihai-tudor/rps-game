import { call, put, takeLatest } from 'redux-saga/effects';
import * as log from 'loglevel';
import { FETCH_GAMES, loadedGames, gamesFailure } from '../actions/games';
import {
  FETCH_GAME, SENT_RESPONSE,
  loadedGame, gameFailure, responseSuccess, responseFailure
} from '../actions/game';
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
      p1_rounds: action.newGame.playedRounds,
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
    log.error(`Failed to create game! ${e.message}`);
    yield put(addGameFailure());
  }
}

function* saveResponse(action) {
  try {
    const gameValues = {
      p2_name: action.responseGame.playerName,
      p2_rounds: action.responseGame.playedRounds
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(gameValues),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };

    const res = yield call(fetch, `${getDomain()}/v1/rps-games/${action.gameId}`, options);
    const game = yield res.json();
    yield put(responseSuccess(game));
  } catch (e) {
    log.error(`Failed to send response! ${e.message}`);
    yield put(responseFailure());
  }
}

function* rootSaga() {
  yield takeLatest(FETCH_GAMES, getAllGames);
  yield takeLatest(FETCH_GAME, getGame);
  yield takeLatest(CREATE_NEW_GAME, saveGame);
  yield takeLatest(SENT_RESPONSE, saveResponse);
}

export default rootSaga;
