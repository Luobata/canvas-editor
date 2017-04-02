/*
 * @description 定位光标
 */

import { font } from './font.js';
import * as canvas from './canvas';

export var cursorX = 0;
export var cursorY = (function () {
    return parseInt(font.size, 10);
}());

var isBorder = function (dir, width) {
    var flag = false;
    switch (dir) {
        case 'left':
        flag = cursorX === 0;
        break;
        case 'right':
        flag = cursorX + width > canvas.canvasWidth;
        break;
    }

    return flag;
};

export function cursorChange (width) {
    cursorX += width;
};

export function cursorPosition (width, lastX, lastY) {
    // 输入遇到右边界
    if (width >= 0 && isBorder('right', width)) {
        cursorX = 0;
        cursorY += parseInt(font.size, 10);
        return;
    }

    // 删除遇到左边界
    if (width < 0 && isBorder('left', width)) {
        // 删除
        cursorX = lastX;
        cursorY = lastY;
        return;
    }
};
