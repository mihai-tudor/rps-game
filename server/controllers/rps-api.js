import * as log from 'loglevel';
import RpsGame from '../models/rps-api';

export const findFinishedGames = async (ctx) => {
  ctx.body = await RpsGame.find({ ended: { $eq: true } });
};

export const findGame = async (ctx) => {
  const { id } = ctx.params;
  ctx.body = await RpsGame.findById(id);
};

export const createNewGame = async (ctx) => {
  const { body } = ctx.request;
  const gameOptions = {
    ...body, p2_name: null, p2_rounds: null, ended: false
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
  // Find game based on id, then toggle seen on/off
  const { id } = ctx.params;
  const game = await RpsGame.findById(id);
  game.seen = !game.seen;

  // Update game in database
  ctx.body = await game.save();
};
