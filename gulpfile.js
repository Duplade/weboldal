var st = require('st');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var http = require('http');
var plumber = require('gulp-plumber');
var css = require('gulp-css');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var cssSrc = 'css/*.css';
var cssDest = 'css/'; 

var comassConfig = {
    css: 'css/',
    img: 'img/',
    style: 'nested',
    cache: false,
    default: false
};

gulp.task('css', function() {
    gulp.src(cssSrc)
        .pipe(plumber())
        .pipe(css())
        .pipe(gulp.dest(cssDest))
        .pipe(reload({ stream: true }));
});

gulp.task('html', function() {
    gulp.src('./*.html')
        .pipe(reload({ stream: true}));
});

gulp.task('watch', ['server'], function() {
    livereload.listen(7070);
    gulp.watch('./*.html', livereload.changed);
    gulp.watch(cssSrc, ['css']);
});

gulp.task('server', function(done) {
    http.createServer(
        st({ path: __dirname, index: 'index.html', cache: false }))
        .listen(8080, done);
});

gulp.task('serve', ['css'], function() {
    browserSync({
        server: {
            baseDir: './'
        }
    });

    gulp.watch(cssSrc, ['css']);
    gulp.watch('./*.html', ['html']);
});

gulp.task('default', ['serve']);