var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var ejs = require("gulp-ejs");
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

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
Development Tasks
***************************************************/
gulp.task('html', ['clean-html'], function(){
	return gulp.src("src/index.ejs")
	.pipe(ejs())
	.pipe(gulp.dest("build"))
	.pipe(browserSync.stream());
});

gulp.task('styles', ['clean-styles'], function(){
	return gulp.src('src/styles/app.scss')
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest('build/styles'))
		.pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('scripts', ['clean-scripts'], function(){
	return babel_watch();
});

/**************************************************
Production Tasks
***************************************************/
gulp.task('html-production', ['clean-html'], function(){
	return gulp.src("src/index.ejs")
	.pipe(ejs())
	.pipe(gulp.dest("build"))
});

gulp.task('styles-production', ['clean-styles'], function(){
	return gulp.src('src/styles/app.scss')
		.pipe(autoprefixer())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest('build/styles'))
});

gulp.task('scripts-production', ['clean-scripts'], function(){
	return browserify("./src/scripts/app.js", {debug:false})
  		.transform("babelify", {presets: ["es2015", "react"]})
  		.bundle()
		.on('error', function(err) { console.error(err); this.emit('end'); })
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('./build/scripts'));
});

/**************************************************
Browserify and Babel Bundling
***************************************************/
function compile(babel_watch) {
	var bundler = watchify(browserify('./src/scripts/app.js', {debug: true})
		.transform(babelify, {presets: ["es2015", "react"]}));

	function rebundle() {
		bundler.bundle()
		.on('error', function(err) { console.error(err); this.emit('end'); })
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./build/scripts'))
		.pipe(browserSync.stream());
	}

	if (babel_watch) {
		bundler.on('update', function() {
			//console.log('-> bundling...');
			rebundle();
		});
	}

	rebundle();
}

function babel_watch() {
	return compile(true);
};

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
	//gulp.watch('src/scripts/**/*', ['scripts']);
});

/**************************************************
Gulp Tasks
***************************************************/
gulp.task('default', ['browser-sync']);
gulp.task('production', ['html-production', 'styles-production', 'scripts-production']);
