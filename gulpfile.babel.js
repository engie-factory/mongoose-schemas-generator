import gulp from 'gulp';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import rimraf from 'gulp-rimraf';
import nodemon from 'gulp-nodemon';

const srcFiles = [
  'src/*.js',
  'src/helpers/*.js'
];

const allFiles = [
  '*.js',
  ...srcFiles,
  'test/**/*.js'
];

gulp.task('lint', () => gulp.src(allFiles)
  // eslint() attaches the lint output to the "eslint" property
  // of the file object so it can be used by other modules.
  .pipe(eslint())
  // eslint.format() outputs the lint results to the console.
  // Alternatively use eslint.formatEach() (see Docs).
  .pipe(eslint.format())
  // To have the process exit with an error code (1) on
  // lint error, return the stream and pipe to failAfterError last.
  .pipe(eslint.failAfterError()));

// clean folder task
gulp.task('clean', () => gulp.src(['dist'], { read: false })
  .pipe(rimraf({
    force: true
  })));

// copy package.json to dist folder
gulp.task('copy', ['clean'], () => gulp.src('package.json')
  .pipe(gulp.dest('dist')));

// clean and build
gulp.task('build', ['copy'], () => gulp.src(srcFiles)
  .pipe(
    babel({
      presets: ['es2015']
    }))
  .pipe(gulp.dest('dist')));

// watch files changes
gulp.task('watch', () => {
  gulp.watch(allFiles, ['lint']);
});

// run main script with watch on src files
gulp.task('nodemon', ['build'], () => {
  nodemon({
    tasks: ['build'],
    script: 'dist/index.js',
    ext: 'js html json',
    watch: [...srcFiles],
    ignore: ['test/**/*'],
    env: {
      NODE_ENV: 'development'
    }
  });
});
