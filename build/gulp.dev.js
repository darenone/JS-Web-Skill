const gulp = require('gulp');
// const { series, parallel, src, dest, watch } = require('gulp');

// const Jshint = require('gulp-jshint'); // js检查
const Gutil = require('gulp-util'); // 类似于console.log
const { createProxyMiddleware } = require('http-proxy-middleware'); // 跨域设置
const Less = require('gulp-less'); // 编译less
const FileInclude = require('gulp-file-include'); // 文件模块化
const Connect = require('gulp-connect'); // 浏览器刷新
const Clean = require('gulp-clean'); // 清理目录
const rev = require('gulp-rev'); // 为静态文件随机添加一串hash值，解决浏览器缓存问题，防止项目打包上线以后，由于浏览器缓存项目加载不到最新修改的js或者css代码
const revCollector = require('gulp-rev-collector'); // 根据gulp-rev生成的manifest.json文件中的映射，将html中的路径替换

// 获取配置文件
const config = require('./config');
const { dist } = config;

// 压缩html
async function revHtml() {
    return gulp.src(['rev/**/*.json', 'src/views/*.html'])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                // 'css': 'dist/css', // 将URL中的css替换为css,真实相同则不必写
                'js': 'js',
                // '//cdn': function(manifest_value) { // 如果使用了cdn可以这样写
                //     return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                // }
            }
        }))
        .pipe(FileInclude({ // HTML模板替换
            prefix: '##',
            basepath: '@file'
        }))
        .on('error', function(err) {
            console.error('Task:copy-html,', err.message);
            this.end();
        })
        .pipe(gulp.dest(dist)) // 拷贝
        .pipe(Connect.reload()); // 刷新浏览器
}

// css
async function css() {
    return await gulp.src('src/css/*.less')
        .pipe(Less()) // 编译less
        .pipe(gulp.dest(dist + '/css')) // 拷贝
        .pipe(Connect.reload()); // 刷新
}

// js
async function js() {
    return await gulp.src('src/js/**')
        // .pipe(Jshint()) // 检查代码
        .on('error', function(err) {
            Gutil.log(Gutil.colors.red('[error]'), err.toString())
        })
        .pipe(gulp.dest(dist + '/js')) // 拷贝
        .pipe(Connect.reload()); // 刷新
}

// image
async function image() {
    return await gulp.src('src/images/*')
        .pipe(gulp.dest(dist + '/images')) // 拷贝
        .pipe(Connect.reload()); // 刷新
}

// clean
async function clean() {
    return await gulp.src(dist, {allowEmpty: true})
        .pipe(Clean()); // 删除之前生成的文件
}

// 启动服务器
async function server() {
    Connect.server({
        root: dist, // 根目录
        // ip: '192.168.1.65', // 默认localhost:8080
        livereload: true, // 自动更新
        port: 8090,
        middleware: function(connect, opt) {
            return [
                createProxyMiddleware('/api', {
                    target: 'http://localhost:8080',
                    changeOrigin: true
                }),
                createProxyMiddleware('/idcMonitorServer', {
                    target: 'http://10.0.0.186:18090',
                    changeOrigin: true
                }),
            ]
        }
    })
}

module.exports = {
    revHtml,
    css,
    js,
    image,
    clean,
    server
}