import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('runServer', () => {
  return gulp.src('app.js')
    .pipe(babel())
    .pipe(gulp.dest('dest'));
});

