
module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('autoprefixer')({
      browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']
    })
  ]
};
