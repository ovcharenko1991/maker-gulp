let gulp = require('gulp');
let scss = require('gulp-sass');
let browser = require('browser-sync');
let babel = require('gulp-babel');
let rigger = require('gulp-rigger');
let autoprefixer = require('gulp-autoprefixer');
let imagemin = require('gulp-imagemin');
let imageminPngquant = require('imagemin-pngquant');


gulp.task('scss', function() {
	gulp.src('src/scss/**/*.scss')
		.pipe(scss())
		.pipe(gulp.dest('src/css'))
		.pipe(browser.stream());
})


gulp.task('watch', ['browser'], function() {
	gulp.watch('src/scss/**/*.scss', ['scss']);
	gulp.watch('src/index.html', ['rigger']);
	gulp.watch('src/**/*html', browser.reload);
	gulp.watch('src/js/*.js', ['script']);
	gulp.watch('src/css/*.css', ['autoprefixer']);
	// gulp.watch('src/images/*', ['imagemin']);
})


gulp.task('rigger', function () {
    gulp.src('src/index.html')
        .pipe(rigger())
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream: true}));
});


gulp.task('browser', function() {
	browser({
		server: {
			baseDir: 'src'
		},
		port: 4141,
		notify: false
	})
})


gulp.task('script', () =>
    gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('src/js/result'))
);


gulp.task('autoprefixer', () =>
    gulp.src('src/app.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
);


gulp.task('imagemin', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);


gulp.task("my", function () {
	console.log("УРА!")
})