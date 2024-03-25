import gulp from 'gulp';
import { copy } from './gulp/tasks/copy.js';
import { path } from './gulp/config/path.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { plugins } from './gulp/config/plugin.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff } from './gulp/tasks/fonts.js';
import { sprite } from './gulp/tasks/svgSprite.js';
import { ftp } from './gulp/tasks/ftp.js';

global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins
}



function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

const fonts = gulp.series(otfToTtf, ttfToWoff);

const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

const dev = gulp.series(reset, mainTasks, gulp.parallel(server, watcher));
const build = gulp.series(reset, mainTasks);
// const deployFTP = gulp.series(reset, mainTasks, ftp);
const deployFTP = gulp.series( ftp);

gulp.task('default', dev);

export { sprite };
export { dev };
export { build };
export { deployFTP };