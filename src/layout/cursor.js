/*
 * @description 定位光标
 */

import {font} from './font.js';
import * as canvas from './canvas.js';
import * as stack from './stack.js';
import * as draw from '../event/draw.js';
import {scroll} from './scroll.js';
import {Obs} from '../lib/observer.js';

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

var isBorder = function (dir, width, cursorX) {
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

let format = function (index) {
    let i;
    let item;
    let wid;
    for (i = index; i < stack.txtArr.length; i++) {
        item = stack.txtArr[i];
        wid = draw.txtLenth(item.value);
        if (isBorder('right', wid, item.cursorX)) {
            item.cursorX = startX;
            item.cursorY += parseInt(font.size, 10);
        } else {
            item.cursorX += wid;
        }
    }
};


export function cursorChange (width) {
    cursorX += width;
};

export function cursorYChange (height) {
    cursorY += height;
};

export function cursorPosition (width, lastX, lastY, height) {
    // 输入遇到右边界
    if (width >= 0 && isBorder('right', width, cursorX)) {
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
    if (width < 0 && isBorder('left', width, cursorX)) {
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
            stack.cursor.x = cursorX = i.cursorX + (flag ? draw.txtLenth(i.value) : 0);
            stack.cursor.y = i.cursorY - parseInt(i.size, 10);
            cursorY = i.cursorY;
        }
    }
};

/**
 * @description 重排文字
 */
export let addFont = function (font) {
    var i;
    var item;
    var isEnd = true;
    for (i = 0; i < stack.txtArr.length; i++) {
        item = stack.txtArr[i];
        if (item.cursorX >= font.cursorX && item.cursorY >= font.cursorY) {
            isEnd = false;
            stack.txtArr.splice(i, 0, new Obs(font));
            break;
        }
    }
    if (isEnd) {
        stack.txtArr.push(new Obs(font));
    }

    if (i !== (stack.txtArr.length - 1)) {
        format(i + 1);
    }
};
