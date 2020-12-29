'use strict'

// core utilities
var gulp = require('gulp'),
  notify = require('gulp-notify'),
  browserSync = require('browser-sync').create(),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  favicons = require('favicons').stream,
  inject = require('gulp-inject'),
  child = require('child_process');

// css utilities
var sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  mqpacker = require('css-mqpacker'),
  responsiveType = require('postcss-responsive-type');

// Path globs dictionary
var paths = {
  js: {
    src: 'javascripts/src/*.js',
    vendor: 'javascripts/src/vendor/*.js',
    build: 'javascripts/build/'
  },
  sass: ['_stylesheets/**/*.scss', '!_stylesheets/vendor/**/*.scss'],
  styleguide: './node_modules/probo-styleguide/styleguide/probo.css',
  css: 'css',
  images: 'images/**/*.{gif,jpg,png}',
  jekyll: ['_includes/**', '_layouts/**', '_plugins/**', '_recipes/**', 'css/**', 'docs/**', 'index.md', 'javascripts/build/*.min.js', '_data/**'],
  favicons: ['images/favicons/icon.html']
};

let tasks = {};

// Initiate browsersync server
function initBrowserSync() {
  return new Promise(function(resolve, reject) {
    browserSync.init({
      open: true,
      online: false,
      browser: ['google chrome'],
      server: {
        baseDir: '_site'
      }
    });
    resolve();
  });
}
exports['initBrowserSync'] = initBrowserSync;

// Compile Sass
function sassBuild() {
  return gulp.src(paths.sass)
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(postcss([
      autoprefixer(),
      mqpacker({sort: true}),
      responsiveType()
    ]))
    .pipe(gulp.dest(paths.css))
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.reload({stream: true}));
}
exports['sass:build'] = sassBuild;
exports['sass'] = sassBuild;

// Compile installed version of styleguide (update with npm)
function styleguide() {
  return gulp.src(paths.styleguide)
    .pipe(gulp.dest(paths.css))
}
exports['styleguide'] = styleguide;

// Combine third-party js files into one.
function jsCombine() {
  return gulp.src(paths.js.vendor)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('javascripts/src/'));
}
exports['js:combine'] = jsCombine;

// Minify and move js files.
function jsBuild() {
  return gulp.src(paths.js.src)
    .pipe(uglify({
      mangle: false
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.js.build))
    .pipe(gulp.dest('_site/javascripts/build'))
    .pipe(browserSync.reload({stream: true}));
}
exports['js:build'] = jsBuild;

exports['js'] = gulp.series(jsCombine, jsBuild);

function jekyll() {
  return child.exec('jekyll build');
}
exports['jekyll'] = jekyll;

// Build Tasks
exports['build'] = gulp.series(
  gulp.parallel(
    exports['js'],
    sassBuild,
    styleguide
  ),
  jekyll
);

exports['build:dev'] = gulp.series(
  exports['build'],
  initBrowserSync
);

// Watcher Tasks
function watchSass() {
  gulp.watch(paths.sass, gulp.parallel(sassBuild));
}
exports['watch:sass'] = watchSass;

function watchJs() {
  gulp.watch([paths.js.src, '!javascripts/src/vendor.js'], exports['js']);
}
exports['watch:js'] = watchJs;

function watchJekyll() {
  gulp.watch(paths.jekyll, gulp.parallel(jekyll));
}
exports['watch:jekyll'] = watchJekyll;

exports['watch'] = gulp.series(initBrowserSync, gulp.parallel(watchSass, watchJekyll, watchJs));

// Generate fav and app icons
function faviconsGenerate() {
  return gulp.src('images/probo-sphere.png')
    .pipe(favicons({
      appName: 'Probo.CI Docs',
      appDescription: 'Probo.CI documentation.',
      background: '#020307',
      path: '/images/favicons/',
      url: 'https://docs.probo.ci/',
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/?homescreen=1',
      version: 1.0,
      logging: false,
      online: false,
      html: 'icon.html',
      pipeHTML: true,
      replace: true
    }))
    .pipe(gulp.dest('images/favicons/'));
}
exports['favicons:generate'] = faviconsGenerate;

// Inject fav and app icons into head
function faviconsInject() {
  return gulp.src('./_includes/head.html')
    .pipe(inject(gulp.src(paths.favicons), {
      transform: function (filePath, file) {
        return file.contents.toString();
      }
    }))
    .pipe(gulp.dest('./_includes/'));
}
exports['favicons:inject'] = faviconsInject;

exports['favicons'] = gulp.series(faviconsGenerate, faviconsInject);

function index() {
  return child.exec(
    'echo Updating Algolia search index... && jekyll algolia push'
  );
}
exports['index'] = index;
