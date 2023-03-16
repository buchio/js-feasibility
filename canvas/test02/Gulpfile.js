const gulp = require("gulp");

const gulpBabel = require("gulp-babel");
const gulpClean = require("gulp-clean");
const gulpCleanCSS = require("gulp-clean-css");
const gulpConcat = require("gulp-concat");
const gulpCSSlint = require("gulp-csslint");
const gulpEslint = require("gulp-eslint");
const gulpRename = require("gulp-rename");
const gulpStripImportExport = require("gulp-strip-import-export");
const gulpUglify = require("gulp-uglify");
const browserify = require("browserify");
const vinylSourceStream     = require("vinyl-source-stream");
const vinylBuffer     = require("vinyl-buffer");

const jsSources = "src/js/*.js";
const cssSources = "src/css/*.css";

const clean = () => {
  return gulp.src("dist/", {allowEmpty:true})
    .pipe(gulpClean());
};

const jsBase = ( release ) => {
  let js = browserify("src/js/test02.js")
      .bundle()
      .pipe(vinylSourceStream("test02.js"))
      .pipe(vinylBuffer())
      //.pipe(gulpEslint({useEslintrc: true}))
      //.pipe(gulpEslint.format())
      //.pipe(gulpEslint.failAfterError())
      //.pipe(gulpStripImportExport())
      //.pipe(gulpBabel({presets: ["@babel/env"]}))
  if ( release ) {
    js = js.pipe(gulpUglify())
      .pipe(gulpRename({extname: ".min.js"}))
      .pipe(gulp.dest("dist/release/"));
  } else {
    js = js.pipe(gulpRename({extname: ".js"}))
      .pipe(gulp.dest("dist/dev/"));
  }
  return js;
}

const jsRelease = () => {
  return jsBase(true);
};

const jsDev = () => {
  return jsBase(false);
};

const cssRelease = () => {
  return gulp.src("src/css/*.css")
    .pipe(gulpCSSlint(".csslintrc.json"))
    .pipe(gulpConcat("test02.css"))
    .pipe(gulpCleanCSS())
    .pipe(gulpRename({extname: ".min.css"}))
    .pipe(gulp.dest("dist/release/"));
};

const cssDev = () => {
  return gulp.src("src/css/*.css")
    .pipe(gulpCSSlint(".csslintrc.json"))
    .pipe(gulpConcat("test02.css"))
    .pipe(gulpRename({extname: ".css"}))
    .pipe(gulp.dest("dist/dev/"));
};

const htmlRelease = () => {
  return gulp.src("src/html/release/index.html")
    .pipe(gulp.dest("dist/release/"));
};

const htmlDev = () => {
  return gulp.src("src/html/dev/index.html")
    .pipe(gulp.dest("dist/dev/"));
};

exports.default = gulp.series(
  clean,
  gulp.parallel(
    jsRelease,
    cssRelease,
    htmlRelease,
    jsDev,
    cssDev,
    htmlDev,
  ));

exports.dev = gulp.series(
  clean,
  gulp.parallel(
    jsDev,
    cssDev,
    htmlDev,
  ));


