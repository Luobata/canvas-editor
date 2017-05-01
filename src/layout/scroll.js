/**
 * @description 滚动条对象
 */

import * as stack from './stack.js';
import * as canvas from './canvas.js';
import * as draw from '../event/draw.js';

export let scroll = {
    changeScroll: function () {
        // 滚动条高度 = canvas容器高度^2 / 容器的高度
        // barwidth / wrapwidth = wrapwidth / contentwidth
        stack.scroll.height = canvas.canvasInnerHeight * canvas.canvasInnerHeight / stack.container.height;
        draw.drawAll();
    }
};
