var gulp = require('gulp');
var sass = require('gulp-sass');
// var browserSync = require('browser-sync').create();
// var reload = browserSync.reload;

gulp.task('default', ['watch']);

gulp.task('sass', function () {
  return gulp
    .src('./src/styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function() {
   gulp.watch('./src/styles/*.scss', ['sass']);
});
