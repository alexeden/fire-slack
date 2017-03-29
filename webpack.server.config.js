const paths = require('./webpack.paths');

module.exports = {
  target: 'node',
  context: paths.server.context,

  entry: './server.ts',

  output: {
    path: paths.server.dist,
    filename: 'server.js'
  }
};
