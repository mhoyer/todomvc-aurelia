var gulp = require('gulp');
var bundler = require('aurelia-bundler');

var aureliaIncludes = [
  'aurelia-bootstrapper',
  'aurelia-fetch-client',
  'aurelia-router',
  'aurelia-animator-css',
  'github:aurelia/templating-binding',
  'github:aurelia/templating-resources',
  'github:aurelia/templating-router',
  'github:aurelia/loader-default',
  'github:aurelia/history-browser',
  'github:aurelia/logging-console',
  'github:aurelia/framework',
  'npm:underscore@1.8.3',
  'npm:underscore@1.8.3/underscore'
];

var config = {
  force: true,
  packagePath: '.',
  bundles: {
    "dist/app-build": {
      includes: [
        '*',
        '*.html!text',
        '*.css!text'
      ],
      excludes: aureliaIncludes,
      options: {
        inject: true,
        minify: false
      }
    },
    "dist/aurelia": {
      includes: aureliaIncludes,
      options: {
        inject: true,
        minify: true
      }
    }
  }
};

gulp.task('bundle', function() {
 return bundler.bundle(config);
});

gulp.task('unbundle', function() {
 return bundler.unbundle(config);
});
