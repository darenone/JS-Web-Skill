var gulp = require('gulp');
var gutil = require('gulp-util');

//格式化错误信息
var combiner = require('stream-combiner2')
var handleError = function(err) {
    var colors = gutil.colors;
    // console.log(err)
    console.log('\n')
    gutil.log(colors.red('Error!'))
    gutil.log('fileName: ' + colors.red(err.fileName))
    gutil.log('lineNumber: ' + colors.red(err.lineNumber))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + colors.yellow(err.plugin))
}

//压缩js
var uglify = require('gulp-uglify');
var watchPath = require('gulp-watch-path')
var sourcemaps = require('gulp-sourcemaps')
gulp.task('gulifyjs', function() {
    gulp.watch('src/assets/js/**/*.js', function(event) {
        var paths = watchPath(event, 'src/assets/', 'dist/')
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist' + paths.distPath)
        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            sourcemaps.init(),
            uglify(),
            sourcemaps.write('./'),
            gulp.dest(paths.distDir)
        ])
        combined.on('error', handleError)
    }) 
});

// 一次性压缩所有js
gulp.task('gulifyalljs', function () {
    var combined = combiner.obj([
        gulp.src('src/assets/js/**/*.js'),
        sourcemaps.init(),
        uglify(),
        sourcemaps.write('./'),
        gulp.dest('dist/js/')
    ])
    combined.on('error', handleError)
})
gulp.watch('src/assets/js/**/*.js', ['gulifyalljs'])

// 合并js文件
var concat = require('gulp-concat')
gulp.task('concatjs', function () {
    var combined = combiner.obj([
        gulp.src(['src/dist/js/a.js', 'src/dist/js/b.js']),
        concat('ab.js'), // 合并成新的ab.js文件
        gulp.dest('dist/js/') // 合并后的文件放到dist/js文件夹内
    ])
    combined.on('error', handleError)
})

//压缩css
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
gulp.task('gulifycss', function() {
    gulp.watch('src/assets/css/**/*.css', function (event) {
        var paths = watchPath(event, 'src/assets/', 'dist/')
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)
        gulp.src(paths.srcPath)
            .pipe(sourcemaps.init())
            .pipe(autoprefixer({
                browsers: ['last 2 versions', 'Android >= 4.0'],
                cascade: true, // 美化属性
                remove: true
            }))
            .pipe(minifycss())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(paths.distDir))
    })
});

// 一次性压缩所有css
gulp.task('gulifyallcss', function () {
    gulp.src('src/assets/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, // 美化属性
            remove: true
        }))
        .pipe(minifycss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css/'))
})
gulp.watch('src/assets/css/**/*.css', ['gulifyallcss'])

// 编译less
var less = require('gulp-less')
gulp.task('compileless', function () {
    gulp.watch('src/assets/less/**/*.less', function (event) {
        var paths = watchPath(event, 'src/assets/less/', 'dist/css/')
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)
        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            sourcemaps.init(),
            autoprefixer({
                browsers: ['last 2 versions', 'Android >= 4.0'],
                cascade: true, // 美化属性
                remove: true
            }),
            less(),
            minifycss(),
            sourcemaps.write('./'),
            gulp.dest(paths.distDir)
        ])
        combined.on('error', handleError)
    })
});

// 编译所有的less文件
gulp.task('compileallless', function () {
        var combined = combiner.obj([
            gulp.src('src/assets/less/**/*.less'),
            sourcemaps.init(),
            autoprefixer({
                browsers: ['last 2 versions', 'Android >= 4.0'],
                cascade: true, // 美化属性
                remove: true
            }),
            less(),
            minifycss(),
            sourcemaps.write('./'),
            gulp.dest('dist/css/')
        ])
        combined.on('error', handleError)
})
gulp.watch('src/assets/less/**/*.less', ['compileallless'])

// 编译sass
var sass = require('gulp-sass');
gulp.task('compilesass', function () {
    gulp.watch('src/assets/sass/**/*', function (event) {
        // console.log(event)
        var paths = watchPath(event, 'src/assets/sass/', 'dist/css/')
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)
        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            sourcemaps.init(),
            autoprefixer({
                browsers: ['last 2 versions', 'Android >= 4.0'],
                cascade: true, // 美化属性
                remove: true
            }),
            sass(),
            minifycss(),
            sourcemaps.write('./'),
            gulp.dest(paths.distDir)
        ])
        combined.on('error', handleError)
    })
})

// 编译所有sass
gulp.task('compileallsass', function () {
    var combined = combiner.obj([
        gulp.src('src/assets/sass/**/*.scss'),
        sourcemaps.init(),
        autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, // 美化属性
            remove: true
        }),
        sass(),
        minifycss(),
        sourcemaps.write('./'),
        gulp.dest('dist/css/')
    ])
    combined.on('error', handleError)
})
gulp.watch('src/assets/sass/**/*.scss', ['compileallsass'])

// 压缩图片
var imagemin = require('gulp-imagemin');
gulp.task('compressimage', function () {
    gulp.watch('src/assets/images/**/*', function (event) {
        var paths = watchPath(event, 'src/assets/', 'dist/')
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)
        gulp.src(paths.srcPath)
            .pipe(imagemin({
                progressive: true
            }))
            .pipe(gulp.dest(paths.distDir))
    })
});

// 压缩所有图片
gulp.task('compressallimage', function () {
    gulp.src('src/assets/images/**/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/images'))
})
gulp.watch('src/assets/images/**/*', ['compressallimage'])

// 配置copy任务
gulp.task('watchcopy', function () {
    gulp.watch('src/assets/fonts/**/*', function (event) {
        var paths = watchPath(event)
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)
        gulp.src(paths.srcPath)
            .pipe(gulp.dest(paths.distDir))
    })
})

// copy所有
gulp.task('copy', function () {
    gulp.src('src/assets/fonts/**/*')
        .pipe(gulp.dest('dist/fonts/'))
})
gulp.watch('src/assets/fonts/**/*', ['copy'])

// 建立虚拟服务器
var server = require('gulp-webserver');
gulp.task('buildserver', function() {
    gulp.src('./src/')
        .pipe(server({
            livereload: true,
            host: 'localhost',
            port: 8080,
            //访问的路径是否显示
            directoryListing: {
                enable: true,
                path: './src/' // 从哪个目录开始启动
            },
            //对请求进行拦截
            // middleware: function (req, res, next) {
            //     // req 发送的请求
            //     // res 需要接受的相应对象
            //     // next 指向下一步操作的指针
            //     var urlObj = url.parse(req.url, true);
            //     console.log(urlObj.pathname);
            //     if (urlObj.pathname == '/data/json.json') {
            //         //设置响应头
            //         res.setHeader('Content-Type', 'application/json');
            //         fs.readFile('json/data.json', 'utf-8', function (err, data) {
            //             //将文件的数据设置为响应的数据
            //             res.end(data);
            //         });
            //     }
            //     next();
            // }
        }));
})

gulp.task('default', ['gulifyjs', 'gulifycss', 'compileless', 'compilesass', 'compressimage', 'watchcopy', 'buildserver']);