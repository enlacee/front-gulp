// files js scss img fonts source dev
var src = './src';

// files for generate files prod
var dist = './assets';

// my scripts: load all default
var scripts = [
	src + '/js/**/*.js'
];

// use packages
var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	cssnano = require('cssnano'),
	sourcemaps = require('gulp-sourcemaps'),
	changed = require('gulp-changed');

// plugins postcss
var processors = [
	autoprefixer({browsers: ['> 3%', 'last 2 versions', 'ie 9', 'ios 6', 'android 4']}),
	cssnano(),
];

gulp.task('css:dev', function() {

	return gulp.src(src + '/scss/app.scss')
		.pipe(plumber())
		//.pipe(changed(dist + '/css/')) // obs
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(postcss(processors))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dist + '/css/'));
});


// minify mainjs
gulp.task('mainjs', function(){
	gulp.src(scripts)
	.pipe(plumber())
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest(dist + '/js'));
});


// task js
gulp.task('js', ['mainjs'])

// build
gulp.task('build', ['css:dev', 'js']);

// dev
gulp.task('default', ['build']);