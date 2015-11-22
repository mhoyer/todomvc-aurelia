var gulp = require('gulp');
var paths = require('../paths');
var Server = require('karma').Server;

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/../../karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('watch-test', function () {
  new Server({
    configFile: __dirname + '/../../karma.conf.js',
  }).start();
});

gulp.task('tdd', function (done) {
  new Server({
    configFile: __dirname + '/../../karma.conf.js',
  }, done).start();
});
