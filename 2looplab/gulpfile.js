// questions


const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')


// compile sass
gulp.task('sass', function () {
    console.log('recompile sass');
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});



// move js
gulp.task('js', function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/tether/dist/js/tether.min.js'
        ])
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream());
});


// move font-awesome to src
gulp.task('fonts', function () {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('src/fonts'));
});

// move font-awesome css files
gulp.task('fa', function () {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('src/css'));
});

// watch and serve
gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: "./src"
    });

    // watch files, when changed, call the undertaker task.
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});



gulp.task('default', ['js', 'serve', 'fa', 'fonts'])