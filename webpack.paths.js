const path = require('path');

module.exports = {
  client: {
    context: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'client-dist'),
    tsconfig: path.resolve(__dirname, 'src', 'tsconfig.json'),
    assets: path.resolve(__dirname, 'assets'),
    alias: {
      'util': path.resolve(__dirname, 'src/util/'),
      'app': path.resolve(__dirname, 'src/app/')
    }
  },
  server: {
    context: path.resolve(__dirname, 'server'),
    dist: path.resolve(__dirname, 'server-dist'),
    tsconfig: path.resolve(__dirname, 'server', 'tsconfig.json')
  }
};
