'use strict'

// core utilities
var gulp = require('gulp'),
  gutil = require('gulp-util'),
  notify = require('gulp-notify'),
  argv = require('yargs').argv,
  gulpif = require('gulp-if'),
  browserSync = require('browser-sync').create(),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  favicons = require('gulp-favicons'),
  inject = require('gulp-inject'),
  child = require('child_process');

// css utilities
var sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  mqpacker = require('css-mqpacker'),
  responsiveType = require('postcss-responsive-type');

// paths
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


// post CSS processors
var processors = [
  autoprefixer({browsers: ['last 2 version', '> 5%']}), // specify browser compatibility with https://github.com/ai/browserslist
  mqpacker({sort: true}), // this will reorganize css into media query groups, better for performance
  responsiveType() // this makes the font size *~*~ automagically ~*~* responsive
];

//  should we build sourcemaps? "gulp build --sourcemaps"
var buildSourceMaps = !!argv.sourcemaps;

// error notifications
var handleError = function (task) {
  return function (err) {
    gutil.beep();

    notify.onError({
      title: task,
      message: err.message,
      sound: false,
      icon: false
    })(err);

    gutil.log(gutil.colors.bgRed(task + ' error:'), gutil.colors.red(err));

    this.emit('end');
  };
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
  return gulp.src(paths.sass, {
      sourcemaps: buildSourceMaps
    })
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .on('error', handleError('Sass Compiling'))
    .pipe(postcss(processors))
    .on('error', handleError('Post CSS Processing'))
    .pipe(gulp.dest(paths.css, {
      sourcemaps: buildSourceMaps ? '.' : false
    }))
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
      mangle: false,
      preserveComments: false,
    }))
    .on('error', handleError('JS minifying'))
    .pipe(rename({
      suffix: '.min'
    }))
    .on('error', handleError('JS renaming'))
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
    gulp.series(
      jsCombine,
      jsBuild,
    ),
    sassBuild,
    styleguide
  ),
  jekyll
);

exports['build:dev'] = gulp.series(
  gulp.parallel(
    gulp.series(
      jsCombine,
      jsBuild,
    ),
    sassBuild,
    styleguide
  ),
  jekyll,
  initBrowserSync
);

// Watcher Tasks
function watchSass() {
  gulp.watch(paths.sass, gulp.parallel(sassBuild));
}
exports['watch:sass'] = watchSass;

function watchJs() {
  gulp.watch([paths.js.src, '!javascripts/src/vendor.js'], gulp.series(jsCombine, jsBuild));
}
exports['watch:js'] = watchJs;

function watchJekyll() {
  gulp.watch(paths.jekyll, gulp.parallel(jekyll));
}
exports['watch:jekyll'] = watchJekyll;

exports['watch'] = gulp.series(initBrowserSync, gulp.parallel(watchSass, watchJekyll, watchJs));

// Generate fav and app icons
function faviconsGenerate() {
  gutil.log('Generating favicons...');
  return gulp.src('images/probo-sphere.png').pipe(favicons({
      appName: 'Probo.CI Docs',
      appDescription: 'Probo.CI documentation.',
      background: '#020307',
      path: '/images/favicons/',
      url: 'http://docs.probo.ci/',
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
    .on('error', gutil.log)
    .pipe(gulp.dest('images/favicons/'));
}
exports['favicons:generate'] = faviconsGenerate;

// Inject fav and app icons into head
function faviconsInject() {
  gutil.log('Injecting favicons into <head>...');
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
