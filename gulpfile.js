
// files for generate files prod
var dist = './assets';

// use packages
var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	cssnano = require('cssnano'),
	sourcemaps = require('gulp-sourcemaps'),
	changed = require('gulp-changed'),
	jscs = require('gulp-jscs');

// plugins postcss
var processors = [
	autoprefixer({browsers: ['> 3%', 'last 2 versions', 'ie 9', 'ios 6', 'android 4']}),
	cssnano(),
];

gulp.task('default', function() {

	return gulp.src('./src/*.css')
		.pipe(plumber())
		.pipe(changed(dist + '/css'))
		.pipe(sourcemaps.init())
		.pipe(postcss(processors))
		.pipe(jscs())
		.pipe(jscs.reporter())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dist + '/css'))
});