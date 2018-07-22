require('babel-register')({
  presets: ['es2015']
});

require('dotenv').config();

require('./server/index');
