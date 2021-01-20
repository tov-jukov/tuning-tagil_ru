var syntax = 'sass'; // Syntax: sass or scss;

var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    cleancss     = require('gulp-clean-css'),
    rename       = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    notify       = require('gulp-notify'),
    rsync        = require('gulp-rsync');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false,
        open: false,
        // online: false, // Work Offline Without Internet Connection
        // port: 9000,
        // tunnel: true, tunnel: "tuning-tagil", // Demonstration page: http://projectname.localtunnel.me
    })
});

gulp.task('styles', function() {
    return gulp.src('app/' + syntax + '/**/*.' + syntax + '')
        .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer(['last 20 versions'])) //15
        .pipe(cleancss({ level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream())
});

gulp.task('js', function() {
    return gulp.src([
            'app/libs/jquery/dist/jquery.min.js',
            // 'app/libs/html5shiv/dist/html5shiv.min.js',
            // 'app/libs/MasonJS/dist/mason.min.js',
            // 'app/libs/mosaic/js/mosaic.js',
            'app/libs/photoswipe/dist/photoswipe.js',
            'app/libs/photoswipe/dist/photoswipe-ui-default.js',
            'app/libs/justifiedGallery/dist/js/jquery.justifiedGallery.min.js',
            'app/libs/twentytwenty/js/jquery.event.move.js',
            'app/libs/twentytwenty/js/jquery.twentytwenty.js',
            // 'app/libs/jquery.montage/jquery.montage.js',
            'app/libs/smartlid/smartlid.js',
            // 'app/libs/jquery-accordion/js/jquery.accordion.js',
            'app/js/common.js' // Always at the end
        ])
        .pipe(concat('scripts.min.js'))
        // .pipe(uglify()) // Mifify js (opt.)
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('rsync', function() {
    return gulp.src('app/**')
        .pipe(rsync({
            root: 'app/',
            hostname: 'username@yousite.com',
            destination: 'yousite/public_html/',
            // include: ['*.htaccess'], // Includes files to deploy
            exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
            recursive: true,
            archive: true,
            silent: false,
            compress: true
        }))
});

// gulp.task('watch', ['styles', 'js', 'browser-sync'], function() {
//     gulp.watch('app/' + syntax + '/**/*.' + syntax + '', ['styles']);
//     gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
//     gulp.watch('app/*.html', browserSync.reload)
// });

// gulp.task('default', ['watch']);

gulp.task('watch', function() {
        gulp.watch('app/' + syntax + '/**/*.' + syntax + '', gulp.parallel ('styles'));
        gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel ('js'));
        gulp.watch('app/*.html', browserSync.reload)
    });

    gulp.task('default', gulp.parallel('watch', 'styles', 'js', 'browser-sync') );
