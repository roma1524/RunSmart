const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');


// Static server
gulp.task('server', function () {   // Запускаем локальный сервер
  browserSync.init({
    server: {
      baseDir: "src"  // Папка, которую будет подхватывать gulp
    }
  });
});

// gulp.task('server', function () {   // Запускаем локальный сервер
//   browserSync({
//     server: {
//       baseDir: "dist"  // Папка, которую будет подхватывать gulp
//     }
//   });
//   gulp.watch("src/*+.html").on('change', browserSync.reload);
// });

gulp.task('styles', function () {
  return gulp.src("src/sass/**/*.+(scss|sass)")  // берём любой файл с расширением cscc или sasss
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))  // А тут мы его уже компилируем+сжимает и в случае ошибки, подскажет, где она
    .pipe(rename({   // Используем плагин rename
      suffix: ".min",
      prefix: ""
    }))
    .pipe(autoprefixer())  // Используем плагин autoprefixer
    .pipe(cleanCSS({compatibility: 'ie8'}))   // Используем плагин cleanCSS
    .pipe(gulp.dest('src/css'))  // После этого мы кладём файл по пути src/css
    // .pipe(gulp.dest('dist/css'))  // После этого мы кладём файл по пути src/css
    .pipe(browserSync.stream());  // После изменений, обновляем страницу командой
});

gulp.task('watch', function () {
  gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles')) // Отслеживаем изменения в этом файле, после чего, запускаем таск 'styles'
  // gulp.watch("src/*.html", gulp.parallel('styles')) // Отслеживаем изменения в этом файле, после чего, обновляем страницу
  gulp.watch("src/*+.html").on('change', gulp.parallel('html')); // При изменении файла в папке scr, запускается задача HTML
});

gulp.task('html', () => {
  return gulp.src("src/*.html")  // Получаем измен файл
    .pipe(htmlmin({collapseWhitespace: true}))  // Применяем плагин htmlmin
    .pipe(gulp.dest("dist/"))  // После, полученный и обработанный файл кладём в папку dist
});

gulp.task('scripts', () => {
  return gulp.src("src/js/**/*.js")  // Получаем измен файл
    .pipe(gulp.dest("dist/js"))  // После, полученный и обработанный файл кладём в папку dist
});

gulp.task('fonts', () => {
  return gulp.src("src/js/fonts/*")  // Получаем измен файл
    .pipe(gulp.dest("dist/fonts"))  // После, полученный и обработанный файл кладём в папку dist
});

gulp.task('icons', () => {
  return gulp.src("src/icons/**/*")  // Получаем измен файл
    .pipe(gulp.dest("dist/icons"))  // После, полученный и обработанный файл кладём в папку dist
});

gulp.task('mailer', () => {
  return gulp.src("src/mailer/**/*")  // Получаем измен файл
    .pipe(gulp.dest("dist/mailer"))  // После, полученный и обработанный файл кладём в папку dist
});

gulp.task('images', () => {
  return gulp.src("src/img/**/*")  // Получаем измен файл
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))  // После, полученный и обработанный файл кладём в папку dist
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'mailer', 'images', 'html')); // Выполняется при команде gulp