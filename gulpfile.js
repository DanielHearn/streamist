var gulp = require('gulp');
var uncss = require('gulp-uncss');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var del = require('del');
var runSequence = require('run-sequence');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var gulpIf = require('gulp-if');
var browserSync = require('browser-sync').create();

const scssSource = 'app/style/scss/*.scss';
const cssDest = 'app/style/css';

gulp.task('sass', function(){
  return gulp.src(scssSource) // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(uncss({
        html: ['app/index.html']
    }))
    .pipe(gulp.dest(cssDest))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
})

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify({ mangle: false })))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('app/img/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin()))
  .pipe(gulp.dest('dist/img'))
});


gulp.task('favicons', function(){
  return gulp.src('app/favicons/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin()))
  .pipe(gulp.dest('dist/favicons'))
});

gulp.task('watch', ['browserSync', 'sass', 'useref', 'images', 'favicons'], function (){
  gulp.watch(scssSource, ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/*.js', browserSync.reload);
})

gulp.task('default', function (callback) {
  runSequence(['watch'],
    callback
  )
})
