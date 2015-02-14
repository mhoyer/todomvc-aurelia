var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-6to5');
var shell = require('gulp-shell');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var compilerOptions = require('../6to5-options');
var assign = Object.assign || require('object.assign');

gulp.task('build-system', function () {
  return gulp.src(paths.source)
    .pipe(plumber())
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(sourcemaps.init())
    .pipe(to5(assign({}, compilerOptions, {modules:'system'})))
    .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/src'}))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, {extension: '.html'}))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-bundle', ['build-system'], shell.task('jspm bundle ' +
  paths.output + 'main ' +
  paths.output + 'bundled.js ' +
  ' --inject --skip-source-maps')
);

gulp.task('build-export', function() {
  var sources = [
    'README.md',
    'index.html',
    'config.js',
    'css/*',
    'jspm_packages/*',
    'jspm_packages/npm/todomvc-app-css@*/index.css',
    paths.output + '*.html',
    paths.output + 'bundled.js'
  ];

  return gulp.src(sources, {base: "."})
    .pipe(gulp.dest(paths.export));
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-html'],
    'build-bundle',
    'build-export',
    callback
  );
});
