var gulp = require('gulp');
var paths = require('../paths');
var karma = require('gulp-karma');

gulp.task('test', function() {
  return gulp.src(paths.specsSrc)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('watch-test', function() {
  gulp.src(paths.specsSrc)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});
