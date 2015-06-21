var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var stylish = require('jshint-stylish');
var webpack = require('webpack');
var minifyCss = require('gulp-minify-css');

gulp.task('clean', function(cb) {
    del([
        'dist/**/*.*'
    ], cb);
});

gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe($.plumber())
        .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function() {
    gulp.src('./node_modules/bootstrap/fonts/**/*.{ttf,woff,woff2,eof,svg}')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('images', function() {
    gulp.src('./src/img/**/*.*')
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('styles', ['fonts', 'images'], function() {
    return gulp.src('src/main.less')
        .pipe($.less())
        .pipe($.autoprefixer())
        .pipe($.rename('style.css'))
        .pipe($.sourcemaps.init({ loadMaps: true }))
        .pipe(minifyCss())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function(cb) {
    webpack({
        entry: './src/main.js',
        output: {
            path: 'dist',
            filename: "app.js"
        },
        module: {
            loaders: [
                {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
                {
                    test: /\.hbs$/,
                    exclude: /node_modules/,
                    loader: 'handlebars-loader'//,
                    //query: {
                    //    helperDirs: [
                    //        __dirname + "/templates/helpers"
                    //    ]
                    //}
                }
            ]
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({minimize: true}),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            })
        ],
        devtool: '#source-map'
    }, function (err, stats) {
        if (err) {
            cb(new $.util.PluginError('webpack', err));
            return;
        }
        $.util.log('[webpack]', stats.toString({}));
        cb();
    });
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
    'scripts',
    'test'
]);

gulp.task('test', [
    'jshint',
    'mocha'
]);

gulp.task('default', ['build']);