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

const scssSource = 'src/scss/*.scss';
const cssDest = 'src/css';

gulp.task('sass', function() {
  return gulp.src(scssSource)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(cssDest))
    .pipe(browserSync.stream());
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
});

gulp.task('useref', function(){
  return gulp.src('src/*.html')
    .pipe(useref())
    //.pipe(gulpIf('*.js', uglify({ mangle: false })))
    .pipe(gulpIf('*.js', gulp.dest('dist')))
    .pipe(gulpIf('*.css', cssnano({zindex: false})))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('src/img/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/img'))
});

gulp.task('favicons', function(){
  return gulp.src('src/favicons/*.+(png|jpg|jpeg|gif|svg|ico|xml|json)')
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

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch(scssSource, ['sass']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
  gulp.watch('src/js/*.js', browserSync.reload);
})

gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['sass', 'images', 'favicons'], 'useref',
    callback
  )
})

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
})

gulp.task('deploy', function() {
  ghpages.publish('dist', function(err) {});
});
