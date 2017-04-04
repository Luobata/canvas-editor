/*
 * @description draw
 */

import { font } from '../layout/font.js';
import * as stack from '../layout/stack.js';
import * as can from '../layout/canvas.js';
import { 
    cursorPosition,
    cursorX,
    cursorY
} from '../layout/cursor.js';

var context;

var drawTxt = function (ctx, txt) {
    ctx.txt = `${txt.weight} ${txt.size} ${txt.family} ${txt.color}`;
    ctx.fillText(txt.value, txt.cursorX, txt.cursorY);
};
export var clearCanvas = function () {
    can.canvas.height = can.canvas.height; 
};

export function txt (ctx, key, delFont) {
    var wid;
    var weight = delFont ? delFont.weight : font.weight;
    var size = delFont ? delFont.size : font.size;
    var family = delFont ? delFont.family : font.family;
    ctx.font = `${weight} ${size} ${family}`;
    wid = ctx.measureText(key).width;
    if (delFont) {
        cursorPosition( - wid);
    } else {
        cursorPosition(wid);
    }
};

export function txtLenth (ctx, key, delFont) {
    var wid;
    var weight = delFont ? delFont.weight : font.weight;
    var size = delFont ? delFont.size : font.size;
    var family = delFont ? delFont.family : font.family;
    ctx.font = `${weight} ${size} ${family}`;
    wid = ctx.measureText(key).width;

    return wid;
}

/**
 * @description 光标函数 需要判断鼠标点击位置决定光标
 */
export function cursor (ctx, x, y) {
    ctx.strokeStyle = stack.cursor.isHidden ? '#FFF' : '#000';
    ctx.lineWidth = 1;
    ctx.lineCap = 'square';
    ctx.beginPath();
    ctx.moveTo(cursorX + 1, cursorY - parseInt(font.size, 10));
    ctx.lineTo(cursorX + 1, cursorY + 1);
    ctx.stroke();
    ctx.closePath();
};

export function drawAll (ctx) {
    clearCanvas();
    stack.txtArr.forEach(function (item) {
        drawTxt(can.ctx, item);
    });
    cursor(can.ctx, stack.cursor.x, stack.cursor.y);
};
