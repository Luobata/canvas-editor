/*
 * @description draw
 */

import { font } from '../layout/font.js';
import * as stack from '../layout/stack.js';
import { 
    cursorPosition,
    cursorX,
    cursorY
} from '../layout/cursor.js';

var drawTxt = function (ctx, txt) {
    ctx.txt = `${txt.weight} ${txt.size} ${txt.family} ${txt.color}`;
    ctx.fillText(txt.value, txt.cursorX, txt.cursorY);
};
export var clearCanvas = function (ctx, canvas) {
    //ctx.fillStyle = "#FFF";
    //ctx.beginPath();
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    //ctx.closePath();
    canvas.height = canvas.height; 
};

export function txt (ctx, key) {
    ctx.font = `${font.weight} ${font.size} ${font.family}`;
    cursorPosition(ctx.measureText(key).width);
};

export function cursor (ctx, x, y) {
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.lineCap = 'square';
    ctx.beginPath();
    ctx.moveTo(cursorX, cursorY - parseInt(font.size, 10));
    ctx.lineTo(cursorX, cursorY);
    ctx.stroke();
    ctx.closePath();
};

export function drawAll (ctx) {
    stack.txtArr.forEach(function (item) {
        drawTxt(ctx, item);
    });
    cursor(ctx, stack.cursor.x, stack.cursor.y);
};
