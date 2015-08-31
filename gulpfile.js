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


gulp.task('clean', function () {
	return gulp.src('build', {read: false})
		.pipe(clean());
});

gulp.task('html', ['clean'], function(){
	return gulp.src("src/**/*.ejs")
	.pipe(ejs())
	.pipe(gulp.dest("build"));
});

gulp.task('styles', ['clean'], function(){
	return gulp.src('src/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest('build'));
});

gulp.task('scripts', ['clean'], function(){
	return gulp.src('src/**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(ts({
			noImplicitAny: true
		}))
		.pipe(uglify())
		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest('build'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: ""
        }
    });
});


// Lists of tasks
var devTasks = ['html', 'styles', 'scripts', 'browser-sync'];

gulp.task('watch', function () {
	gulp.watch('src/**/*', devTasks);
});


gulp.task('default', devTasks);
