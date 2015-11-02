var gulp = require('gulp');
var paths = require('../paths');
var runSequence = require('run-sequence');

gulp.task('export', function(callback) {
  return runSequence(
    'build',
    'bundle',
    'export-copy',
    'unbundle',
    callback
  );
});

gulp.task('export-copy', function() {
  var sources = [
    'README.md',
    'index.html',
    'config.js',
    'jspm_packages/*',
    '!jspm_packages/*.src.js',
    'jspm_packages/npm/todomvc-app-css@*/index.css',
    'jspm_packages/npm/todomvc-common@*/base.*',
    paths.output + 'app-build.js',
    paths.output + 'aurelia.js'
  ];

  return gulp.src(sources, {base: "."})
    .pipe(gulp.dest(paths.export));
});
