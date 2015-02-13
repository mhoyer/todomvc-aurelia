var path = require('path');

module.exports = {
  source:'src/**/*.js',
  html:'src/**/*.html',
  style:'styles/**/*.css',
  output:'dist/',
  export:'export/',
  doc:'./doc',
  specsSrc: 'test/spec/**/*.js',
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
