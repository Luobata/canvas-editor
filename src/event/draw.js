/*
 * @description draw
 */

import { font } from '../layout/font.js';
import { scroll as scrollObj } from '../layout/scroll.js';
import * as stack from '../layout/stack.js';
import * as can from '../layout/canvas.js';
import { 
    cursorPosition,
    cursorX,
    cursorY,
    cursorYChange
} from '../layout/cursor.js';

let context;
let scrollArr = []; // 滚动事件队列

let drawTxt = function (ctx, txt) {
    ctx.txt = `${txt.weight} ${txt.size} ${txt.family} ${txt.color}`;
    ctx.fillText(txt.value, txt.cursorX, txt.cursorY);
};

const frame = 60; // 帧数
const ticker = 1 * 1000 / frame; // 每帧的时间
const frameTime = 250; // 每次滚动的时间

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

export function txtLenth (key, delFont) {
    var wid;
    var weight = delFont ? delFont.weight : font.weight;
    var size = delFont ? delFont.size : font.size;
    var family = delFont ? delFont.family : font.family;
    can.ctx.font = `${weight} ${size} ${family}`;
    wid = can.ctx.measureText(key).width;

    return wid;
};

/**
 * @description 光标函数 需要判断鼠标点击位置决定光标
 */
export function cursor (ctx, x, y, height) {
    ctx.strokeStyle = stack.cursor.show? '#FFF' : '#000';
    ctx.lineWidth = 1;
    ctx.lineCap = 'square';
    ctx.beginPath();
    ctx.moveTo(x + 1, y + 1);
    ctx.lineTo(x + 1, y + height + 1);
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

function scrollCore(lon) {
    var i;
    for (i of stack.txtArr) {
        i.cursorY += lon;
    }
    stack.cursor.y += lon;
    cursorYChange(lon);
    stack.scroll.y += scrollObj.scrollMoveCal(lon);
    drawAll();
}

/*
 * @description 描述滚动效果
 * @number dir 滚动方向 1代表上 -1代表下
 * @number distance 滚动的距离
 */
export function scroller (dir, distance) {
    let lon = dir * distance / frame / (frameTime / 1000);
    let i;
    let timer;
    let time = new Date().getTime();
    scrollArr.push({
        dir: dir,
        lon: lon
    });

    let stopTimer = () => {
        clearInterval(timer);
        timer = null;
        time = new Date().getTime();
    };
    let timerInit = (scroll) => {
        timer = setInterval(() => {
            if (new Date().getTime() - time < frameTime && !scrollObj.disabled(scroll.dir)) {
                scrollCore(scroll.lon);
            } else if (scrollArr.length) {
                stopTimer();
                timerInit(scrollArr.pop());
            } else {
                stopTimer();
            }
        }, ticker);
    };
    if (scrollArr.length === 1) {
        timerInit(scrollArr.pop());
    }
};

/**
 * @description 瞬间滚动 没有动画
 */
export function scrollerIme (dir, dis) {
    scrollCore(dir * dis);
};

export function drawAll () {
    clearCanvas();
    stack.txtArr.forEach(function (item) {
        drawTxt(can.ctx, item);
    });
    cursor(can.ctx, stack.cursor.x, stack.cursor.y, parseInt(font.size, 10));
    scroll();
};
