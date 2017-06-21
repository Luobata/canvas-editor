/**
 * @description ui初始化入口函数
 */
import Canvas from './canvas.js';
import Cursor from './cursor.js';
import Scroll from './scroll.js';
import Font from './font.js';

const ui;

const init = function () {
    ui = {
        canvas: new Canvas(),
        scroll: new Scroll()
        //cursor: new Cursor(),
        //scroll: new Scroll(),
        //font: new font()
    };

    return ui;
};

export default function ui() {
    constructor {
        return init();
    };
};
