import * as nodePath from 'path';
import dotEnv from 'dotenv';

dotEnv.config();

const ROOT_FOLDER = nodePath.basename(nodePath.resolve());
const BUILD_FOLDER = './dist';
const SRC_FOLDER = './src';

export const path = {
  build: {
    images: `${BUILD_FOLDER}/img/`,
    js: `${BUILD_FOLDER}/js/`,
    css: `${BUILD_FOLDER}/css/`,
    files: `${BUILD_FOLDER}/files/`,
    html: `${BUILD_FOLDER}/`,
    fonts: `${BUILD_FOLDER}/fonts/`,
  },
  src: {
    images: `${SRC_FOLDER}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${SRC_FOLDER}/img/**/*.svg`,
    js: `${SRC_FOLDER}/js/app.js`,
    scss: `${SRC_FOLDER}/scss/style.scss`,
    html: `${SRC_FOLDER}/*.html`,
    files: `${SRC_FOLDER}/files/**/*.*`,
    svgicons: `${SRC_FOLDER}/svgicons/*.svg`,
  },
  watch: {
    js: `${SRC_FOLDER}/js/**/*.js`,
    scss: `${SRC_FOLDER}/scss/**/*.scss`,
    html: `${SRC_FOLDER}/**/*.html`,
    files: `${SRC_FOLDER}/files/**/*.*`,
    images: `${SRC_FOLDER}/img/**/*.{jpg,jpeg,png,gif,webp,svg}`,
  },
  clean: BUILD_FOLDER,
  buildFolder: BUILD_FOLDER,
  srcFolder: SRC_FOLDER,
  rootFolder: BUILD_FOLDER,
  ftp: process.env.FTP__FOLDER, // поменять на имя реальной папки на сервере
}
