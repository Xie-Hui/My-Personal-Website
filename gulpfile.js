const gulp                = require('gulp'),
      sass                = require('gulp-sass'),
      sourcemaps          = require('gulp-sourcemaps'),
      autoprefixer        = require('gulp-autoprefixer'),
      imagemin            = require('gulp-imagemin'),
      useref              = require('gulp-useref'),
      gulpif              = require('gulp-if'),
      uglify              = require('gulp-uglify'),
      babel               = require('gulp-babel'),
      uncss               = require('gulp-uncss'),
      browserSync         = require('browser-sync').create();
      del                 = require('del');

gulp.task('css', function(){
  return gulp.src([
            'src/sass/**/*.scss'
          ])
          .pipe(sourcemaps.init())
          .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
          .pipe(autoprefixer({
            browsers: ['last 2 versions']
          }))
          .pipe(sourcemaps.write('./maps'))
          .pipe(gulp.dest('dist/css'))
          .pipe(browserSync.stream())
});

gulp.task('uncss', function(){
  return gulp.src('src/sass/**/*.scss')
          .pipe(sourcemaps.init())
          .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
          .pipe(uncss({
            html: ['dist/index.html']
          }))
          .pipe(autoprefixer({
            browsers: ['last 2 versions']
          }))
          .pipe(sourcemaps.write('./maps'))
          .pipe(gulp.dest('dist/css'))
          .pipe(browserSync.stream())
});

gulp.task('copy', function(){
  return gulp.src('src/**/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', sourcemaps.init()))
    .pipe(gulpif('*.js', babel({presets: ["env"]})))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.js', sourcemaps.write('.')))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
});

gulp.task('vender', function(){
  return gulp.src('src/vender/*')
    .pipe(gulp.dest('dist/vender'))
});

gulp.task('images', function(){
  return gulp.src('src/img/**/*.+(png|jpg|gif|svg|ico)')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/img'))
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

gulp.task('clean', function() {
  return del.sync('dist');
})

gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
});

gulp.task('watch', ['browserSync', 'copy', 'images', 'fonts', 'vender', 'css'], function(){
  gulp.watch('src/sass/**/*.scss', ['css']);
  gulp.watch('src/**/*.+(html|js)', ['copy']);
  gulp.watch('src/img/**/*', ['images']);
})

gulp.task('build', [`clean`, 'copy', 'images', 'fonts', 'vender', 'css'], function (){
  console.log('Building files');
})
