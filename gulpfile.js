var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('default', ['watch']);

gulp.task('sass', function () {
  return gulp
    .src('./src/styles/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('js-concat', function(){
  return gulp
    .src('./src/scripts/**/*.js')
    .pipe(concat('concat.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watch', function() {
   gulp.watch('./src/styles/**/*.scss', ['sass']),
   gulp.watch('./src/scripts/**/*.js', ['js-concat']);
});
