import gulp from 'gulp';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';

gulp.task('start', () => {
  nodemon({
    script: 'dest/app.js',
    env: { NODE_ENV: 'development' }
  });
});

gulp.task('runServer', () => {
  return gulp.src('app.js')
    .pipe(babel())
    .pipe(gulp.dest('dest'));
});

gulp.task('watch', () => {
  gulp.watch('app.js', ['runServer']);
});

gulp.task('default', ['start', 'runServer', 'watch']);
