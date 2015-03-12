/**
 * Created by yaoyao on 15/3/13.
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('min', function () {
    gulp.src("./select-birthday.js")
        .pipe(uglify())
        .pipe(rename('select-birthday.min.js'))
        .pipe(gulp.dest("./"));
});