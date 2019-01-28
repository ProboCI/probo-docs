'use strict'

// core utilities
var gulp = require('gulp'),
  shell = require('gulp-shell'),
  gutil = require('gulp-util'),
  notify = require('gulp-notify'),
  argv = require('yargs').argv,
  gulpif = require('gulp-if'),
  browserSync = require('browser-sync').create(),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  favicons = require('gulp-favicons'),
  inject = require('gulp-inject');

// css utilities
var sass = require('gulp-sass'),
  cssGlobbing = require('gulp-sass-globbing'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  mqpacker = require('css-mqpacker'),
  sourcemaps = require('gulp-sourcemaps'),
  runSequence = require('run-sequence'),
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

// Compile Sass
gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe(gulpif(buildSourceMaps, sourcemaps.init()))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .on('error', handleError('Sass Compiling'))
    .pipe(postcss(processors))
    .on('error', handleError('Post CSS Processing'))
    .pipe(gulpif(buildSourceMaps, sourcemaps.write()))
    .pipe(gulp.dest(paths.css))
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.reload({stream: true}));
});

// Compile installed version of styleguide (update with npm)
gulp.task('styleguide', function() {
  return gulp.src(paths.styleguide)
    .pipe(gulp.dest(paths.css))
});

gulp.task('browserSync', function () {
  browserSync.init({
    open: true,
    injectChanges: true,
    notify: true,
    online: false,
    browser: ['google chrome'],
    server: {
      baseDir: '_site'
    }
  });
});

gulp.task('js:combine', function () {
  return gulp.src(paths.js.vendor)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('javascripts/src/'));
});

gulp.task('js', gulp.series('js:combine'), function () {
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
    .pipe(gulp.dest(paths.js.build));
});

gulp.task('jekyll', shell.task([
  'jekyll build'
]));

gulp.task('build', gulp.series(gulp.parallel('js', 'sass', 'styleguide'), 'jekyll'));

gulp.task('build:dev', gulp.series('build', 'browserSync'));

gulp.task('watch', gulp.series('build:dev'), function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.jekyll, ['jekyll'], browserSync.reload);
  gulp.watch([paths.js.src, paths.js.vendor], ['js'], browserSync.reload);
});

// Generate fav and app icons
gulp.task('favicons:generate', function () {
  gutil.log('Generating favicons...');
  return gulp.src('images/probo-sphere.png').pipe(favicons({
      appName: 'ProboCI Docs',
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
});

// Inject fav and app icons into head
gulp.task('favicons:inject', function () {
  gutil.log('Injecting favicons into <head>...');
  return gulp.src('./_includes/head.html')
    .pipe(inject(gulp.src(paths.favicons), {
      transform: function (filePath, file) {
        return file.contents.toString();
      }
    }))
    .pipe(gulp.dest('./_includes/'));
});

gulp.task('favicons', gulp.series('favicons:generate', 'favicons:inject'));

gulp.task('index', shell.task([
  'echo Updating Algolia search index...',
  'jekyll algolia push'
]));
