const gulp = require('gulp')
const runSequence = require('run-sequence')
const browserSync = require('browser-sync').create()
const ghpages = require('gh-pages')

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
})

gulp.task('watch', ['browserSync'], function () {
  gulp.watch('src/css/*.css', browserSync.reload)
  gulp.watch('dist/*.html').on('change', browserSync.reload)
  gulp.watch('src/js/*.js', browserSync.reload)
})

gulp.task('deploytopages', function () {
  ghpages.publish('dist', function (err) { console.log(err) })
})

gulp.task('deploy', function (callback) {
  runSequence(['build'], 'deploytopages',
    callback
  )
})
