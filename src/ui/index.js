/**
 * @description ui初始化入口函数
 */
import Canvas from './canvas.js';
import Cursor from './cursor.js';
import Scroll from './scroll.js';
import Font from './font.js';
import * as config from './config.js';
import initUi from './init.js';

let ui;

const init = function () {
    ui = {};
    ui.font = initUi(new Font({}, ui));
    ui.canvas = initUi(new Canvas(config.canvas, ui));
    ui.font.heightCount = 10;

    return ui;

    ui = {
        font: new Font({}, ui),
        canvas: new Canvas(config.canvas, ui),
        //scroll: new Scroll(obj, ui)
        //cursor: new Cursor(),
        //scroll: new Scroll(),
    };
};

export default function ui() {
    return init();
};
