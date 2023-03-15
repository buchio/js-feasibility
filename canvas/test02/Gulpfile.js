const gulp = require('gulp');
const gulp_clean = require('gulp-clean');
const gulp_concat = require('gulp-concat');
const gulp_uglify = require('gulp-uglify');

const clean = () => {
  return gulp.src('release/')
    .pipe(gulp_clean());
};

const javascript = () => {
  return gulp.src('src/js/*.js')
    .pipe(gulp_concat('test02.min.js'))
    .pipe(gulp_uglify())
    .pipe(gulp.dest('release/js'));
  
};

const html = () => {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('release/'));
}

const css = () => {
  return gulp.src('src/css/*.css')
    .pipe(gulp.dest('release/css/'));
}

exports.default = gulp.series(clean, javascript, html, css);

