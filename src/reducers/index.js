import { combineReducers } from 'redux';
import games, { GAMES_DEFAULT_STATE } from './games';
import game, { GAME_DEFAULT_STATE } from './game';
import newGame, { NEW_GAME_DEFAULT_STATE } from './newGames';

const gamesApp = combineReducers({
  games, game, newGame
});

export const DEFAULT_STATE = {
  games: GAMES_DEFAULT_STATE,
  game: GAME_DEFAULT_STATE,
  newGame: NEW_GAME_DEFAULT_STATE
};

export default gamesApp;
