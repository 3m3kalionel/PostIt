import gulp from 'gulp';
import babel from 'babel-core/register';
import nodemon from 'gulp-nodemon';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-babel-istanbul';
import injectModules from 'gulp-inject-modules';
import dotenv from 'dotenv';
import { Instrumenter } from 'isparta';


dotenv.config();

process.env.NODE_ENV = 'test';

gulp.task('coverage', (done) => {
  gulp.src(['server/**/*.js'])
    .pipe(istanbul({ instrumenter: Instrumenter }))
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
        .on('end', done);
    });
});

gulp.task('test', () => {
  return gulp.src(['test/postIttest.js'])
    .pipe(mocha({
      compilers: [
        'js:babel-core/register',
      ],
      timeout: 100000
    }));
});
