import * as log from 'loglevel';
import RpsGame from '../models/rps-api';
import { whoWonGame } from '../../src/common/utils';

export const findFinishedGames = async (ctx) => {
  ctx.body = await RpsGame.find({ ended: { $eq: true } }).sort({ updatedAt: -1 });
};

export const findGame = async (ctx) => {
  const { id } = ctx.params;
  ctx.body = await RpsGame.findById(id);
};

export const createNewGame = async (ctx) => {
  const { body } = ctx.request;
  const gameOptions = {
    ...body, p2_name: null, p2_rounds: null, ended: false, winner: null
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
  game.winner = whoWonGame(game.rounds, game.p1_rounds, game.p2_rounds);
  try {
    ctx.body = await game.save();
  } catch (e) {
    log.error(e);
    ctx.response.status = 403;
  }
};
