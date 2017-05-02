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

let context;

let drawTxt = function (ctx, txt) {
    ctx.txt = `${txt.weight} ${txt.size} ${txt.family} ${txt.color}`;
    ctx.fillText(txt.value, txt.cursorX, txt.cursorY);
};

const frame = 60; // 帧数
const ticker = 1 * 1000 / frame; // 每帧的时间
const frameTime = 500; // 每次滚动的时间

export let clearCanvas = function () {
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
};

/**
 * @description 光标函数 需要判断鼠标点击位置决定光标
 */
export function cursor (ctx, x, y) {
    ctx.strokeStyle = stack.cursor.show? '#FFF' : '#000';
    ctx.lineWidth = 1;
    ctx.lineCap = 'square';
    ctx.beginPath();
    ctx.moveTo(x + 1, y + 1);
    ctx.lineTo(x + 1, y + parseInt(font.size, 10) + 1);
    ctx.stroke();
    ctx.closePath();
};

export function scroll () {
    if (!stack.scroll.show) return;
    can.ctx.fillStyle = stack.scroll.color;
    can.ctx.lineCap = 'square';
    can.ctx.beginPath();
    can.ctx.moveTo(stack.scroll.x + stack.scroll.radius, stack.scroll.y);
    can.ctx.arcTo(stack.scroll.x + stack.scroll.width, stack.scroll.y, stack.scroll.x + stack.scroll.width, stack.scroll.y + stack.scroll.height, + stack.scroll.radius);
    can.ctx.arcTo(stack.scroll.x + stack.scroll.width, stack.scroll.y + stack.scroll.height, stack.scroll.x, stack.scroll.y + stack.scroll.height, + stack.scroll.radius);
    can.ctx.arcTo(stack.scroll.x, stack.scroll.y + stack.scroll.height, stack.scroll.x, stack.scroll.y, + stack.scroll.radius);
    can.ctx.arcTo(stack.scroll.x, stack.scroll.y, stack.scroll.x + stack.scroll.width, stack.scroll.y, + stack.scroll.radius);
    can.ctx.fill();
    can.ctx.closePath();
};

/*
 * @description 描述滚动效果
 * @number dir 滚动方向 1代表上 -1 代表下
 * @number distance 滚动的距离
 */
export function scroller (dir, distance) {
    let lon = dir * distance / frame / (frameTime / 1000);
    let i;
    let timer = null;
    let time = new Date().getTime();
    timer = setInterval(function () {
        if (new Date().getTime() - time < frameTime) {
            for (i of stack.txtArr) {
                i.cursorY += lon;
            }
            stack.cursor.y += lon;
            drawAll();
        } else {
            clearInterval(timer);
            timer = null;
        }
    }, ticker);
};

export function drawAll () {
    clearCanvas();
    stack.txtArr.forEach(function (item) {
        drawTxt(can.ctx, item);
    });
    cursor(can.ctx, stack.cursor.x, stack.cursor.y);
    scroll();
};
