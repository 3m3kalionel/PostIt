import gulp from 'gulp';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-babel-istanbul';
import injectModules from 'gulp-inject-modules';
import dotenv from 'dotenv';

dotenv.config();

process.env.NODE_ENV = 'test';

gulp.task('coverage', (cb) => {
  gulp.src('src/**/*.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src('test/**/*.js')
        .pipe(babel())
        .pipe(injectModules())
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
        .on('end', cb);
    });
});
