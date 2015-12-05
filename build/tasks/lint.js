var gulp = require('gulp');
var paths = require('../paths');
var jscs = require('gulp-jscs');

// runs jscs linting on all .js files
gulp.task('lint', function() {
  return gulp.src(paths.source)
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'));
});
