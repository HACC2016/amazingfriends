var gulp = require('gulp');
var sass = require('gulp-sass');
var $ = require('gulp-load-plugins')();
var autoprefixer = require('gulp-autoprefixer');

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

// keeps gulp from crashing for scss errors
gulp.task('sass', function () {

  return gulp.src('./scss/*.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./compartments/assets/styles'));
});

gulp.task('watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('default', ['watch', 'sass']);
