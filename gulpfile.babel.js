import gulp from 'gulp';
import babel from 'babel-core/register';
import nodemon from 'gulp-nodemon';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-babel-istanbul';
import injectModules from 'gulp-inject-modules';

process.env.NODE_ENV = 'test';

gulp.task('start', () => {
  nodemon({
    script: 'index.js',
    env: { NODE_ENV: 'development' }
  });
});

gulp.task('coverage', (cb) => {
  gulp.src('src/**/*.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src('test/**/*.js')
        .pipe(mocha({
          compilers: [
            'js:babel-core/register',
          ]
        }))
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
        .on('end', cb);
    });
});

gulp.task('test', () => {
  return gulp.src(['test/postIttest.js'])
    .pipe(mocha({
      compilers: [
        'js:babel-core/register',
      ]
    }));
});
