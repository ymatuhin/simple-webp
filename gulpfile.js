/* File: gulpfile.js */

// собираем все наши плагины
var gulp  = require('gulp');
var clean = require('gulp-clean');

var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');

gulp.task('compress', function () {
    gulp.src('lib/**/*.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy', ['clean'], function() {
  return gulp.src('lib/webpjs.js')
    .pipe(gulp.dest('dist'));
});


gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
      .pipe(clean());
});


// создаем задачку, которая будет выполняться по умолчанию
gulp.task('default', ['copy', 'compress'], function() {
  // return gutil.log('Gulp is running!')
});
