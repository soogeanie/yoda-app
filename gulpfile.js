var gulp = require('gulp');
var concat = require('gulp-concat');

var VENDOR_CSS = [
  'node_modules/bootstrap/dist/css/bootstrap.min.css'
];

var VENDOR_JS = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/bootstrap/dist/js/bootstrap.min.js',
  'node_modules/handlebars/dist/handlebars.min.js',
  'node_modules/firebase/firebase-app.js',
  'node_modules/firebase/firebase-database.js'
];

var VENDOR_FONTS = [
  'node_modules/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}'
];

gulp.task('copy', function() {
  gulp.src(VENDOR_CSS)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('dist/css'));

  gulp.src(VENDOR_JS)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/js'));

  gulp.src(VENDOR_FONTS)
    .pipe(gulp.dest('dist/fonts'));
});
