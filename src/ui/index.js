/**
 * @description ui初始化入口函数
 */
import Canvas from './canvas.js';
import Cursor from './cursor.js';
import Scroll from './scroll.js';
import Font from './font.js';

let ui;

const init = function () {
    ui = {
        font: new Font({}, ui),
        //canvas: new Canvas(obj, ui),
        //scroll: new Scroll(obj, ui)
        //cursor: new Cursor(),
        //scroll: new Scroll(),
    };

    return ui;
};

export default function ui() {
    return init();
};
