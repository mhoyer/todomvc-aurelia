var gulp = require('gulp');
var paths = require('../paths');
var del = require('del');
var vinylPaths = require('vinyl-paths');

// deletes all files in the output path
gulp.task('clean', ['clean-dist', 'clean-export']);

gulp.task('clean-dist', function() {
  return gulp.src(paths.output)
    .pipe(vinylPaths(del));
});

gulp.task('clean-export', function() {
  return gulp.src(paths.export)
    .pipe(vinylPaths(del));
});
