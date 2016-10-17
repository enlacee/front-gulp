// globals
// vars use bower
var bower = './bower_components';

// files js scss img fonts source dev
var src = './src';

// files for generate files prod
var dist = './assets';

// var proxy
var proxyUrl = 'local.noticiasdelperu.net';
var localPort = 8080;

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
	changed = require('gulp-changed'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload;

// plugins postcss
var processors = [
	autoprefixer({browsers: ['> 3%', 'last 2 versions', 'ie 9', 'ios 6', 'android 4']}),
	cssnano(),
];

gulp.task('styles:dev', function() {

	return gulp.src(src + '/scss/app.scss')
		.pipe(plumber())
		.pipe(changed(dist + '/css/'))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(postcss(processors))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dist + '/css/'))
		.pipe(browserSync.stream());
});


// minify mainjs
gulp.task('mainjs', function(){
	gulp.src(scripts)
	.pipe(plumber())
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest(dist + '/js'));
});

// serve
gulp.task('serve', function(){
	browserSync.init({
		proxy: proxyUrl,
		port: localPort
	});

	//gulp.watch(src + '/scss/app.scss', ['styles:dev']);
	gulp.watch([
		bower + '/bootstrap-sass/assets/stylesheets/**/*.scss',
		src + '/scss/**/*.scss'],
		['styles:dev']
	);

	//gulp.watch(src + '/js/**/*.js', ['mainjs']).on('change', reload);
	//gulp.watch(src + '/**/*(*.png|*.jpg|*.jpeg|*.gif|*.svg)').on('change', reload);
	gulp.watch('./**/*.html').on('change', reload);
});

// task js
gulp.task('js', ['mainjs'])

// build
gulp.task('build', ['styles:dev', 'js']);

// dev
gulp.task('default', ['build']);