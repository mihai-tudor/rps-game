import RpsGame from '../models/rps-api';

export const findAll = async (ctx) => {
  // Fetch all games from the database and return as payload
  ctx.body = await RpsGame.find({});
};

export const create = async (ctx) => {
  // Create New Game from payload sent and save to database
  const newGame = new RpsGame(ctx.request.body);
  ctx.body = await newGame.save();
};

export const destroy = async (ctx) => {
  // Get id from url parameters and find game in database
  const { id } = ctx.params;
  const game = await RpsGame.findById(id);

  // Delete game from database and return deleted object as reference
  ctx.body = await game.remove();
};

export const update = async (ctx) => {
  // Find game based on id, then toggle seen on/off
  const { id } = ctx.params;
  const game = await RpsGame.findById(id);
  game.seen = !game.seen;

  // Update game in database
  ctx.body = await game.save();
};
