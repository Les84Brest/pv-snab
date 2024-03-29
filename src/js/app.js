import * as siteFunctions from "./modules/functions.js";
import { initSpollers } from "./modules/spollers.js";
import Swiper, { Navigation, Pagination } from "swiper";


siteFunctions.isWebp();

document.addEventListener('DOMContentLoaded', function () {
    initSpollers();
});

