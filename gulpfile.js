const gulp = require('gulp');

const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default ;
const imagemin = require('gulp-imagemin');
const del = require('del');
const runSequence = require('run-sequence');


gulp.task('css',function(done){
    console.log('minifying css ');
    gulp.src('./assets/scss/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css/'));
    console.log('now return ');

    gulp.src('./assets/css/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/css/'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('js',function(done){
    console.log('compressing js ...');
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/js/'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('images',function(done){
    console.log('compressing images ...');
    gulp.src('./assets/**/*.+{png|jpg|jpeg}')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

// empty the public/assets
gulp.task('clean:assets',function(done){
    del.sync('./public/assets');
    done();
});

// task build to do all the above tasks 
gulp.task('build',gulp.series('clean:assets','css','js','images'),function(done){
    console.log('building tasks ...'); 
    done();
});
