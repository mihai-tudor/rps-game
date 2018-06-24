import { combineReducers } from 'redux';
import games, { GAMES_DEFAULT_STATE } from './games';

const gamesApp = combineReducers({
  games,
});

export const DEFAULT_STATE = {
  games: GAMES_DEFAULT_STATE,
};

export default gamesApp;
