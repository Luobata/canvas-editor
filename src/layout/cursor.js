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
        // stack.container.height = stack.txtArr[stack.txtArr.length - 1].innerHeight + 20;
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

let format = function (index, fonts) {
    let i;
    let item;
    let wid;
    for (i = index; i < stack.txtArr.length; i++) {
        item = stack.txtArr[i];
        wid = draw.txtLenth(item.value);
        wid = fonts ? - wid : wid;
        if (isBorder('left', wid, item.cursorX) && fonts) {
            // TODO判断删除一个元素后 下一行的第一个元素是否上来是个问题
            item.cursorX = fonts.cursorX;
            item.cursorY = fonts.cursorY;
        } else if (isBorder('right', wid, item.cursorX + parseInt(font.size, 10)) && !fonts) {
            item.cursorX = startX;
            item.cursorY += parseInt(font.size, 10);
        } else {
            item.cursorX += wid;
        }
    }
};

/**
 * @description 重排文字
 */
export let addFont = function (font) {
    let i;
    let item;
    let isEnd = true;
    for (i = 0; i < stack.txtArr.length; i++) {
        item = stack.txtArr[i];
        if ((item.cursorX >= font.cursorX && item.cursorY === font.cursorY) || font.cursorY < item.cursorY) {
            isEnd = false;
            if (item.cursorX >= font.cursorX) {
                font.innerHeight = item.innerHeight;
            } else {
                font.innerHeight = item.innerHeight + (font.cursorY - item.cursorY);
            }
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

export let deleteFont = function (cursorX, cursorY) {
    let i;
    let item;
    let isEnd = true;
    let deleteFun = function (i) {
        if (i < 0) return;
        let item = stack.txtArr.splice(i, 1)[0];
        format(i, item);
        cursorPosition(- item.width, item.cursorX, item.cursorY);
        cursorChange(- item.width);
    };
    for (i = 0; i < stack.txtArr.length; i++) {
        item = stack.txtArr[i];
        if ((item.cursorX >= cursorX && item.cursorY === cursorY) || cursorY < item.cursorY) {
            deleteFun(i - 1);
            isEnd = false;
            break;
        }
    }

    if (isEnd) {
        deleteFun(stack.txtArr.length - 1);
    }
};
