var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var ejs = require("gulp-ejs");
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

/**************************************************
Clean Tasks
***************************************************/
gulp.task('clean-html', function () {
	return gulp.src('build/**/*.html', {read: false})
		.pipe(clean());
});

gulp.task('clean-styles', function () {
	return gulp.src('build/styles', {read: false})
		.pipe(clean());
});

gulp.task('clean-scripts', function () {
	return gulp.src('build/scripts', {read: false})
		.pipe(clean());
});

/**************************************************
Process Tasks
***************************************************/
gulp.task('html', ['clean-html'], function(){
	return gulp.src("src/index.ejs")
	.pipe(ejs())
	.pipe(gulp.dest("build"))
	.pipe(browserSync.stream());
});

gulp.task('styles', ['clean-styles'], function(){
	return gulp.src('src/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest('build'))
		.pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('scripts', ['clean-scripts'], function(){
	return gulp.src('src/**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(ts({
			noImplicitAny: true
		}))
		.pipe(uglify())
		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest('build'))
		.pipe(browserSync.stream());
});

/**************************************************
BrowserSync
***************************************************/
gulp.task('browser-sync', ['html', 'styles', 'scripts'], function() {
    browserSync.init({
        server: {
            baseDir: "build"
        },
        open: false // Don't automatically open a new window
    });

    gulp.watch('src/**/*.ejs', ['html']);
	gulp.watch('src/styles/**/*', ['styles']);
	gulp.watch('src/scripts/**/*', ['scripts']);
});

/**************************************************
Gulp Tasks
***************************************************/
gulp.task('default', ['browser-sync']);
