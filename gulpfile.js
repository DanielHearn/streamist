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

const scssSource = 'app/scss/*.scss';
const cssDest = 'app/css';

gulp.task('sass', function() {
  return gulp.src(scssSource)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(cssDest))
    .pipe(browserSync.stream());
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

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
  return gulp.src('app/favicons/*.+(png|jpg|jpeg|gif|svg|ico|xml|json)')
  .pipe(gulpIf('*.+(png|jpg|jpeg|gif|svg)', cache(imagemin())))
  .pipe(gulp.dest('dist/favicons'))
});

gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*']);
});

gulp.task('watch', ['browserSync', 'sass', 'images', 'favicons'], function (){
  gulp.watch(scssSource, ['sass']);
  gulp.watch('app/*.html').on('change', browserSync.reload);
  gulp.watch('app/js/*.js', browserSync.reload);
})

gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['sass', 'useref', 'images', 'favicons'],
    callback
  )
})

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
})
