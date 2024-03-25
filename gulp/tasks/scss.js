import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import autoPrefixer from 'gulp-autoprefixer';
import groupMediaQueries from 'gulp-group-css-media-queries';
import webpcss from 'gulp-webpcss';


const sass = gulpSass(dartSass);
const imgRegExp = new RegExp()

export const scss = () => {
    if (app.isBuild) {
        return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
            .pipe(app.plugins.plumber(
                app.plugins.notify.onError({
                    title: 'SCSS',
                    message: 'Error: <%= error.message %>'
                })
            ))
            .pipe(app.plugins.replace(/@img\//g, '../img/'))
            .pipe(sass({
                outputStyle: "expanded"
            }))
            .pipe(groupMediaQueries())
            .pipe(webpcss({
                webpClass: ".webp",
                noWebpClass: ".no-webp"
            }))
            .pipe(autoPrefixer({
                grid: true,
                overrideBrowserList: ['last 3 versions'],
                cascade: true
            }))
            .pipe(cleanCss())
            .pipe(rename({
                extname: '.min.css'
            }))
            .pipe(app.gulp.dest(app.path.build.css))
            .pipe(app.plugins.browsersync.stream())
    }

    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'SCSS',
                message: 'Error: <%= error.message %>'
            })
        ))
        // .pipe(app.plugins.replace(/@img\//g, '../img/'))
        // .pipe( () => console.log('<< before replace >>'))
        .pipe(app.plugins.replace(/\@img\//g, '../img/'))
        .pipe(sass({
            outputStyle: "expanded"
        }))
        //раскоментить, если надо глянуть как формирутеся css файл до сжатия
        //.pipe(app.gulp.dest(app.path.build.css))
        //.pipe(cleanCss())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream())

}