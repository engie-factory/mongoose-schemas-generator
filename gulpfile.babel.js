import gulp from 'gulp';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import rimraf from 'gulp-rimraf';
import nodemon from 'gulp-nodemon';

const allFiles = [
  '*.js',
  'src/*.js',
  'src/helpers/*.js',
  'src/structs/*.js',
  'src/generators/*.js',
  'test/*.js'
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
gulp.task('copy', ['clean'], () => {
  gulp.src(['package.json']).pipe(gulp.dest('dist'));
  gulp.src(['src/templates/*.jst']).pipe(gulp.dest('dist/templates'));
});

// clean and build
gulp.task('build', ['copy'], () => {
  const presets = { presets: ['es2015'] };
  gulp.src(['src/*.js']).pipe(babel(presets)).pipe(gulp.dest('dist'));
  gulp.src(['src/helpers/*.js']).pipe(babel(presets)).pipe(gulp.dest('dist/helpers'));
  gulp.src(['src/structs/*.js']).pipe(babel(presets)).pipe(gulp.dest('dist/structs'));
  gulp.src(['src/generators/*.js']).pipe(babel(presets)).pipe(gulp.dest('dist/generators'));
});

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
    watch: [...allFiles],
    ignore: ['test/**/*'],
    env: {
      NODE_ENV: 'development'
    }
  });
});
