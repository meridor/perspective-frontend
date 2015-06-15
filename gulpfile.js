var gulp = require('gulp');
var babelify = require('babelify');
var uglify = require('gulp-uglify'); //TODO: use this somehow
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var del = require('del');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var stylish = require('jshint-stylish');
var buffer = require('vinyl-buffer');
var _ = require('lodash');
var concat = require('gulp-concat');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('clean', function(cb) {
    del([
        'app/tmp'
    ], cb);
});

gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe($.plumber())
        .pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
    return gulp.src('src/main.less')
        .pipe($.less())
        .pipe($.autoprefixer())
        .pipe($.rename('style.css'))
        .pipe(gulp.dest('dist'))
        .pipe(reload({ stream: true }));
});

gulp.task('fonts', function() {
    gulp.src('./node_modules/bootstrap/fonts/**/*.{ttf,woff,woff2,eof,svg}')
        .pipe(gulp.dest('./dist/fonts'));
});

var bundler = _.memoize(function(watch) {
    var options = {debug: true};

    if (watch) {
        _.extend(options, watchify.args);
    }

    var b = browserify('./src/main.js', options)
        .transform(babelify);

    if (watch) {
        b = watchify(b);
    }

    return b;
});

var handleErrors = function() {
    var args = Array.prototype.slice.call(arguments);
    delete args[0].stream;
    $.util.log.apply(null, args);
    this.emit('end');
};

var bundle = function (cb, watch) {
    return bundler(watch)
        .bundle()
        .on('error', handleErrors)
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe($.sourcemaps.init({ loadMaps: true }))
        .pipe(concat('app.js'))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .on('end', cb)
        .pipe(reload({ stream: true }));
}

var watchifyEnabled = false;

gulp.task('scripts', function(cb) {
    process.env.BROWSERIFYSWAP_ENV = 'dist';
    bundle(cb, watchifyEnabled);
});

gulp.task('jshint', function() {
    return gulp.src(['src/**/*.js', 'test/**/*.js'])
        .pipe($.plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter(stylish));
});

var reporter = 'spec';

gulp.task('mocha', ['jshint'], function() {
    return gulp.src([
        'test/unit/*.js'
    ], { read: false })
        .pipe($.plumber())
        .pipe($.mocha({ reporter: reporter }));
});

gulp.task('build', [
    'clean',
    'html',
    'styles',
    'fonts',
    'scripts',
    'test'
]);

gulp.task('test', [
    'jshint',
    'mocha'
]);

gulp.task('watch', ['build'], function () {
    watchifyEnabled = true;
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });

    reporter = 'dot';
    bundler(true).on('update', function() {
        gulp.start('scripts');
        gulp.start('test');
    });
    gulp.watch('test/**/*.js', ['test']);
    gulp.watch(['src/main.less', 'src/**/*.less'], ['styles']);
    gulp.watch(['src/*.html'], ['html']);
});

gulp.task('default', ['build']);