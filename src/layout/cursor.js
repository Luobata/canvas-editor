/*
 * @description 定位光标
 */

import { font } from './font.js';
import * as canvas from './canvas.js';
import * as stack from './stack.js';
import * as draw from '../event/draw.js';
import { scroll } from './scroll.js';

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
        case 'bottom':
            flag = getBottom() > 0 ? true : false;
            break;
    }

    return flag;
};

var getBottom = function () {
    return stack.cursor.y + stack.txtArr[stack.txtArr.length - 1].height - (canvas.canvasHeight - stack.txtMarginBottom);
};


export function cursorChange (width) {
    cursorX += width;
};

export function cursorYChange (height) {
    cursorY += height;
};

export function cursorPosition (width, lastX, lastY, height) {
    // 输入遇到右边界
    if (width >= 0 && isBorder('right', width)) {
        cursorX = startX;
        cursorY += parseInt(font.size, 10);
        stack.container.height += height;
        stack.cursor.y += height;
        scroll.changeScroll();
        if (isBorder('bottom')) {
            // 遇到下边界
            console.log(getBottom());
            draw.scrollerIme(-1, getBottom());
        }
        return;
    }

    // 删除遇到左边界
    if (width < 0 && isBorder('left', width)) {
        // 删除 先增加一个字符的长度 后面光标计算的时候减掉
        cursorX = lastX - width;
        cursorY = lastY;
        stack.container.height = cursorY;
        scroll.changeScroll();
        stack.cursor.y = cursorY - parseInt(font.size, 10);
        return;
    }
};

/**
 * @description 根据点击位置 计算光标位置
 */
export function cursorClick (x, y) {
    let i;
    let flag = true;
    if (y < canvas.padding) y = canvas.padding;
    if (x < canvas.padding) {
        x = canvas.padding;
        flag = false; 
    }
    for (i of stack.txtArr) {
        if (i.cursorX <= x && i.cursorY - parseInt(i.size, 10) <= y && i.cursorY >= y) {
            stack.cursor.x = i.cursorX + (flag ? draw.txtLenth(i.value) : 0);
            stack.cursor.y = i.cursorY - parseInt(i.size, 10);
        }
    }
};
