'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      pug = require('gulp-pug'),
      debug = require('gulp-debug'),
      del = require('del'),
      autoprefixer = require('gulp-autoprefixer'),
      browserSync = require('browser-sync').create();

gulp.task('pug', function () {
  return gulp.src('app/templates/*.pug')
      .pipe(pug())
      .pipe(debug({title: 'working on'}))
      .pipe(gulp.dest('dist'))
});

gulp.task('sass', function () {
  return gulp.src('app/scss/*.scss')
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(debug({title: 'working on'}))
      .pipe(gulp.dest('dist/css'))
});

gulp.task('javascript', function () {
  return gulp.src('app/javascript/**/*.js')
      .pipe(debug({title: 'working on'}))
      .pipe(gulp.dest('dist/javascript/'))
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*.*', {since: gulp.lastRun('images')})
      .pipe(debug({title: 'working on'}))
      .pipe(gulp.dest('dist/images'))
});

gulp.task('assets', function () {
  return gulp.src('app/assets/**/**.*')
      .pipe(gulp.dest('dist/assets'))
});

gulp.task('fonts', function () {
  return gulp.src('app/fonts/**/**.*')
      .pipe(gulp.dest('dist/fonts'))
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    notify: true
  })
});

gulp.task('watch', function () {
  gulp.watch('app/scss/**/*.*', gulp.series('sass'));
  gulp.watch('app/templates/**/*.*', gulp.series('pug'));
  gulp.watch('app/javascript/**/*.*', gulp.series('javascript'));

  gulp.watch('dist/**/*.*').on('change', browserSync.reload);
});

gulp.task('clean', function () {
  return del('dist');
});

gulp.task('build', gulp.series('clean', gulp.parallel('pug', 'sass', 'javascript', 'images', 'assets', 'fonts')));

gulp.task('serve', gulp.parallel('watch', 'browser-sync'));

gulp.task('dev', gulp.series('build', 'serve'));