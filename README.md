## 项目说明

此项目是基于gulp 4.0及其插件搭建的前端项目，项目目录结构如下：
```
|-- JS-Web-Skill // 项目名
    |-- .gitignore // 提交git时需要忽略的文件说明
    |-- gulpfile(旧版本).js // 老版本的gulp命令
    |-- gulpfile.js // gulp 4.0版本命令
    |-- package.json // 项目中所用到的依赖
    |-- README.md // 项目说明
    |-- build // 项目配置文件
    |   |-- config.js // 公共配置文件
    |   |-- gulp.dev.js // 开发环境配置
    |   |-- gulp.prod.js // 生成环境配置
    |-- dist // 项目打包以后生成的静态文件
    |-- src // 朱文件
        |-- css // 存放样式
        |   |-- about.css
        |   |-- index.less
        |   |-- reset.less
        |-- images // 存放所需的图片
        |   |-- banner1.png
        |   |-- banner2.png
        |-- include // 存放html模板
        |   |-- base.html
        |-- js // c存放业务逻辑代码
        |   |-- about.js
        |   |-- index.js
        |   |-- lib // 存放公共js代码或则第三方代码库
        |       |-- tool.js // 存放的公共函数
        |       |-- util.js // 存放与业务逻辑有关的公共函数
        |-- views // 视图文件 存放所有的html代码
            |-- about.html
            |-- index.html
```
## 如何运行本项目：
```
# 1. 克隆项目到你的电脑
git clone https://github.com/darenone/JS-Web-Skill.git

# 进入项目
cd JS-Web-Skill

# 安装依赖（在项目根目录执行下面代码）
npm/cnpm install

# 启动项目，开始开发
npm run start

# 打包上线，打包完毕将dist/static文件里面的内容放到服务器即可
npm run build
```