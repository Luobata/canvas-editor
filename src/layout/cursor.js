/*
 * @description 定位光标
 */

import { font } from './font.js';
import * as canvas from './canvas.js';
import * as stack from './stack.js';
import * as draw from '../event/draw.js';

const cursorTime = 500;
const startX = canvas.padding;
const startY = canvas.padding;
const endY = - canvas.padding;
let timer;

export var cursorX = startX;
export var cursorY = (function () {
    return parseInt(font.size, 10) + startY;
}());

export var cursorTimer = (function () {
    timer = null;
    timer = setInterval(function () {
        stack.cursor.show = !stack.cursor.show;
        draw.drawAll();
    }, cursorTime);
    return 
}());

var isBorder = function (dir, width) {
    var flag = false;
    switch (dir) {
        case 'left':
        flag = cursorX === startX;
        break;
        case 'right':
        flag = cursorX + width > canvas.canvasWidth + endY;
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
        cursorX = startX;
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
