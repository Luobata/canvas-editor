/*
 * @description 定位光标
 */

import { font } from './font.js';
import * as canvas from './canvas.js';
import * as stack from './stack.js';
import * as draw from '../event/draw.js';

const cursorTime = 1000;

export var cursorX = 0;
export var cursorY = (function () {
    return parseInt(font.size, 10);
}());

export var cursorTimer = (function () {
    var timer = null;
    timer = setInterval(function () {
        stack.cursor.isHidden = !stack.cursor.isHidden;
        draw.drawAll();
    }, cursorTime);
    return 
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
        // 删除 先增加一个字符的长度 后面光标计算的时候减掉
        cursorX = lastX - width;
        cursorY = lastY;
        return;
    }
};
