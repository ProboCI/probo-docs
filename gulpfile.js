'use strict'

// core utilities
var gulp = require('gulp'),
  shell = require('gulp-shell'),
  gutil = require('gulp-util'),
  notify = require('gulp-notify'),
  argv = require('yargs').argv,
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
  responsiveType = require('postcss-responsive-type');

// paths
var paths = {
  js: {
    src: ['javascripts/src/*.js', '!javascripts/src/vendor/**/*.js'],
    vendor: 'javascripts/src/vendor/**/*.js',
    build: 'javascripts/build/'
  },
  sass: ['_stylesheets/**/*.scss', '!_stylesheets/vendor/**/*.scss'],
  styleguide: './node_modules/probo-styleguide/styleguide/probo.css',
  css: 'css',
  images: 'images/**/*.{gif,jpg,png}',
  jekyll: ['_includes/**', '_layouts/**', '_plugins/**', '_examples/**', 'css/**', 'docs/**', 'index.md', 'javascripts/build/*.min.js', '_data/**'],
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
var handleError = (task) => {
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
gulp.task('sass', () => {
  return gulp.src(paths.sass, { sourcemaps: buildSourceMaps })
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .on('error', handleError('Sass Compiling'))
    .pipe(postcss(processors))
    .on('error', handleError('Post CSS Processing'))
    .pipe(gulp.dest(paths.css, { sourcemaps: buildSourceMaps }))
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.reload({stream: true}));
});

// Compile installed version of styleguide (update with npm)
gulp.task('styleguide', () => {
  return gulp.src(paths.styleguide)
    .pipe(gulp.dest(paths.css))
});

gulp.task('js', () => {
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

gulp.task('js:vendor', () => {
  return gulp.src(paths.js.vendor)
    .pipe(concat('vendor.js'))
    .pipe(uglify({
      mangle: false,
      preserveComments: false,
    }))
    .on('error', handleError('JS vendor minifying'))
    .pipe(rename({
      suffix: '.min'
    }))
    .on('error', handleError('JS vendor renaming'))
    .pipe(gulp.dest('javascripts/build/'));
});

gulp.task('serve', () => {
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

gulp.task('jekyll', shell.task([
  'jekyll build'
]));

gulp.task('build', gulp.series(gulp.parallel('js', 'sass', 'styleguide'), 'jekyll'));

gulp.task('watch:jekyll', () => {
  gulp.watch(paths.jekyll, gulp.series('jekyll'));
});

gulp.task('watch:sass', () => {
  gulp.watch(paths.sass, gulp.series('sass'));
});

gulp.task('watch:js', () => {
  gulp.watch(paths.js.src, gulp.series('js', 'js:vendor'));
});

gulp.task('watch', gulp.series('build', gulp.parallel('serve', 'watch:sass', 'watch:js', 'watch:jekyll')));

// Generate fav and app icons
gulp.task('favicons:generate', () => {
  gutil.log('Generating favicons...');
  return gulp.src('images/probo-sphere.png').pipe(favicons({
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
    .on('error', gutil.log)
    .pipe(gulp.dest('images/favicons/'));
});

// Inject fav and app icons into head
gulp.task('favicons:inject', () => {
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
