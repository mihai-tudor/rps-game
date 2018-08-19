import * as log from 'loglevel';
import RpsGame from '../models/rps-api';
import { getRoundsResults } from '../../src/common/utils';

export const findFinishedGames = async (ctx) => {
  ctx.body = await RpsGame.find({ ended: { $eq: true } }).sort({ updatedAt: -1 }).limit(20);
};

export const findGame = async (ctx) => {
  const { id } = ctx.params;
  ctx.body = await RpsGame.findById(id);
};

export const createNewGame = async (ctx) => {
  const { body } = ctx.request;
  const gameOptions = {
    ...body,
    p2_name: null,
    p2_rounds: null,
    ended: false,
    winner: null,
    p1_rounds_won: null,
    p2_rounds_won: null
  };
  try {
    const newGame = new RpsGame(gameOptions);
    ctx.body = await newGame.save();
  } catch (e) {
    log.error(e);
    ctx.response.status = 403;
  }
};

export const destroy = async (ctx) => {
  const { id } = ctx.params;
  const game = await RpsGame.findById(id);

  // Delete game from database and return deleted object as reference
  ctx.body = await game.remove();
};

export const finishGame = async (ctx) => {
  const { id } = ctx.params;
  const { body } = ctx.request;
  const game = await RpsGame.findById(id);
  game.p2_name = body.p2_name;
  game.p2_rounds = body.p2_rounds;
  game.ended = true;
  const gameEndStatus = getRoundsResults(game);
  game.p1_rounds_won = gameEndStatus.p1_rounds_won;
  game.p2_rounds_won = gameEndStatus.p2_rounds_won;
  game.winner = gameEndStatus.winner;
  try {
    ctx.body = await game.save();
  } catch (e) {
    log.error(e);
    ctx.response.status = 403;
  }
};
