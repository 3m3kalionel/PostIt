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
  gulp.src(['server/controllers/users.js', '!server/migrations/*.js'])
    .pipe(istanbul({ includeUntested: true }))
    .on('finish', () => {
      gulp.src('test/usertests.js')
        .pipe(mocha({
          compilers: [
            'js:babel-core/register',
          ]
        }))
        .pipe(istanbul.writeReports())
        .on('end', done);
    });
});

gulp.task('test', () => {
  return gulp.src(['test/usertests.js'])
    .pipe(mocha({
      compilers: [
        'js:babel-core/register',
      ],
      timeout: 100000
    }));
});
