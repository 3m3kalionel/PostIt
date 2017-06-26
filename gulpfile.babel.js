import gulp from 'gulp';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';

gulp.task('start', () => {
  nodemon({
    script: 'index.js',
    env: { NODE_ENV: 'development' }
  });
});

