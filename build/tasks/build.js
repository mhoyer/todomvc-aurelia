var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');
var shell = require('gulp-shell');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');

gulp.task('build-system', function () {
  return gulp.src(paths.source)
    .pipe(plumber())
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(to5(assign({}, compilerOptions, {modules:'system'})))
    .pipe(sourcemaps.write({includeContent: false, sourceRoot: paths.sourceMapRelativePath }))
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
    '!jspm_packages/*.src.js',
    'jspm_packages/npm/todomvc-app-css@*/index.css',
    'jspm_packages/npm/todomvc-common@*/base.*',
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
