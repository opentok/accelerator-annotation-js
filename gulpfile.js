var gulp = require('gulp');
var concat = require('gulp-concat');
var importCss = require('gulp-import-css');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');
var rename = require('gulp-rename');
var merge = require('merge-stream');

var dist = 'dist';

gulp.task('default', ['js', 'css']);

gulp.task('js', function () {
  var accPack = gulp.src(['src/annotation-widget.js', 'src/acc-pack-annotation.js'])
    .pipe(concat('opentok-annotation.js'))
    .pipe(gulp.dest(dist));

  var min = gulp.src('dist/opentok-annotation.js')
    .pipe(uglify().on('error', function (e) {
      console.log(e);
    }))
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest(dist));


  return merge(accPack, min);
});


gulp.task('css', function () {
  return gulp.src('css/annotation.css')
    .pipe(importCss())
    .pipe(gulp.dest(dist));
});


gulp.task('images', function () {
  return gulp.src(
      [
        'images/**',
      ], { base: 'images/' })
    .pipe(gulp.dest('dist/images'));
});

gulp.task('zip', function () {
  return gulp.src(
      [
        'dist/annotation.css',
        'dist/images/**',
        'dist/opentok-annotation.min.js',
      ], { base: 'dist/' })
    .pipe(zip('opentok-js-annotation-1.1.0.zip'))
    .pipe(gulp.dest(dist));
});

gulp.task('dist', ['js', 'css', 'images', 'zip']);
