/*-------------------------------------------------------------------
    Required plugins
-------------------------------------------------------------------*/
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

/*-------------------------------------------------------------------
    Tasks
-------------------------------------------------------------------*/
// Compile sass into CSS
gulp.task('style', function() {
    gulp.src('scss/**/*.scss')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('css'))
    .pipe(notify({ message: 'Compiled <%= file.relative %> style.' }));
});

// Concatenate & Minify JS
gulp.task('script', function() {
    gulp.src(['javascript/**/*.js', '!javascript/**/*.min.js'])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(uglify())
    .pipe(rename(function (path) {
        path.basename += ".min"
    }))
    .pipe(gulp.dest('javascript'))
    .pipe(notify({ message: 'Compiled <%= file.relative %> script.' }));
});

// Watch
gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch('scss/**/*.scss', ['style']);

    // Watch .js files
    gulp.watch(['javascript/**/*.js', '!javascript/**/*.min.js'], ['script']);
});

gulp.task('default', ['style', 'script', 'watch']);
