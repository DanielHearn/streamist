const gulp = require('gulp')
const useref = require('gulp-useref')
const del = require('del')
const runSequence = require('run-sequence')
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin')
const gulpIf = require('gulp-if')
const browserSync = require('browser-sync').create()
const ghpages = require('gh-pages')

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
})

gulp.task('useref', function () {
  return gulp.src('src/**/*.+(png|jpg|jpeg|gif|svg|ico|xml|json)')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
})

gulp.task('images', function () {
  return gulp.src('src/img/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/img'))
})

gulp.task('favicons', function () {
  return gulp.src('src/favicons/*.+(png|jpg|jpeg|gif|svg|ico|xml|json)')
    .pipe(gulpIf('*.+(png|jpg|jpeg|gif|svg)', cache(imagemin())))
    .pipe(gulp.dest('dist/favicons'))
})

gulp.task('clean:dist', function () {
  return del.sync(['dist/**/*'])
})

gulp.task('watch', ['browserSync'], function () {
  gulp.watch('src/css/*.css', browserSync.reload)
  gulp.watch('dist/*.html').on('change', browserSync.reload)
  gulp.watch('src/js/*.js', browserSync.reload)
})

gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['images', 'favicons'], 'useref',
    callback
  )
})

gulp.task('default', function (callback) {
  runSequence(['pug', 'sass'], 'watch',
    callback
  )
})

gulp.task('deploytopages', function () {
  ghpages.publish('dist', function (err) { console.log(err) })
})

gulp.task('deploy', function (callback) {
  runSequence(['build'], 'deploytopages',
    callback
  )
})
