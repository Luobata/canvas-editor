/**
 * @description ui初始化入口函数
 */
import Canvas from './canvas.js';
import Cursor from './cursor.js';
import Scroll from './scroll.js';
import Content from './content.js';
import * as config from './config.js';
import initUi from './init.js';
import {
    drawInit
} from './draw.js';

export let ui;

const init = function () {
    ui = {};
    ui.content = initUi(new Content({}, ui));
    ui.canvas = initUi(new Canvas(config.canvasConf, ui));
    ui.scroll = initUi(new Scroll(config.scrollConf, ui));
    ui.cursor = initUi(new Cursor(config.cursorConf, ui));
    
    drawInit(ui);
    ui.cursor.start();

    return ui;

    ui = {
        font: new Font({}, ui),
        canvas: new Canvas(config.canvas, ui),
        //scroll: new Scroll(obj, ui)
        //cursor: new Cursor(),
        //scroll: new Scroll(),
    };
};

export default function ui(can, ctx) {
    config.canvas = can;
    config.ctx = ctx;
    return init();
};
