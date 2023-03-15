const gulp = require('gulp');

const gulpBabel = require('gulp-babel');
const gulpClean = require('gulp-clean');
const gulpCleanCSS = require('gulp-clean-css');
const gulpConcat = require('gulp-concat');
const gulpCSSlint = require('gulp-csslint');
const gulpEslint = require('gulp-eslint');
const gulpRename = require('gulp-rename');
const gulpStripImportExport = require('gulp-strip-import-export');
const gulpUglify = require('gulp-uglify');


const clean = () => {
  return gulp.src('release/', {allowEmpty:true})
    .pipe(gulpClean());
};

const javascript = () => {
  return gulp.src('src/js/*.js')
    .pipe(gulpEslint({useEslintrc: true}))
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failAfterError())
    .pipe(gulpConcat('test02.js'))
    .pipe(gulpStripImportExport())
    .pipe(gulpBabel({presets: ['@babel/env']}))
//    .pipe(gulpUglify())
    .pipe(gulpRename({extname: '.min.js'}))
    .pipe(gulp.dest('release/'));
  
};

const html = () => {
  return gulp.src('src/html/index.html')
    .pipe(gulp.dest('release/'));
};

const css = () => {
  return gulp.src('src/css/*.css')
    .pipe(gulpCSSlint('.csslintrc.json'))
    .pipe(gulpConcat('test02.css'))
//    .pipe(gulpCleanCSS())
    .pipe(gulpRename({extname: '.min.css'}))
    .pipe(gulp.dest('release/'));
};

exports.default = gulp.series(clean, javascript, html, css);

