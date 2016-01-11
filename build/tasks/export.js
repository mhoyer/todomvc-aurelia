var gulp = require('gulp');
var paths = require('../paths');
var runSequence = require('run-sequence');

gulp.task('export', function(callback) {
  return runSequence(
    'build',
    'bundle',
    'copy',
    'unbundle',
    callback
  );
});

gulp.task('copy', ['copy-sources', 'copy-transpiled', 'copy-vendorFiles']);

gulp.task('copy-sources', function() {
  var sources = [
    'README.md',
    'index.html',
    paths.source
  ];

  return gulp.src(sources)
    .pipe(gulp.dest(paths.export));
});

gulp.task('copy-transpiled', function() {
  var sources = [
    paths.output + '*.js',
    paths.output + '*.html'
  ];

  return gulp.src(sources, {base: "."})
    .pipe(gulp.dest(paths.export));
});

gulp.task('copy-vendorFiles', function() {
  var sources = [
    'config.js',
    'jspm_packages/system.js',
    'jspm_packages/system-polyfills.js',
    'jspm_packages/npm/todomvc-app-css@*/index.css',
    'jspm_packages/npm/todomvc-common@*/base.*'
  ];

  return gulp.src(sources, {base: "."})
    .pipe(gulp.dest(paths.export));
});
