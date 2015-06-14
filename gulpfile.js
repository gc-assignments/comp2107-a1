var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');

gulp.task('stylus', function() {
  return gulp.src('./src/style.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

gulp.task('jade', function() {
  return gulp.src('./src/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

gulp.task('script', function() {
  return gulp.src('./src/script.js')
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['stylus', 'jade'], function() {
  browserSync.init({
    server: "./"
  });

  gulp.watch('src/*.styl', ['stylus']);
  gulp.watch('src/*.jade', ['jade']);
  gulp.watch('src/script.js', ['script']);
  gulp.watch('./index.html').on('change', browserSync.reload);
  gulp.watch('./dist/style.css').on('change', browserSync.reload);
  gulp.watch('./dist/script.js').on('change', browserSync.reload);

});

gulp.task('default', ['serve']);